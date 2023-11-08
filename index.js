import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

const sendEmail = (to, title, message) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    post: 587,
    auth: {
      user: process.env.USER, // Aqui va tu correo
      pass: process.env.PASS // Aqui va tu contraseña de aplicaciones de gmail
    }
  });

  transport.sendMail({
    from: process.env.USER,
    to: to,
    subject: title,
    text: message
  }).finally(() => {
    console.log('Correo enviado!');
  })
}

app.post('/email', (req, res) => {
  const { to, title, message } = req.body;

  sendEmail(to, title, message);

  res.status(200).json({ message: 'Mensaje enviado con exito!' });
})

app.listen(4000, () => {
  console.log('Server on port: ', 4000);
})