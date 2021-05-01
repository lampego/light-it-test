FROM ubuntu:latest

WORKDIR /var/www/html

RUN mkdir -p /usr/share/man/man1

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update --fix-missing
RUN apt-get install -y  curl nano
RUN apt-get install -y --no-install-recommends apt-utils

# Install nginx
RUN apt-get install -y nginx
RUN rm /etc/nginx/sites-available/default
COPY devops/common/nginx/backend.conf /etc/nginx/sites-available/default

# Install node
RUN apt-get remove -y nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

COPY devops/local/boot.sh /usr/local/bin/php_boot
CMD ["sh", "/usr/local/bin/php_boot"]