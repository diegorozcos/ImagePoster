# Gestor de Imágenes con Multer y Express Handlebars

Este proyecto permite a los usuarios subir y visualizar imágenes mediante un servidor en Node.js con Express, Multer y Express Handlebars. Las imágenes cargadas se almacenan en una carpeta y se pueden ver en una galería.

## Requisitos

- Node.js instalado
- npm instalado

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/diegorozcos/TareasBackend
   ```

2. Accede al directorio del proyecto:
   ```sh
   cd tarea3
   ```

3. Instala las dependencias:
   ```sh
   npm install
   ```

## Configuración

Este proyecto almacena las imágenes en una carpeta `uploads` a nivel de la raíz del proyecto. Si esta carpeta no existe, créala manualmente:
   ```sh
   mkdir uploads
   ```

## Uso

### Iniciar el servidor
Ejecuta el siguiente comando para compilar el proyecto:
```sh
npm run build
```
Y este comando para ejecutar el servidor:
```sh
npm start
```
El servidor correrá en `http://localhost:3000/`.

### Subir una imagen
1. Accede a `http://localhost:3000/upload`.
2. Selecciona una imagen en formato JPG o PNG.
3. Haz clic en "Subir imagen".
4. Serás redirigido a la galería donde podrás ver la imagen subida.

### Ver la galería de imágenes
1. Accede a `http://localhost:3000/`.
2. Si hay imágenes, se mostrarán en una cuadrícula.
3. Si no hay imágenes, se mostrará un mensaje con un botón para subir la primera imagen.

### Manejo de errores
- Si intentas subir un archivo que no sea JPG o PNG, recibirás un mensaje de error.
- Si no hay archivos en la carpeta `uploads`, la galería mostrará un mensaje indicando que no hay imágenes.

## Tecnologías utilizadas

- Node.js
- Express
- Multer
- Express Handlebars

## Estructura del proyecto
```
/tarea3
|── /dist
|   |── server.js
│── /node_modules          
│── /uploads                
│── /views                 
│   │── /layouts
│   │   └── main.handlebars 
│   │── gallery.handlebars 
│   └── upload.handlebars   
│── /src                    
│   └── server.ts            
│── .gitignore              
│── package.json            
│── tsconfig.json           
│── README.md               

```