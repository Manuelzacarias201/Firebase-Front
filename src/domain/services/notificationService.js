// src/domain/services/notificationService.js

/**
 * Servicio para gestionar las notificaciones de la aplicación
 */
export default class NotificationService {
    constructor() {
      this.notifications = [];
      this.listeners = [];
    }
  
    /**
     * Añade una nueva notificación a la lista
     * @param {Notification} notification La notificación a añadir
     */
    addNotification(notification) {
      this.notifications = [notification, ...this.notifications];
      this._notifyListeners();
    }
  
    /**
     * Obtiene todas las notificaciones
     * @returns {Array<Notification>} Lista de notificaciones
     */
    getNotifications() {
      return [...this.notifications];
    }
  
    /**
     * Marca una notificación como leída
     * @param {string} notificationId ID de la notificación a marcar
     * @returns {boolean} true si se actualizó correctamente
     */
    markAsRead(notificationId) {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (!notification) return false;
      
      notification.read = true;
      this._notifyListeners();
      return true;
    }
  
    /**
     * Marca todas las notificaciones como leídas
     */
    markAllAsRead() {
      this.notifications = this.notifications.map(n => ({
        ...n,
        read: true
      }));
      this._notifyListeners();
    }
  
    /**
     * Elimina una notificación por ID
     * @param {string} notificationId ID de la notificación a eliminar
     * @returns {boolean} true si se eliminó correctamente
     */
    removeNotification(notificationId) {
      const initialLength = this.notifications.length;
      this.notifications = this.notifications.filter(n => n.id !== notificationId);
      
      if (this.notifications.length !== initialLength) {
        this._notifyListeners();
        return true;
      }
      return false;
    }
  
    /**
     * Elimina todas las notificaciones
     */
    clearNotifications() {
      this.notifications = [];
      this._notifyListeners();
    }
  
    /**
     * Añade un listener para cambios en las notificaciones
     * @param {Function} listener Función a ejecutar cuando haya cambios
     * @returns {Function} Función para eliminar el listener
     */
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  
    /**
     * Notifica a todos los listeners sobre cambios en las notificaciones
     * @private
     */
    _notifyListeners() {
      this.listeners.forEach(listener => {
        listener(this.getNotifications());
      });
    }
  }