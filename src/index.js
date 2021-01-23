import "dotenv/config";
import cors from "cors";
import express from "express";

import models from "./models"
import routes from './routes';
const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', routes.user);
app.use('/messages', routes.message);