// import { db } from "../db.js"
// import jwt from "jsonwebtoken"

// export const getPosts = async (req, res) => {
//     try {
//         const posts = await db `SELECT * FROM posts`
//         return res.status(200).json(posts)
//     }
//     catch (err) {
//         return res.status(500).json("Server error - db comm")
//     }
// }

// export const getPost = async (req, res) => {
//     try {
//         const posts = await db `SELECT * FROM posts WHERE id = ${req.params.id}`
//         if (!posts[0]) 
//             return res.status(404).json("No post with that id")
//         return res.status(200).json(posts[0])
//     }
//     catch (err) {
//         return res.status(500).json("Server error - db comm")
//     }

// }

// // export const addPost = (req, res) => {
// //     const token = req.cookies.access_token
// //     if(!token) return res.status(401).json("Not Authenticated")

// //     jwt.verify(token,"jwtkey",(err,userInfo)=>{
// //         if(err) return res.status(403).json("Token is invalid!")

// //         const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)"
// //         const values = [
// //             req.body.title,
// //             req.body.desc,
// //             req.body.img,
// //             req.body.cat,
// //             req.body.date,
// //             userInfo.id
// //         ]

// //         db.query(q, [values], (err,data) => {
// //             if(err){
// //                 return res.status(500).json(err)
// //             }
// //             return res.status(200).json("Post has been created")
// //         })
// //     })
// // }

// // export const deletePost = (req, res) => {
// //     const token = req.cookies.access_token
// //     if(!token) return res.status(401).json("Not Authenticated")

// //     jwt.verify(token,"jwtkey",(err,userInfo)=>{
// //         if(err) return res.status(403).json("Token is invalid!")

// //         const postId = req.params.id
// //         const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"
// //         db.query(q,[postId, userInfo.id],(err,data)=>{
// //             if(err) return res.status(403).json("You can delete only your post!")

// //             return res.status(200).json("Your post has been deleted!")
// //         })
// //     })
// // }

// // export const updatePost = (req, res) => {
// //     const token = req.cookies.access_token
// //     if(!token) return res.status(401).json("Not Authenticated")

// //     jwt.verify(token,"jwtkey",(err,userInfo)=>{
// //         if(err) return res.status(403).json("Token is invalid!")

// //         const postId = req.params.id
// //         const q = 'UPDATE posts SET `title`=?, `desc`=?, `img`=?,`cat`=? WHERE `id` = ? AND `uid` =?'

// //         const values = [
// //             req.body.title,
// //             req.body.desc,
// //             req.body.img,
// //             req.body.cat
// //         ]

// //         db.query(q, [...values, postId, userInfo.id], (err,data) => {
// //             if(err) return res.status(500).json(err)
// //             return res.status(200).json("Post has been updated")
// //         })
// //     })
// // }
