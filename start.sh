#!/bin/bash
docker compose build
docker compose up -d

# docker-compose exec app npm run start:dev
#  export DOCKER_DEFAULT_PLATFORM=linux/amd64 