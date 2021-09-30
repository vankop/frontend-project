#!/bin/sh

JSON="{$(echo "
\"apiKey\":\"${API_KEY}\",
\"versionId\":\"${VERSION_ID}\",
\"baseUri\":\"${BASE_URI}\"
")}"

echo $JSON
echo "window.configuration = ${JSON}" > /usr/share/nginx/html/config.js

sed -i -e "s+__HASH__+$RANDOM+" /usr/share/nginx/html/index.html

nginx -g "daemon off;"
