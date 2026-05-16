# Pin Node.js version (important for reproducibility)
FROM node:20

# Set working directory inside the container
WORKDIR /app

# -------------------------
# Backend setup
# -------------------------
# Copy backend files
COPY backend ./backend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --legacy-peer-deps

# -------------------------
# Frontend setup
# -------------------------
WORKDIR /app
COPY frontend ./frontend

WORKDIR /app/frontend
RUN npm install --legacy-peer-deps
RUN npm run build

# -------------------------
# Expose backend port
# -------------------------
EXPOSE 4000

# -------------------------
# Default command: start backend
# -------------------------
WORKDIR /app/backend
CMD ["npm", "start"]
