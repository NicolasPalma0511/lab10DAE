# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos del proyecto al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos de la app
COPY . .

# Exponer el puerto en el que corre la app
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "app.js"]
