import {userRepository} from '../repository/userRepository';
import {User} from  '../models/user'; 
import {JwtService} from '../services/jwt';
import bcrypt from 'bcryptjs';

const AuthController = {

    register: (req, res, next) => {

        let usuarioCreado = new User({
            fullname : req.body.fullname,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        });
        userRepository.create(usuarioCreado);
        res.status(201).json(usuarioCreado);
    },
    login: (req, res, next) => {
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }

}
export { AuthController } 