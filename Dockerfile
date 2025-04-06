# build environment
FROM nginx:stable-alpine
WORKDIR /
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
