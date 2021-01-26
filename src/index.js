
import "dotenv/config";
import cors from "cors";
import express from "express";
import models from "./models";
import routes from './routes';
import bodyParser from 'body-parser'
import morgan from 'morgan'
import morganBody from 'morgan-body';

import mongoose from "mongoose"


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
  if (err) {
    console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
  } else {
    console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
    app.listen(process.env.PORT, () =>
      console.log(
        `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
      )
    );
  }

});