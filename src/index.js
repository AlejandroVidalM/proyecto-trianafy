import "dotenv/config";
import cors from "cors";
import express from "express";
const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
  });

app.listen(process.env.PORT, () =>
  console.log(
    `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
  )
);
app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  messages[id] = message;

  return res.send(message);
});
app.delete("/messages/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } = messages;

  messages = otherMessages;

  return res.send(message);
});
