#设置基础镜像
FROM node:16.0-alpine
CMD mkdir /work/aoeba
#将文件内容复制
COPY ./ /work/aoeba/
#运行命令
WORKDIR /work/aoeba
RUN npm install
RUN npm run build:ssr
ENTRYPOINT npm start
EXPOSE 8899
