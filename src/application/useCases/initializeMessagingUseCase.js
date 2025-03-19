// src/application/useCases/initializeMessagingUseCase.js

/**
 * Caso de uso para inicializar Firebase Cloud Messaging
 */
export default class InitializeMessagingUseCase {
    constructor(messagingPort, tokenPort, handleNotificationUseCase) {
      this.messagingPort = messagingPort;
      this.tokenPort = tokenPort;
      this.handleNotificationUseCase = handleNotificationUseCase;
    }
  
    /**
     * Inicializa FCM, solicita permisos y configura los handlers
     * @returns {Promise<string|null>} Token FCM si la inicialización fue exitosa, null en caso contrario
     */
    async execute() {
      try {
        // Solicitar permiso para recibir notificaciones
        const permission = await this.messagingPort.requestPermission();
        if (!permission) {
          console.warn('Permiso para notificaciones denegado por el usuario');
          return null;
        }
  
        // Obtener token FCM
        const token = await this.messagingPort.getToken();
        if (!token) {
          console.error('No se pudo obtener el token FCM');
          return null;
        }
  
        // Registrar el token en el servidor
        await this.tokenPort.registerToken(token);
  
        // Configurar handlers para mensajes y actualización de token
        this.messagingPort.setupMessageHandlers({
          onMessage: (payload) => {
            console.log('Mensaje recibido en primer plano:', payload);
            this.handleNotificationUseCase.execute(payload);
          },
          onTokenRefresh: async (newToken) => {
            console.log('Token FCM actualizado:', newToken);
            await this.tokenPort.registerToken(newToken);
          }
        });
  
        return token;
      } catch (error) {
        console.error('Error al inicializar FCM:', error);
        return null;
      }
    }
  }