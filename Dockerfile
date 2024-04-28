FROM 596212449348.dkr.ecr.us-east-1.amazonaws.com/node:18.2.0 as build

WORKDIR /usr/src/app

COPY . .

ARG CODEARTIFACT_AUTH_TOKEN
ARG ENV_NAME

ENV CODEARTIFACT_AUTH_TOKEN=$CODEARTIFACT_AUTH_TOKEN

RUN yarn install \
    && yarn run build:${ENV_NAME} \
    && npm run pack

FROM 596212449348.dkr.ecr.us-east-1.amazonaws.com/nginx:1.23.0-alpine as run

# Copy our nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy our site.conf
COPY site.conf /etc/nginx/conf.d/default.conf

ENV WORK_DIR /usr/share/nginx/html
COPY --from=build /usr/src/app/mf-settings.tgz ${WORK_DIR}

WORKDIR ${WORK_DIR}

USER root

# Download and extract node dist
RUN DIST="$(ls -t *.tgz | head -1)" \
    && rm -f *.html \
    && tar xzvf ${DIST} \
    && mv package/dist/* . \
    && rm -rf package/ $DIST \
    && touch ${WORK_DIR}/nginx.pid \
    && chown -R nginx:nginx ${WORK_DIR} /var/cache/nginx /etc/nginx/

EXPOSE 8080

USER nginx