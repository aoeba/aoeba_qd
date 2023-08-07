#设置基础镜像
FROM node:18.12.1-alpine3.16
CMD mkdir /work/aoeba
#复制项目到工作区
COPY ./ /work/aoeba/
#运行命令
WORKDIR /work/aoeba
RUN npm install
RUN npm run build:ssr
ENTRYPOINT npm start
EXPOSE 8899
