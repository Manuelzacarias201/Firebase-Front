import TokenPort from '../../../application/ports/tokenPort';

class TokenRegistration extends TokenPort {
  constructor(serverUrl) {
    super();
    this.serverUrl = serverUrl || 'http://localhost:3000';
  }
  
  async register(token) {
    try {
      const response = await fetch(`${this.serverUrl}/register-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Token registration successful:', data);
      return true;
    } catch (error) {
      console.error('Error registering token:', error);
      return false;
    }
  }
}

export default TokenRegistration;