FROM node:20.17.0-alpine3.20

WORKDIR /app

# Copies only package.json and yarn.lock before running yarn install. This enables better caching, as the yarn install step will only be re-run if these files have changed.
COPY package.json ./

# Uses the --frozen-lockfile option to ensure that yarn.lock is not updated during the install process
# Adds the --production flag to only install production dependencies, skipping development dependencies
RUN npm install

COPY . .

RUN npm run build

ENV PORT 3000
EXPOSE 3000

CMD ["npm", "start"]

