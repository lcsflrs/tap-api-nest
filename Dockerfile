FROM oven/bun:1

RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package.json bun.lockb* ./

RUN bun install

COPY . .

EXPOSE 5001

CMD ["bun", "run", "dev"]
