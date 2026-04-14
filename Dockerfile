# syntax=docker/dockerfile:1

FROM oven/bun:1 AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends procps default-mysql-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package.json bun.lockb* ./
RUN bun install

COPY . .
ARG DB_URL
RUN bun prisma generate

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

FROM base AS dev
EXPOSE 5000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["bun", "run", "dev"]

FROM base AS builder
RUN bun run build

FROM oven/bun:1 AS prod

RUN apt-get update \
  && apt-get install -y --no-install-recommends procps \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package.json bun.lockb* ./
RUN bun install --production

COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/app/src/infrastructure/prisma/generated ./src/infrastructure/prisma/generated

EXPOSE 5000

CMD ["bun", "run", "start"]
