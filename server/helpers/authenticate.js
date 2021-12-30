import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
    static generateToken(user) {
        return jwt.sign({user}, 'agano', { expiresIn: '30d' });
    }

    static hashPassword(password){
        return bcyrpt.hashSync(password, 10);
    }

    static checkPassword(plainPassword, hashedPassword){
        return bcyrpt.compareSync(plainPassword, hashedPassword);
    }
}

export default Authentication;
