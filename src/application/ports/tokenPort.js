// src/application/ports/tokenPort.js

/**
 * Puerto para el registro y gestión de tokens FCM
 * Define los métodos necesarios para interactuar con el backend
 */
export default class TokenPort {
    /**
     * Envía el token FCM al servidor para registrarlo
     * @param {string} token Token FCM a registrar
     * @returns {Promise<boolean>} Promesa que resuelve a true si el registro fue exitoso
     */
    async registerToken(token) {
      throw new Error('TokenPort.registerToken() debe ser implementado');
    }
  
    /**
     * Elimina un token FCM del servidor
     * @param {string} token Token FCM a eliminar
     * @returns {Promise<boolean>} Promesa que resuelve a true si la eliminación fue exitosa
     */
    async unregisterToken(token) {
      throw new Error('TokenPort.unregisterToken() debe ser implementado');
    }
  }