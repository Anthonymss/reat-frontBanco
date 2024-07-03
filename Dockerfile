# Usar una imagen base de Node.js
FROM node:16-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de npm
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
