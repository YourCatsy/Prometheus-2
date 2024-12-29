
# Dockerfile
FROM python:3.9-slim

# Установка зависимостей
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

# Копирование кода приложения
COPY . .

# Команда для запуска приложения
CMD ["python", "app.py"]
