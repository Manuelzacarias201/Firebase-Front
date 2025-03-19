// Scripts para el service worker de Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Configuración de Firebase - debe coincidir con la configuración en el cliente
firebase.initializeApp({
    "type": "service_account",
    "project_id": "ejemplo1-e7a11",
    "private_key_id": "bca0167fbca1be0d798f4ba3b7651ef0a1c0e9fd",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnNBgOC6/K1KnD\nlO20bFUqoon/HWyNEqAZVIRi1IfWxi6CiIJCLQM23dW6eOborRDfYc4ot48YkoXD\nyW+SlasFpft/h9TcyYXfEgcxkKcd+aCj0AD+lADeq/pQIkKpYrslkB4rZSrLM4Mh\nhdmPVDiniSQGWi6zFbLyAQtgyZOg82YkxxnjHyp0579U0kmP2f2fYUuAxEKU41gj\nEfGtkD3NVtIQ4nlEMDwGTKlEnHHaCo2kY3XDX2rKH6E3wpkORLJ9GA9o21FMIqXX\nvErzXyX31PkLrAu+CuzET+PIL/E+UnOV7ONf+K8BPsr96/mYZkUvww/+sq99MqSK\n7wLrS/hjAgMBAAECggEAQPvXKYZTQVKb1D7Kj+fWxeY8GeHWsZF+lbmqZjrRvKBz\nrRne/lc+O5HGIl4g6Gdy+k6p8Fs/Cz7PLEPa0C7JND3JXExvZ4wPMp5wG0xsFxNQ\n4rnR2R+uotxWQdS+8dREhhnYD+eW1TjlCx9ZagJCrqJ3VNyx77pMPRA42todPV0a\nJona/WSaJwLgWarXVUduLAmCzWozZPiAESM0cM84EhXGRFqZdQ5clWD4UYHewU2p\nGGF4b0f6xTDEOs/y4mtYxbeIj5wOnlzNd8dgk/wGOnfJfoIv+CtaW8Urp8ZAEmWf\nu459O3u/cVpUyddfUYqc4nRenjMqpnSG5AAT70l7CQKBgQDmLnNc/SvFpAbLCWNw\noQucxMP1bMG1kkzzIaa0XOKK3eTuTzVUz3pvz08oy3uHycwjpvEqBQTbMYH//VQo\ngGK9qszS5KJSHWgGQgPAxkQj4J6Bt3BynyxfnQwqhhJ461rb/i0zYFVtw7LonzzN\nl2PI9566SS7TVoYeKW5/inxpNQKBgQC59UL8+ongbDN8jkxLE6oM/yl0M2DEeleM\nKA0E2bj09wtzMCJgAmqAfF1B5J5LIX8gSckVxitDFsQcCAFpznnPQvVkGsParzZU\nFBv6LUzq44rPwGvQ+n4pDskxJJZXM2GLdbcOXUeftJaqzFCp/+zIF0ioOBhhPtqf\nrt9ICRWmNwKBgEYxKgrURVHayBuIPGOvKIxg0GT6CkQlXgPSYjSkEo1IRzSIwPmg\n33RTIo+NJZlt5yuEEAzBRQ7WlQ8MIGrNY87008sH35vszbkCzoQtsb/DEnL6DndV\npMFvcbNR+TYYhzeI1h3RpZt4Twly7abAILS7FhM2l+noe7Oc7M5F29R1AoGAfjLQ\nL1bn0wIbPuBjLmA9+2v++fkUJsLQPzG/BBetybEOeDGmYnnBRUkhEOLR+jLVT1hD\nux8tpO4CUPOt4dxaFipe1nzDhdl6iTzMb8/mb1HUloEDqmMU01BRgaRO0wbvn/FX\nNcxgGyY3Sdo2s+gXDQOgL2lCQlyhidTner+PjakCgYEAmScLGT4Wx7JcOWOI7ROM\nLHVyylon3m6F9OxPjT2dGGtB/xUgAUEPZr/KahZRZWQn+5rtkLpnhI2NOHv5atYi\n1h2lzBoax2KSl1SOgmjPE4f3JbX/TP1ilS7l5z5FadVBdXwP6p5ptpLR+0kbd2yP\nDHrEeCegYnxMM1pyRoY6cFQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@ejemplo1-e7a11.iam.gserviceaccount.com",
    "client_id": "100834223507695095030",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40ejemplo1-e7a11.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
});

const messaging = firebase.messaging();

// Manejo de mensajes en background
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico'
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});