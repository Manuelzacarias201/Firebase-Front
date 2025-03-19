class Notification {
    constructor(id, title, body, data = {}, timestamp = new Date()) {
      this.id = id;
      this.title = title;
      this.body = body;
      this.data = data;
      this.timestamp = timestamp;
      this.read = false;
    }
    
    markAsRead() {
      this.read = true;
    }
  }
  
  export default Notification;