// src/ui/contexts/NotificationContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto
const NotificationContext = createContext();

/**
 * Proveedor de contexto para las notificaciones
 */
export const NotificationProvider = ({ children, notificationService }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Suscribirse a cambios en las notificaciones
    const unsubscribe = notificationService.subscribe((updatedNotifications) => {
      setNotifications(updatedNotifications);
    });

    // Cargar notificaciones iniciales
    setNotifications(notificationService.getNotifications());

    // Limpiar la suscripción al desmontar
    return () => unsubscribe();
  }, [notificationService]);

  // Métodos para interactuar con las notificaciones
  const markAsRead = (notificationId) => {
    notificationService.markAsRead(notificationId);
  };

  const markAllAsRead = () => {
    notificationService.markAllAsRead();
  };

  const removeNotification = (notificationId) => {
    notificationService.removeNotification(notificationId);
  };

  const clearNotifications = () => {
    notificationService.clearNotifications();
  };

  // Valor a proporcionar a los consumidores del contexto
  const value = {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  notificationService: PropTypes.object.isRequired
};

/**
 * Hook personalizado para acceder al contexto de notificaciones
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications debe ser usado dentro de un NotificationProvider');
  }
  return context;
};