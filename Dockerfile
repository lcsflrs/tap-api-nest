# syntax=docker/dockerfile:1

FROM oven/bun:1 AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends procps default-mysql-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package.json bun.lockb* ./

FROM base AS dev

RUN bun install

EXPOSE 5000

CMD ["bun", "run", "dev"]

FROM base AS builder

RUN bun install
COPY . .
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

EXPOSE 5000

CMD ["bun", "run", "start"]
