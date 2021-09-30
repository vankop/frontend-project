FROM node:16 as builder

COPY . .
RUN yarn --frozen-lockfile && yarn build

FROM nginx:alpine

ARG API_KEY
ARG VERSION_ID
ARG BASE_URI

ENV API_KEY=$API_KEY
ENV VERSION_ID=$VERSION_ID
ENV BASE_URI=$BASE_URI

COPY --from=builder dist /usr/share/nginx/html/static
COPY build/nginx.conf /etc/nginx/nginx.conf
COPY build/run.sh /run.sh

# move to correct folder
RUN mv /usr/share/nginx/html/static/index.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["sh", "/run.sh"]
