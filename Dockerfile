FROM node:18-alpine 

WORKDIR /opt/app

COPY package.json package.json
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build && npm prune --omit=dev --legacy-peer-deps

CMD ["node", "./dist/main.js"]