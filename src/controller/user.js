const bcrypt = require('bcrypt');
const UserRepository = require("../repository/user");
const HistoryRepository = require("../repository/history")

const historyRepository = new HistoryRepository()

const userRepository = new UserRepository()
class UserController{
    async create(req, res) {
        const { email, password } = req.body;
    
        try {
          // Hash the password before saving
          const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
          const response = await userRepository.create({ email, password: hashedPassword });
          return res.status(200).json({ message: "User created successfully", response });
        } catch (err) {
          return res.status(500).json({ message: "Error creating user", error: err.message });
        }
      }
    
      // **Login with Password Verification**
      async login(req, res) {
        const { email, password } = req.body;
    
        try {
          // Find the user by email
          const user = await userRepository.findOne({ email: email });
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          // Compare the entered password with the hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
          }
    
          return res.status(200).json({ message: "Login successful", user: user });
        } catch (err) {
          return res.status(500).json({ message: "Error during login", error: err.message });
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

    async getUserHistory(req,res){
        const userId = req.params.userId
        console.log(userId)
        try{
          const response = await historyRepository.find({userId:userId})
          console.log(response)
          res.status(200).json(response)
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports =  UserController