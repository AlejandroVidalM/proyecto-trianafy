import 'dotenv/config';
import {User} from '../models/user';
import bcrypt from 'bcryptjs';

const usernameExists = async (user) => {
    return await  User.findOne({username: user});
}
const emailExists = async (theEmail) => {
    return await  User.findOne({email: theEmail});
}
const userRepository = {

    toDto(user) {
        return {
            id: user.id,
            username: user.username, 
            fullname: user.fullname,
            email: user.email
        }
    },
    
    async findByUsername(user) {
        return await  User.findOne({username: user});
    },
    // findByUsername(username) {
    //    let result = users.filter(user => user.username == username);
    //    return Array.isArray(result) && result.length > 0 ? result[0] : undefined;   
    // },
    async create(newUser) {
        let password = bcrypt.hashSync(newUser.password, parseInt(process.env.BCRYPT_ROUNDS));
        const theUser = new User({
            
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            password: password
        });
        const result = await theUser.save();
        return result;

    },
    
}
export {usernameExists, userRepository, emailExists}