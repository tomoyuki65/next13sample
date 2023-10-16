# ==================================================
# アプリのビルドレイヤー
# ==================================================
FROM node:18.13.0-alpine AS builder
ENV NODE_ENV production
RUN mkdir /build
WORKDIR /build

COPY . .

RUN npm ci
RUN npm run build

# ==================================================
# アプリの実行レイヤー
# ==================================================
FROM node:18.13.0-alpine AS runner
ENV NODE_ENV production
RUN mkdir /app
WORKDIR /app

COPY --from=builder /build/.next ./.next
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

CMD ["npm", "start"]