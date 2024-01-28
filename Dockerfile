FROM node:16.13.1-alpine3.14
RUN npm install -g typescript
# front用。web配下だとエラー出るのでここに配置