import React, { useState, useEffect } from 'react';
import fcmService from '../services/fcmService';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [token, setToken] = useState('');
  
  useEffect(() => {
    // Inicializar FCM
    fcmService.initialize();
    
    // Obtener token actual
    const getTokenAsync = async () => {
      const currentToken = await fcmService.getToken();
      if (currentToken) {
        setToken(currentToken);
      }
    };
    getTokenAsync();
    
    // Registrar oyente para mensajes nuevos
    fcmService.registerMessageListener((payload) => {
      const newNotification = {
        id: Date.now(),
        title: payload.notification?.title || 'Sin título',
        body: payload.notification?.body || 'Sin contenido',
        data: payload.data || {},
        timestamp: new Date().toLocaleString()
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    });
  }, []);
  
  return (
    <div className="container mt-4">
      <h2>Notificaciones FCM</h2>
      
      <div className="card mb-3">
        <div className="card-header">Token FCM</div>
        <div className="card-body">
          <textarea 
            className="form-control" 
            value={token} 
            readOnly 
            rows="3"
          />
          <small className="text-muted">Este token es necesario para enviar notificaciones a este dispositivo</small>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">Notificaciones Recibidas ({notifications.length})</div>
        <div className="card-body">
          {notifications.length === 0 ? (
            <div className="alert alert-info">
              No hay notificaciones recibidas. Espera a que llegue una nueva notificación.
            </div>
          ) : (
            <div className="list-group">
              {notifications.map(notification => (
                <div key={notification.id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{notification.title}</h5>
                    <small>{notification.timestamp}</small>
                  </div>
                  <p className="mb-1">{notification.body}</p>
                  {Object.keys(notification.data).length > 0 && (
                    <div>
                      <small className="text-muted">Datos adicionales:</small>
                      <pre className="mt-2 bg-light p-2 rounded">
                        {JSON.stringify(notification.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
