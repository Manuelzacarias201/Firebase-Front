// src/application/useCases/handleNotificationUseCase.js

import Notification from '../../domain/models/notification';

/**
 * Caso de uso para manejar notificaciones recibidas
 */
export default class HandleNotificationUseCase {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  /**
   * Procesa una notificación recibida y la añade al servicio de notificaciones
   * @param {Object} payload Datos de la notificación recibida
   * @returns {Notification} La notificación procesada
   */
  execute(payload) {
    try {
      // Validar el payload
      if (!payload || !payload.notification) {
        console.error('Payload de notificación inválido:', payload);
        return null;
      }

      // Extraer datos de la notificación
      const { title, body } = payload.notification;
      const data = payload.data || {};
      
      // Crear instancia de notificación
      const notification = new Notification({
        id: data.notificationId || Date.now().toString(),
        title,
        body,
        data,
        timestamp: new Date(),
        read: false
      });

      // Añadir la notificación al servicio
      this.notificationService.addNotification(notification);
      
      return notification;
    } catch (error) {
      console.error('Error al procesar la notificación:', error);
      return null;
    }
  }
}