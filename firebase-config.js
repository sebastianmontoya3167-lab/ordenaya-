// ============================================================
// CONFIGURACIÓN DE FIREBASE
// ============================================================
// 1. Ve a https://console.firebase.google.com
// 2. Crea un proyecto nuevo (gratis) llamado, por ejemplo, "ordenaya"
// 3. Dentro del proyecto: ⚙️ Configuración del proyecto > Tus apps > Agregar app Web (</>)
// 4. Copia el objeto "firebaseConfig" que te entrega Firebase y pégalo aquí abajo,
//    reemplazando los valores de ejemplo.
// 5. Activa Firestore Database (modo de prueba) desde el menú "Compilación > Firestore Database".
// ============================================================

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxxxx"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
