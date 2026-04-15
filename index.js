const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  }),
);

app.post("/send-email", async (req, res) => {
  const { name,email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL,
    subject: `New message from ${name} via my portfolio website with email ${email}`,
    text: message,
  });

  res.send("Email sent");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
