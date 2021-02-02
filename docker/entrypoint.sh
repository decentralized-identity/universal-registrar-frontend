#!/usr/bin/env sh

echo "Starting universal-registrar-frontend"

if [ "$BACKEND_URL" ]
then
  echo "Substituting backendUrl with ${BACKEND_URL}"
  envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js
else
  echo "Using default backendUrl"
fi

nginx -g 'daemon off;'