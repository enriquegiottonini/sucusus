# SUCUS
SUCUS se lee igual de atras para adelante como de adelante para atras.


PARA CORRER LOS SERVIDORES
- Instalar servidor node.js en su maquina.
- Instalar mysql server en su maquina.

Cambiar la configuracion de la base de datos en /backend/config/db.config.js ... Lo que podemos hacer es configar nuestros servidores locales con la misma informacion para no estarla cambiando del repositorio.

La base de datos es en MySQL, si la quieren ver desde su navegador hay que usar phpadmin. De otra forma se puede hacer desde la consola.

Usando la terminal de vscode una vez instalado el NODE.js (servidor web)
- desde /backend ejecutar "npm install" para las dependencias node_modules, para correr "npm run start"
- desde /frontend ejecutar "npm install" para las dependencias node_modules, para correr "npm run start"

si quieren hacerle request al servidor backend para probar las APIS sin usar el front pueden hacerlo desde un programa como POSTMAN o desde INSOMNIA (este uso yo) , solo poner la direccion (o el router, e.g http://localhost/home) con su metodo(GET, POST, etc).


