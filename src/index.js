
import "dotenv/config";
import cors from "cors";
import express from "express";
import models from "./models";
import routes from './routes';
import bodyParser from 'body-parser'
import morgan from 'morgan'
import morganBody from 'morgan-body';

