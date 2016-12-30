server {
    listen 80;
    server_name  lite-staging.tokopedia.com;
    root /var/www/tokopedia-lite/dist/;

    access_log /var/log/nginx/tokopedia-lite.access.log;
    error_log  /var/log/nginx/tokopedia-lite.error.log;

#    location / {
#        try_files @proxy $uri $uri/ /index.html;
#    }

    location / {
        set $url http://127.0.0.1:7899;
        proxy_http_version 1.1;
        proxy_pass $url;
    }
}