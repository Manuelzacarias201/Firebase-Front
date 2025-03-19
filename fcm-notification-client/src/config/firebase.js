import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Configuración de Firebase - REEMPLAZAR CON TUS PROPIAS CREDENCIALES
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Inicializar Firebase Cloud Messaging
const messaging = getMessaging(app);

export { app, messaging };
