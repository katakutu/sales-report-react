upstream tokopedia_lite {
  server 127.0.0.1:7899;
  keepalive 64;
}

upstream mojito {
  server 10.0.12.162;
}

upstream mojito_os {
  server 10.0.12.199;
}

proxy_cache_path /dev/shm/nginx-cache levels=1 keys_zone=hotlist:10m max_size=100m;

server {
    listen 80;
    server_name m-staging.tokopedia.com lite-staging.tokopedia.com;
    root /var/www/tokopedia-lite/public/;

    access_log /var/log/nginx/tokopedia-lite.access.log main;
    error_log  /var/log/nginx/tokopedia-lite.error.log;

    location ~ ^/graphql|status|login|logout|appauth\/code/?$ {
      proxy_pass http://tokopedia_lite$request_uri;
      proxy_set_header X-Request-Id $request_id;
    }

    location ~* \.(?:css|js)$ {
      try_files $uri =404;
      add_header Cache-Control "public";
    }

    location / {
      try_files $uri @prerender;
    }

    location @prerender {
      #proxy_set_header X-Prerender-Token YOUR_TOKEN;

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

      #resolve using Google's DNS server to force DNS resolution and prevent caching of IPs
      resolver 10.0.0.2;

      if ($prerender = 1) {

          #setting prerender as a variable forces DNS resolution since nginx caches IPs and doesnt play well with load balancing
          set $prerender "127.0.0.1:1999";
          rewrite .* /$http_x_forwarded_proto://$host$request_uri break;
          proxy_pass http://$prerender;
      }
      if ($prerender = 0) {
          rewrite .* /index.html break;
      }
    }

    location ~ /mojito/(.*) {
        #proxy_cache hotlist;
        #proxy_cache_key "$request_uri";
        #proxy_cache_valid 200 5m;
        proxy_ignore_headers Expires;
        proxy_ignore_headers Cache-Control;
        access_log /var/log/nginx/mojito.access.log main;
        proxy_pass http://mojito/$1$is_args$args;
    }

    location ~ /mojito-os/(.*) {
        proxy_ignore_headers Expires;
        proxy_ignore_headers Cache-Control;
        access_log /var/log/nginx/mojito-os.access.log main;
        proxy_pass http://mojito_os/$1$is_args$args;
    }
}