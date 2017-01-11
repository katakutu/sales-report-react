upstream perlapp {
    server 192.168.16.21;
    server 192.168.16.37;
}

upstream tokopedia_lite {
    server 127.0.0.1:7899;
    keepalive 64;
}

proxy_cache_path /dev/shm/nginx-cache levels=1 keys_zone=hotlist:10m max_size=100m;


server {
    listen 80;
    server_name  lite.tokopedia.com;
    root /var/www/tokopedia-lite/public/;

    access_log /var/log/nginx/tokopedia-lite.access.log main;
    error_log  /var/log/nginx/tokopedia-lite.error.log;

    location / {
        proxy_redirect off;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Host $http_host;
        proxy_set_header   X-NginX-Proxy true;
        proxy_set_header   Connection "";
        proxy_http_version 1.1;
        proxy_pass         http://tokopedia_lite;
    }

    location /ajax/hotlist.pl {
        proxy_cache hotlist;
        proxy_cache_key "$request_uri";
        proxy_cache_valid 200 5m;
        proxy_ignore_headers Expires;
        proxy_ignore_headers Cache-Control;
        proxy_pass http://perlapp;
    }
}