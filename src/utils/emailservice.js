const fetch = require('node-fetch');

class EmailService {
  constructor() {
    this.apiKey = process.env.MAILERSEND_API_KEY;
    this.baseUrl = 'https://api.mailersend.com/v1';
  }

  async sendVerificationEmail(userEmail, verificationToken) {
    const response = await fetch(`${this.baseUrl}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        from: {
          email: 'verify@simplecms.com',
          name: 'SimpleCMS Team'
        },
        to: [
          {
            email: userEmail
          }
        ],
        subject: 'Verifica tu cuenta - SimpleCMS',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Bienvenido a SimpleCMS</h2>
            <p>Para activar tu cuenta, haz clic en el siguiente enlace:</p>
            <a href="https://tudominio.com/verify?token=${verificationToken}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Verificar Cuenta
            </a>
            <p style="margin-top: 20px; color: #6b7280;">
              Si no solicitaste este registro, ignora este mensaje.
            </p>
          </div>
        `
      })
    });

    return response.ok;
  }

  async sendWelcomeEmail(userEmail, userName) {
    const response = await fetch(`${this.baseUrl}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        from: {
          email: 'welcome@simplecms.com',
          name: 'SimpleCMS Team'
        },
        to: [
          {
            email: userEmail
          }
        ],
        subject: '¡Bienvenido a SimpleCMS!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">¡Hola ${userName}!</h2>
            <p>Tu cuenta ha sido verificada exitosamente.</p>
            <p>Ahora puedes comenzar a gestionar el contenido de tu negocio.</p>
            <a href="https://tudominio.com/dashboard" 
               style="background-color: #059669; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Ir al Dashboard
            </a>
          </div>
        `
      })
    });

    return response.ok;
  }
}

module.exports = new EmailService();
