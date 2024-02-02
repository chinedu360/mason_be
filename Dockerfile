FROM --platform=linux/x86_64 node:alpine

WORKDIR /app

COPY package*.json ./
COPY . .

# RUN npm ci --only=production
# RUN npm install pm2
RUN npm install --omit=dev

USER node

CMD ["npm", "run", "start"]

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD wget --quiet --spider --no-check-certificate http://localhost:8000/health || exit 1

# FROM node:alpine

# FROM --platform=linux/x86_64 node:alpine

# WORKDIR /app


# COPY ./package*.json .

# # # the 'ci' means continous intergration and installs the exact version of packages we have in our package.json
# # RUN npm ci

# COPY . .

# RUN npm install --omit=dev
# # RUN npm install pm2

# # CMD [ "npm", "run", "build" ]

# # uncomment the below line to usde docker on local host
# # CMD ["npm", "run", "start-dev"]

# USER node

# CMD ["npm", "run", "start"]

# EXPOSE 3000

# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD wget --quiet --spider --no-check-certificate http://localhost:8000/health || exit 1




