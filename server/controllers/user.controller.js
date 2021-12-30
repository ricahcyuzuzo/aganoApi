import Mongoose from 'mongoose';
import Member from '../models/members.model';
import Authentication from '../helpers/authenticate';
import User from '../models/users.model';

class UserController {
    static async addMember (req, res){
        const {names, phone} = req.body;

        Member.find({ phone: phone }, (err, docs) => {
            if(docs.length){
                return res.json({
                    code: 409,
                    message: 'Phone number is already used, use another'
                });
            }

            const member = new Member({
                _id: new Mongoose.Types.ObjectId(),
                names: names,
                phone: phone,
                createdAt: new Date()
            });

            member
                .save()
                .then(() => {
                    res.status(201).json({
                        message: 'Thank you for applying for Agano choir membership God bless you',
                        code: 201
                    })
                })
                .catch(() => {
                    res.json({
                        message: 'Something Wrong, try again later',
                        code: 500
                    })
                })
                
        })
    }

    static getMembers (req, res) {
        Member.find((err, docs) => {
            if(docs.length){
                res.status(200).json({
                    docs: docs,
                })
            }else{
                res.json({
                    message: 'No Members registered yet',
                    code: 404
                })
            }
        })
    }

    static addUser (req, res) {
        const {phone, password, names, address, admin} = req.body;
        User.find({ phone: phone }, (error, result) => {
            if(result.length){
                return res.json({
                    code: 409,
                    message: 'Phone number already used, please use another.'
                })
            }

            const hashedPassword = Authentication.hashPassword(password);
            const user = new User({
                _id: new Mongoose.Types.ObjectId(),
                phone: phone,
                names: names,
                address: address,
                password: hashedPassword,
                admin: admin,
                createdAt: new Date()
            });

            user
                .save()
                .then(() => {
                    res.status(201).json({
                        code: 201,
                        message: 'User Added Successful'
                    })
                })
                .catch(() => {
                    res.json({
                        code: 500,
                        message: 'There is a problem occured, try again later'
                    })
                })

        })        
    }

    static login (req, res) {
        const { phone, password} = req.body;
        User.findOne({ phone: phone })
            .exec()
            .then(doc => {
                const compare = Authentication.checkPassword(password, doc.password);

                if(compare){
                    res.status(201).json({
                        code: 201,
                        message: 'Success login',
                        token: Authentication.generateToken(doc),
                        user: doc
                    });
                }else{
                    res.json({
                        code: 401,
                        message: 'Wrong Phone number or password'
                    });
                }
            }).catch(() => {
                res.json({
                    code: 401,
                    message: 'Wrong Phone number or password'
                });
            })
    }
}

export default UserController
