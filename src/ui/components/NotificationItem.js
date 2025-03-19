// src/ui/components/NotificationItem.js

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente que muestra una notificación individual
 */
const NotificationItem = ({ notification, onMarkAsRead, onRemove }) => {
  const formattedDate = notification.timestamp.toLocaleString();
  
  return (
    <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
      <div className="notification-header">
        <h3 className="notification-title">{notification.title}</h3>
        <span className="notification-date">{formattedDate}</span>
      </div>
      
      <p className="notification-body">{notification.body}</p>
      
      <div className="notification-actions">
        {!notification.read && (
          <button 
            className="mark-read-btn"
            onClick={() => onMarkAsRead(notification.id)}
          >
            Marcar como leída
          </button>
        )}
        <button 
          className="remove-btn"
          onClick={() => onRemove(notification.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    data: PropTypes.object
  }).isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default NotificationItem;