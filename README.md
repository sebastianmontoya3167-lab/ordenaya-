# OrdenaYa — Sistema de pedidos en la nube para Panadería La Espiga

Proyecto ABP (Aprendizaje Basado en Problemas) — Programación para la Web
Universidad Católica del Norte (UCN) — Medellín

## 1. Descripción del problema

La Panadería La Espiga es un negocio local que recibe todos sus pedidos por WhatsApp y llamadas. Esto genera varios problemas:

- Pedidos que se pierden entre mensajes de otros clientes.
- No hay un registro organizado de qué se debe entregar y cuándo.
- El cliente no tiene forma de saber si su pedido ya está confirmado o listo.
- El dueño debe revisar manualmente decenas de chats para armar la lista del día.

**Necesidad real:** un sistema web simple, accesible desde el celular, que permita a los clientes hacer pedidos en línea y a la panadería gestionarlos desde un panel centralizado, sin depender de un servidor propio ni de costos de infraestructura.

## 2. Solución propuesta

Se construyó una aplicación web con arquitectura *serverless* (sin servidor propio), usando servicios en la nube de Firebase (Google Cloud):

- **Cliente (`index.html`)**: formulario público donde cualquier persona hace su pedido y puede consultar el estado de sus pedidos anteriores por número de teléfono.
- **Panel administrativo (`admin.html`)**: vista en tiempo real de todos los pedidos para el equipo de la panadería, con la opción de marcarlos como "listos".
- **Base de datos en la nube (Firestore)**: guarda cada pedido como un documento; los cambios se reflejan en tiempo real en el panel gracias a los *listeners* de Firestore (`onSnapshot`).
- **Hosting en la nube (Firebase Hosting)**: el sitio se despliega públicamente sin necesidad de contratar un servidor.

## 3. Arquitectura en la nube

```
                    ┌─────────────────────────┐
                    │      Cliente (navegador) │
                    │  index.html + admin.html │
                    └───────────┬──────────────┘
                                │  HTTPS
                                ▼
                    ┌─────────────────────────┐
                    │   Firebase Hosting (CDN) │
                    │  Sirve HTML/CSS/JS        │
                    └───────────┬──────────────┘
                                │  SDK de Firebase (JS)
                                ▼
                    ┌─────────────────────────┐
                    │  Firebase Firestore      │
                    │  (Base de datos NoSQL     │
                    │   en la nube, tiempo real)│
                    │  Colección: "pedidos"     │
                    └─────────────────────────┘
```

**¿Por qué esta arquitectura?**

- No requiere administrar servidores (reduce costos y complejidad para un negocio pequeño).
- Firestore ofrece actualizaciones en tiempo real, ideal para que el panel administrativo se actualice solo cuando llega un pedido nuevo.
- Firebase Hosting entrega el sitio por HTTPS y con CDN global de forma gratuita en el plan Spark.
- Es un servicio ampliamente usado en la industria para MVPs (Producto Mínimo Viable) y proyectos pequeños/medianos.

## 4. Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (vanilla) |
| Backend / BaaS | Firebase (Google Cloud) |
| Base de datos | Cloud Firestore (NoSQL) |
| Hosting | Firebase Hosting |
| Control de versiones | Git y GitHub |

## 5. Estructura del repositorio

```
ordenaya/
├── index.html              # Página del cliente (hacer pedido)
├── admin.html               # Panel administrativo (ver pedidos)
├── css/
│   └── style.css
├── js/
│   ├── firebase-config.js   # Configuración de conexión a Firebase (completar)
│   ├── app.js                # Lógica del cliente
│   └── admin.js               # Lógica del panel admin
├── firestore.rules           # Reglas de seguridad de la base de datos
├── docs/
│   └── presentacion-ordenaya.pptx   # Diapositivas del proyecto
└── README.md
```

## 6. Instrucciones de despliegue

### 6.1. Crear el proyecto en Firebase

1. Ingresar a [https://console.firebase.google.com](https://console.firebase.google.com) con una cuenta de Google.
2. Clic en **"Agregar proyecto"** y asignarle un nombre (ej: `ordenaya`).
3. Dentro del proyecto, ir a **⚙️ Configuración del proyecto → Tus apps → Agregar app → Web (`</>`)**.
4. Copiar el objeto `firebaseConfig` que entrega Firebase.
5. Pegarlo en el archivo `js/firebase-config.js`, reemplazando los valores de ejemplo.
6. En el menú lateral, ir a **Compilación → Firestore Database → Crear base de datos** (modo de prueba).
7. En la pestaña **Reglas** de Firestore, pegar el contenido de `firestore.rules` y publicar.

### 6.2. Ejecutar localmente

No requiere instalación de dependencias: basta con abrir `index.html` en el navegador, o usar una extensión como *Live Server* en VS Code para evitar restricciones de CORS con módulos.

### 6.3. Desplegar en Firebase Hosting (opcional, para publicarlo en internet)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Al finalizar, Firebase entrega una URL pública tipo `https://ordenaya.web.app`.

## 7. Evidencias

*(Agregar aquí capturas de pantalla del formulario funcionando, del panel administrativo y del proyecto ya desplegado, una vez completada la configuración de Firebase.)*

- [ ] Captura del formulario de pedidos
- [ ] Captura del panel administrativo con pedidos cargados
- [ ] Captura de la consola de Firebase (Firestore con datos)
- [ ] Link del proyecto desplegado (si aplica)

## 8. Autor(es)

- Nombre completo — Programación para la Web — UCN Medellín — 2026

## 9. Presentación del proyecto

La presentación ejecutiva y técnica del proyecto se encuentra en [`docs/presentacion-ordenaya.pptx`](docs/presentacion-ordenaya.pptx).
