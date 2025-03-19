import { messaging } from '../../config/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import MessagingPort from '../../../application/ports/outbound/messagingPort';

class FirebaseMessaging extends MessagingPort {
  constructor(onNotificationReceived) {
    super();
    this.onNotificationReceived = onNotificationReceived;
  }
  
  async initialize() {
    // Solicitar permiso para notificaciones
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        
        // Obtener token de FCM
        const token = await this.getToken();
        
        // Configurar handler para mensajes en primer plano
        this.setupMessageHandler();
        
        return token;
      } else {
        console.log('Notification permission denied.');
        return null;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return null;
    }
  }
  
  async getToken() {
    try {
      const currentToken = await getToken(messaging, { 
        vapidKey: 'YOUR_VAPID_KEY' 
      });
      
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving FCM token:', error);
      return null;
    }
  }
  
  setupMessageHandler() {
    onMessage(messaging, (payload) => {
      console.log('Message received in foreground:', payload);
      
      // Crear objeto de notificación
      const notification = {
        title: payload.notification.title,
        body: payload.notification.body,
        data: payload.data
      };
      
      // Notificar al callback
      if (this.onNotificationReceived) {
        this.onNotificationReceived(notification);
      }
      
      // Mostrar notificación del navegador
      this.showNotification(notification);
    });
  }
  
  showNotification(notification) {
    const notifOptions = {
      body: notification.body,
      icon: '/favicon.ico'
    };
    
    // Mostrar notificación del navegador
    new Notification(notification.title, notifOptions);
  }
}

export default FirebaseMessaging;