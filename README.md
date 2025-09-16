¡Perfecto! Gracias por señalar los puntos importantes. Vamos a corregir esas dos cosas:

No usar latest en las imágenes de Docker: Es muy importante usar versiones exactas para evitar problemas futuros cuando las imágenes se actualicen. Usaremos versiones específicas tanto para MySQL como para PHP.

La base de datos debe estar creada antes de hacer las migraciones: Para poder ejecutar las migraciones de Laravel (php artisan migrate), la base de datos debe existir previamente. Por lo tanto, necesitamos una forma de crear la base de datos automáticamente al iniciar el contenedor de MySQL. Esto lo podemos hacer utilizando un script de inicialización para MySQL.

Paso 1: Usar versiones específicas de las imágenes de Docker

Voy a corregir el archivo docker-compose.yml para que use versiones específicas de las imágenes de Docker.

Docker Compose actualizado con versiones específicas:

version: '3.8'

services:
  # Backend - Laravel
  backend:
    build:
      context: ./backend  # Directorio del backend (Laravel)
    container_name: laravel-backend
    restart: unless-stopped
    volumes:
      - ./backend:/var/www/html  # Mapea la carpeta local ./backend a /var/www/html en el contenedor
    environment:
      - DB_CONNECTION=mysql
      - DB_HOST=db
      - DB_PORT=3306
      - DB_DATABASE=integrando-db
      - DB_USERNAME=admin
      - DB_PASSWORD=""
    depends_on:
      - db
    networks:
      - app-network
    command: bash -c "composer install && php-fpm"  # Comando para ejecutar Laravel
    ports:
      - "8000:8000"  # Puerto del backend (Laravel)

  # Frontend - Astro
  frontend:
    image: node:22  # Usamos la imagen de Node.js 22 LTS
    container_name: astro-frontend
    working_dir: /var/www/astro
    volumes:
      - ./front:/var/www/astro  # Mapea la carpeta local ./front a /var/www/astro en el contenedor
    command: ["npm", "run", "dev"]  # Comando para ejecutar el servidor de desarrollo de Astro
    networks:
      - app-network
    ports:
      - "3000:3000"  # Puerto del frontend (Astro)

  # Base de datos - MySQL 
  db:
    image: mysql:5.7  # Usamos MySQL 5.7 para la base de datos
    container_name: mysql-db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword  # Contraseña de root
      MYSQL_DATABASE: integrando-db  # Nombre de la base de datos
      MYSQL_USER: admin  # Usuario de la base de datos
      MYSQL_PASSWORD: ""  # Contraseña del usuario (vacía según tu solicitud)
    networks:
      - app-network
    volumes:
      - mysql_data:/var/lib/mysql  # Volumen para persistir los datos de MySQL
    ports:
      - "3306:3306"  # Puerto para conectarse a MySQL

networks:
  app-network:
    driver: bridge  # Red para conectar los servicios entre sí

volumes:
  mysql_data: {}  # Volumen para persistir los datos de MySQL




Paso 2: Crear un script para inicializar la base de datos

Para que la base de datos se cree automáticamente al arrancar el contenedor, vamos a crear un archivo SQL de inicialización. Puedes colocar este archivo en una carpeta init-db dentro de la raíz de tu proyecto, así:

prueba-tecnica/
├── backend/
│   ├── Dockerfile
│   └── (tu código Laravel)
├── front/
│   └── (tu proyecto Astro)
├── init-db/
│   └── create-database.sql   <-----------
└── docker-compose.yml


Contenido del archivo init-db/create-database.sql:

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS integrando-db;

-- Crear el usuario si no existe
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON integrando-db.* TO 'admin'@'%';

-- Asegurarse de que los privilegios estén aplicados
FLUSH PRIVILEGES;

Este script de inicialización se ejecutará cuando el contenedor de MySQL arranque por primera vez y creará la base de datos integrando-db junto con el usuario admin.

4. Configurar el archivo .env de Laravel

En la carpeta backend, asegúrate de que el archivo .env de Laravel tenga la siguiente configuración para conectar con la base de datos:

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=integrando-db
DB_USERNAME=admin
DB_PASSWORD=


5. Levantar los contenedores

Para levantar los contenedores y crear la base de datos, ejecuta el siguiente comando en la raíz de tu proyecto:

docker-compose up -d

Esto descargará las imágenes necesarias y creará los contenedores.

6. Ejecutar las migraciones de Laravel

Una vez que los contenedores estén en funcionamiento y la base de datos esté disponible, ejecuta las migraciones de Laravel:

docker-compose exec backend php artisan migrate

7. Acceder a la aplicación

Para Laravel (backend), puedes acceder a tu aplicación en http://localhost.

Para Astro (frontend), puedes acceder a la aplicación en http://localhost:3000.


# 1. Levantar los contenedores en segundo plano (modo detached)
# Esto inicia los contenedores definidos en el archivo docker-compose.yml sin bloquear la terminal.
docker-compose up -d  # -d significa "detached", lo que permite que los contenedores se ejecuten en segundo plano.

# 2. Bajar los contenedores y eliminar redes y volúmenes (no utilizados)
# Esto detiene todos los contenedores y elimina las redes, contenedores y volúmenes definidos en docker-compose.yml.
docker-compose down  # Esto detiene los contenedores y elimina redes y volúmenes (por defecto).

# 3. Reconstruir los contenedores y levantar los servicios
# Si has realizado cambios en la configuración o Dockerfile, este comando vuelve a construir las imágenes y luego levanta los contenedores.
docker-compose up --build -d  # --build fuerza la reconstrucción de las imágenes antes de levantar los contenedores, -d para ejecutarlos en segundo plano.

# 4. Verificar el estado de los contenedores activos
# Este comando muestra el estado actual de los contenedores, como si están funcionando correctamente, sus puertos expuestos y más.
docker-compose ps  # Muestra el estado de los contenedores (puertos, nombres, etc.).

# 5. Ver los logs de un servicio específico
# Para ver los logs de un servicio (por ejemplo, el backend de Laravel), usa este comando.
docker-compose logs backend  # Esto muestra los logs del servicio llamado "backend". Puedes reemplazar "backend" con cualquier otro servicio.

# 6. Ver los logs en tiempo real de un servicio específico
# Si quieres ver los logs en tiempo real y seguirlos mientras los contenedores están corriendo, usa la opción -f (follow).
docker-compose logs -f backend  # El flag "-f" sigue los logs en tiempo real. Es útil cuando deseas ver los logs mientras el contenedor está activo.







