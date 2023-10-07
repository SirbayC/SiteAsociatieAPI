import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const login = (req, res) => {
    if(req.body.username === process.env.ADMIN_USERNAME){
        if (bcrypt.compareSync(req.body.password, process.env.PASSHASH)){
            const token = jwt.sign({id:req.body.username}, process.env.JWTKEY)
            return res.status(200).json({
                "user": req.body.username,
                "accessToken":token
            })
        }
        return res.status(400).json("Incorrect password!")
    } 
    return res.status(400).json("Provided user does not exist!")
}