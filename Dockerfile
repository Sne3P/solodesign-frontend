# Configuration Docker pour déploiement VPS
FROM node:20-alpine AS base

# Installer les dépendances uniquement quand nécessaire
FROM base AS deps
RUN apk add --no-cache libc6-compat \
	vips-dev \
	build-base \
	python3
WORKDIR /app
COPY package.json package-lock.json* ./
# Installer toutes les dépendances (prod+dev) nécessaires pour le build Next
RUN set -e; \
  echo "➡️ Installation dépendances (npm ci)"; \
  if npm ci; then \
	  echo "✅ npm ci réussi"; \
  else \
	  echo "⚠️ npm ci a échoué -> fallback npm install"; \
	  npm install; \
  fi; \
  npm cache clean --force

# Rebuild le code source uniquement quand nécessaire
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement de build
ENV NEXT_TELEMETRY_DISABLED=1 \
	NODE_ENV=production

# Build de l'application (production)
RUN npm run build && \
	# Supprimer les sources tests éventuels (pas utilisés au runtime)
	find . -type f -name "*.test.*" -delete && \
	npm prune --production

# Image de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
	NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT=3000 \
	HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=4 \
	CMD wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1

# Commande de démarrage (standalone Next embarque server.js)
CMD ["node", "server.js"]
