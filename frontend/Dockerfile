FROM node:10.22.0-alpine as builder

COPY package.json  package-lock.json ./

RUN npm install --only=prod&& mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

ARG GIT_BRANCH

RUN if [ ${GIT_BRANCH} = "master" ] ; then npm run build-prod ; fi
RUN if [ ${GIT_BRANCH} = "development" ] ; then npm run build-demo ; fi
RUN if [ ${GIT_BRANCH} = "staging" ] ; then npm run build-stage ; fi

FROM nginx:1.19-alpine

COPY --from=builder /react-frontend/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

ARG GIT_BRANCH

COPY nginxConfig/nginx_${GIT_BRANCH}.conf /etc/nginx/conf.d
ENV TZ=Asia/Bishkek
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]