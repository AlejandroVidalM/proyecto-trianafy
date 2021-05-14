import { Router } from 'express';
import { body } from 'express-validator';
import { emailExists, usernameExists } from '../repository/userRepository';
import { AuthController } from '../controller/AuthController';
import { validar } from '../middlewares/validacion';
import { JwtService } from '../services/jwt';
import {password} from '../services/passport'

const router = Router();


router.post('/register', AuthController.register);
router.post('/login', password(), AuthController.login);



export default router;