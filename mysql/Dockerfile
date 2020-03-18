FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD: password
ENV MYSQL_PASSWORD: password
ENV MYSQL_USER: admin
ENV MYSQL_DATABASE: development

ADD script.sql /docker-entrypoint-initdb.d
EXPOSE 3306