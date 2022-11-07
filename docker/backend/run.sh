#!/bin/sh

sleep 30

cd /var/www/html/
composer install
php artisan migrate

exec "php-fpm"