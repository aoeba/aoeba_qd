#设置基础镜像
FROM nginx:latest
#将dist文件内容复制
COPY dist/ /usr/share/nginx/html/
#用本地default.conf配置替换nginx镜像中的配置
COPY nginx_default.conf /etc/nginx/conf.d/default.conf