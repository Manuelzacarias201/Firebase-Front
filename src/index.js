<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
=======
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './ui/components/App';
import { NotificationProvider } from './ui/contexts/NotificationContext';

// Importaciones de dominio
import NotificationService from './domain/services/notificationService';
import Notification from './domain/models/notification';

// Importaciones de casos de uso
import InitializeMessagingUseCase from './application/useCases/initializeMessagingUseCase';
import HandleNotificationUseCase from './application/useCases/handleNotificationUseCase';

// Importaciones de infraestructura
import FirebaseMessaging from './infrastructure/adapters/outbound/firebaseMessaging';
import TokenRegistration from './infrastructure/adapters/outbound/tokenRegistration';
import { initializeApp } from './infrastructure/config/firebase';

// Inicializar Firebase
initializeApp();

// Crear instancias de servicios
const notificationService = new NotificationService();

// Crear instancias de adaptadores
const firebaseMessaging = new FirebaseMessaging();
const tokenRegistration = new TokenRegistration();

// Crear instancias de casos de uso
const handleNotificationUseCase = new HandleNotificationUseCase(notificationService);
const initializeMessagingUseCase = new InitializeMessagingUseCase(
  firebaseMessaging,
  tokenRegistration,
  handleNotificationUseCase
);

// Función para inicializar FCM
const initializeFCM = () => initializeMessagingUseCase.execute();

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider notificationService={notificationService}>
      <App initializeFCM={initializeFCM} />
    </NotificationProvider>
  </React.StrictMode>
);

// Cargar notificaciones de ejemplo para propósitos de desarrollo
if (process.env.NODE_ENV === 'development') {
  const exampleNotifications = [
    new Notification({
      id: '1',
      title: 'Bienvenido a la aplicación',
      body: 'Gracias por instalar nuestra aplicación. Ahora recibirás notificaciones en tiempo real.',
      data: {},
      timestamp: new Date(),
      read: false
    }),
    new Notification({
      id: '2',
      title: 'Nuevo mensaje',
      body: 'Has recibido un nuevo mensaje en tu bandeja de entrada.',
      data: { type: 'message', messageId: '123' },
      timestamp: new Date(Date.now() - 3600000), // 1 hora atrás
      read: true
    }),
    new Notification({
      id: '3',
      title: 'Actualización disponible',
      body: 'Hay una nueva versión disponible de la aplicación. Actualiza para obtener las últimas funciones.',
      data: { type: 'update', version: '1.2.0' },
      timestamp: new Date(Date.now() - 86400000), // 1 día atrás
      read: false
    })
  ];

  // Añadir notificaciones de ejemplo al servicio
  exampleNotifications.forEach(notification => {
    notificationService.addNotification(notification);
  });
}

// Registro del Service Worker para FCM
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration.scope);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}
>>>>>>> Primer commit del nuevo proyecto
