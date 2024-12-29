# Dockerfile
FROM node:18-slim

# Установка зависимостей
WORKDIR /app

# Копирование package.json и package-lock.json (если они есть) для установки зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование оставшихся файлов
COPY . .

# Открытие порта
EXPOSE 8080

# Запуск приложения
CMD ["npm", "start"]
CMD ["python", "app.py", "&&", "echo", "Server started"]

