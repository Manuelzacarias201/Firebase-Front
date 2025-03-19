import React, { useEffect, useState } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import FirebaseMessaging from '../../infrastructure/adapters/outbound/firebaseMessaging';
import TokenRegistration from '../../infrastructure/adapters/outbound/tokenRegistration';
import NotificationList from './NotificationList';
import '../App.css';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [fcmInitialized, setFcmInitialized] = useState(false);
  
  useEffect(() => {
    const initializeMessaging = async () => {
      // Crear función callback para recibir notificaciones
      const handleNotificationReceived = (notification) => {
        const newNotification = {
          id: Date.now().toString(),
          ...notification,
          timestamp: new Date(),
          read: false
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      };
      
      // Inicializar Firebase Messaging
      const firebaseMessaging = new FirebaseMessaging(handleNotificationReceived);
      const token = await firebaseMessaging.initialize();
      
      if (token) {
        // Registrar token en el servidor
        const tokenRegistration = new TokenRegistration();
        const success = await tokenRegistration.register(token);
        
        if (success) {
          setFcmInitialized(true);
        }
      }
    };
    
    initializeMessaging();
  }, []);
  
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Notificaciones FCM</h1>
        <p>
          {fcmInitialized 
            ? 'Configurado para recibir notificaciones en primer plano.' 
            : 'Configurando notificaciones...'}
        </p>
      </header>
      
      <NotificationContext.Provider value={{ notifications, markAsRead }}>
        <main className="App-main">
          <NotificationList />
        </main>
      </NotificationContext.Provider>
    </div>
  );
}

export default App;