export const welcomeTemplate = `
<html>
  <head>
    <meta charset='UTF-8' />
    <title>Confirmación de cuenta</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; color:
      #333; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0
      auto; background-color: #ffffff; padding: 20px; border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); } .header { text-align: center;
      padding: 10px 0; } .header img { max-width: 150px; } .content { margin:
      20px 0; text-align: center; } .button { display: inline-block; padding:
      10px 20px; margin-top: 20px; background-color: #007BFF; color: #ffffff;
      text-decoration: none; border-radius: 5px; font-weight: bold; } .footer {
      text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class='container'>
      <div class='header'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/4144/4144781.png'
          alt='Email image'
          style='margin-top: 30px; width: 150px; height: 150px;'
        />
      </div>
      <div class='content'>
        <h2>Confirmación de cuenta</h2>
        <p>Hola, {{name}}:</p>
        <p>Gracias por registrarte en
          {{companyName}}. Por favor, confirma tu cuenta haciendo clic en el
          siguiente botón:</p>
        <a href='{{confirmationLink}}' class='button'>Confirmar cuenta</a>
        <p>Si no solicitaste esta cuenta, por favor ignora este correo
          electrónico.</p>
        <p>Gracias,</p>
        <p>El equipo de {{companyName}}</p>
      </div>
      <div class='footer'>
        <p>&copy; {{year}} {{companyName}}. Todos los derechos reservados.</p>
        <p>Si tienes alguna pregunta, contáctanos a
          <a href='mailto:support@example.com'>support@example.com</a>.</p>
      </div>
    </div>
  </body>
</html>`;
