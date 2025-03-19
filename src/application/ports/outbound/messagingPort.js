// src/application/ports/outbound/messagingPort.js

/**
 * Puerto de salida para la mensajería de Firebase
 * Define los métodos necesarios para interactuar con FCM
 */
export default class MessagingPort {
    /**
     * Solicita permiso para recibir notificaciones
     * @returns {Promise<boolean>} Promesa que resuelve a true si el permiso fue concedido
     */
    async requestPermission() {
      throw new Error('MessagingPort.requestPermission() debe ser implementado');
    }
  
    /**
     * Obtiene el token actual de FCM
     * @returns {Promise<string>} Promesa que resuelve al token FCM
     */
    async getToken() {
      throw new Error('MessagingPort.getToken() debe ser implementado');
    }
  
    /**
     * Configura los handlers para los diferentes estados de mensajería
     * @param {Object} handlers Objeto con handlers para los diferentes eventos
     * @param {Function} handlers.onMessage Handler para mensajes en primer plano
     * @param {Function} handlers.onTokenRefresh Handler para cuando el token se actualiza
     */
    setupMessageHandlers({ onMessage, onTokenRefresh }) {
      throw new Error('MessagingPort.setupMessageHandlers() debe ser implementado');
    }
  
    /**
     * Desuscribe a las notificaciones eliminando el token actual
     * @returns {Promise<boolean>} Promesa que resuelve a true si la desuscripción fue exitosa
     */
    async unsubscribe() {
      throw new Error('MessagingPort.unsubscribe() debe ser implementado');
    }
  }