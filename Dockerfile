# ============================================================================
# AegisOS: Multi-Stage Enterprise Production Docker Container
# ============================================================================

FROM node:22-alpine AS production

WORKDIR /app

# Copy root configuration
COPY package.json ./

# Copy application source
COPY server.js ./
COPY database ./database
COPY api ./api
COPY agents ./agents
COPY public ./public
COPY desktop ./desktop

# Initialize seed database
RUN node database/seed.js

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"]
