// src/ui/components/NotificationList.js

import React from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import { useNotifications } from '../contexts/NotificationContext';

/**
 * Componente que muestra una lista de notificaciones
 */
const NotificationList = () => {
  const { 
    notifications, 
    markAsRead, 
    removeNotification, 
    markAllAsRead,
    clearNotifications 
  } = useNotifications();

  if (notifications.length === 0) {
    return (
      <div className="notification-list-empty">
        <p>No tienes notificaciones nuevas.</p>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-list-container">
      <div className="notification-list-header">
        <h2>Notificaciones ({notifications.length})</h2>
        <div className="notification-list-actions">
          {unreadCount > 0 && (
            <button 
              className="mark-all-read-btn"
              onClick={markAllAsRead}
            >
              Marcar todas como leídas
            </button>
          )}
          <button 
            className="clear-all-btn"
            onClick={clearNotifications}
          >
            Borrar todas
          </button>
        </div>
      </div>
      
      <div className="notification-list">
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={markAsRead}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;