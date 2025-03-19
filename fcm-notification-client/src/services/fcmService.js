import { messaging } from '../config/firebase';
import { getToken, onMessage } from 'firebase/messaging';

// Token de vapor web necesario para Firebase Cloud Messaging en navegadores
const vapidKey = 'TU_VAPID_KEY';

class FCMService {
  // Almacenar tokens y mensajes recibidos
  messageListeners = [];
  currentToken = null;
  
  // Inicializar el servicio de FCM
  initialize = () => {
    this.requestPermission();
    this.listenForMessages();
  }
  
  // Solicitar permiso para recibir notificaciones
  requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        await this.getToken();
      } else {
        console.log('Unable to get permission to notify.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  }
  
