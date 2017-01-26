upstream perlapp {
  server 192.168.16.21;
  server 192.168.16.37;
}

upstream mojito {
  server 10.0.11.166;
  server 10.0.12.17;
}

upstream tokopedia_lite {
  server 127.0.0.1:7899;
  keepalive 64;
}

proxy_cache_path /dev/shm/nginx-cache levels=1 keys_zone=hotlist:10m max_size=100m;


server {
    listen 80;
    server_name m.tokopedia.com lite.tokopedia.com;
    root /var/www/tokopedia-lite/public/;

    access_log /var/log/nginx/tokopedia-lite.access.log main;
    error_log  /var/log/nginx/tokopedia-lite.error.log;

    location ~ ^/graphql|status|login|logout|appauth\/code/?$ {
      proxy_pass http://tokopedia_lite$request_uri;
    }

    location ~* \.(?:css|js)$ {
      try_files $uri =404;
      add_header Cache-Control "public";
    }

    location / {
      try_files $uri @prerender;
    }

    location @prerender {

      set $prerender 0;
      if ($http_user_agent ~* "TestBot|Googlebot|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator") {
          set $prerender 1;
      }
      if ($args ~ "_escaped_fragment_") {
          set $prerender 1;
      }
      if ($http_user_agent ~ "Prerender") {
          set $prerender 0;
      }
      if ($uri ~* "\.(js|css|xml|less|png|jpg|jpeg|gif|pdf|doc|txt|ico|rss|zip|mp3|rar|exe|wmv|doc|avi|ppt|mpg|mpeg|tif|wav|mov|psd|ai|xls|mp4|m4a|swf|dat|dmg|iso|flv|m4v|torrent|ttf|woff|svg|eot)") {
          set $prerender 0;
      }

      if ($prerender = 1) {
          #setting prerender as a variable forces DNS resolution since nginx caches IPs and doesnt play well with load balancing
          set $prerender "192.168.18.87:1999";
          rewrite .* /https://$host$request_uri break;
          proxy_pass http://$prerender;
      }

      if ($prerender = 0) {
          rewrite .* /index.html break;
      }
    }

    location /ajax/hotlist.pl {
        proxy_cache hotlist;
        proxy_cache_key "$request_uri";
        proxy_cache_valid 200 5m;
        proxy_ignore_headers Expires;
        proxy_ignore_headers Cache-Control;
        proxy_pass http://perlapp;
    }

    location ~ /mojito/(.*) {
        proxy_cache hotlist;
        proxy_cache_key "$request_uri";
        proxy_cache_valid 200 5m;
        proxy_ignore_headers Expires;
        proxy_ignore_headers Cache-Control;
        access_log /var/log/nginx/mojito.access.log main;
        proxy_pass http://mojito/$1$is_args$args;
    }
}