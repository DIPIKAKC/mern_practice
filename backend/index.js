import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
const app = express();
const port = 5000;
import productRoutes from './routes/productRoutes.js';
import nodemailer from 'nodemailer';
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use(productRoutes);



//for nodemailer
const transporter = nodemailer.createTransport({
service: 'gmail',
  auth: {
    user: 'dipikak0323@gmail.com',
    pass: 'xnsr jief lpfu gpbx'
  },
  debug: true,
  logger: true
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body ?? {};
  try {
    const info = await transporter.sendMail({
      from: '"Dipika" <dipikak0323@gmail.com>',
      to,
      subject,
      text
    });
    return res.status(200).json({
      message: info
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });

  }
});

//

mongoose.connect('mongodb+srv://dipikak0323:MedEase@mern.cidwyre.mongodb.net/Shop?retryWrites=true&w=majority').then((val) => {
  app.listen(port,'0.0.0.0', () => {
    console.log(`connected and server is running on ${port}`);
  });
}).catch((err) => {
  console.log(err);
});


app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: 'hello jee welcome to Server'
  });
});







