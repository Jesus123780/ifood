# Image Size: 221MB
# Linux + Node + Source + Project dependencies
FROM node:lts-alpine as base
WORKDIR /app
COPY . .
ARG NODE_ENV
ENV APP_ENV=${NODE_ENV}
ENV CONSUL_HTTP_ADDR=consul.smu-labs.cl
ARG CONSUL_HTTP_TOKEN
ARG CONSUL_TEMPLATE_VERSION=0.25.1
RUN wget "https://releases.hashicorp.com/consul-template/${CONSUL_TEMPLATE_VERSION}/consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.tgz"
RUN tar zxfv consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.tgz
RUN rm -f consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.tgz
COPY package.json ./
RUN npm install --legacy-peer-deps
# RUN npm install -g npm 
# RUN npm install
COPY . .
RUN rm -f consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.tgz

# Linux + Node + Source + Project dependencies + build assets
FROM base AS build
ARG NODE_ENV
ENV APP_ENV=${NODE_ENV}
ENV CONSUL_HTTP_ADDR=consul.smu-labs.cl
ARG CONSUL_HTTP_TOKEN
ENV PORT=3000
WORKDIR /build
COPY --from=base /app ./
COPY . .
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# We keep some artifacts from build
FROM node:current-alpine AS production
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
# RUN npm install -g npm 
RUN npm install next

EXPOSE 3000
CMD npm run start