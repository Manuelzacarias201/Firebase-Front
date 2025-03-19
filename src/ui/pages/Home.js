// src/ui/pages/Home.js

import React, { useState, useEffect } from 'react';
import NotificationList from '../components/NotificationList';
import { useNotifications } from '../contexts/NotificationContext';

/**
 * Página principal de la aplicación
 */
const Home = ({ initializeFCM }) => {
  const [fcmStatus, setFcmStatus] = useState({
    initialized: false,
    token: null,
    error: null,
    loading: true
  });

  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const initializeMessaging = async () => {
      try {
        setFcmStatus(prev => ({ ...prev, loading: true }));
        const token = await initializeFCM();
        
        if (token) {
          setFcmStatus({
            initialized: true,
            token,
            error: null,
            loading: false
          });
        } else {
          setFcmStatus({
            initialized: false,
            token: null,
            error: 'No se pudo inicializar FCM',
            loading: false
          });
        }
      } catch (error) {
        setFcmStatus({
          initialized: false,
          token: null,
          error: error.message,
          loading: false
        });
      }
    };

    initializeMessaging();
  }, [initializeFCM]);

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Bienvenido a la Aplicación de Notificaciones</h1>
        <p>Esta aplicación demuestra el uso de Firebase Cloud Messaging para recibir notificaciones en tiempo real.</p>
      </div>

      <div className="fcm-status-section">
        <h2>Estado de FCM</h2>
        {fcmStatus.loading ? (
          <p>Inicializando Firebase Cloud Messaging...</p>
        ) : fcmStatus.initialized ? (
          <>
            <p className="fcm-success">✅ FCM inicializado correctamente</p>
            <p className="fcm-token">Token: <code>{fcmStatus.token.substring(0, 20)}...{fcmStatus.token.substring(fcmStatus.token.length - 10)}</code></p>
          </>
        ) : (
          <p className="fcm-error">❌ Error al inicializar FCM: {fcmStatus.error}</p>
        )}
      </div>

      <div className="notifications-section">
        <div className="notifications-header">
          <h2>Centro de Notificaciones</h2>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} no leída{unreadCount !== 1 ? 's' : ''}</span>
          )}
        </div>
        <NotificationList />
      </div>
    </div>
  );
};

export default Home;