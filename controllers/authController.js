import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = (req, res) => {
    if(req.body.username === process.env.USER && bcrypt.compareSync(req.body.password, process.env.PASSHASH)){
        const token = jwt.sign({id:req.body.username}, process.env.JWTKEY)
        return res.cookie("access_token", token, {
            httpOnly : true
        }).status(200).json(req.body.username)
    }
    return res.status(400).json("Wrong username or password")
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out!")
}