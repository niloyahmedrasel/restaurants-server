
const UserRepository = require("../repository/user");

const userRepository = new UserRepository()
class UserController{
    async create(req, res){
        const {email, password} = req.body

        try{
            const response = await userRepository.create({email, password});
            return res.status(200).json(response);
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async login(req,res){
        const {email,password} = req.body

        try{
            const user = await userRepository.findOne({email:email})
            if(!user){
                res.status(404).json({message:"User not found"})
            }else{
            if(user.password === password){
                return res.status(200).json({message:"Login successful"})
            }else{
                return res.status(401).json({message:"Invalid credentials"})
            }
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async getUser(req, res){
        const _id = req.params._id
        console.log(_id)
        try{
            const response = await userRepository.findById(_id)
            if(!response){
                return res.status(404).json({message:"User not found"})
            }
            return res.status(200).json(response)
        }catch(err){
            return res.status(500).json(err)
        }
        
    }
}

module.exports =  UserController