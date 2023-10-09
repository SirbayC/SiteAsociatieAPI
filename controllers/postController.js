import oracledb from "oracledb"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const getPosts = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(`SELECT * FROM posts`);
        if (result.rows.length == 0) {
            return res.status(404).json("No post with that id!")
        }
        res.status(200).json(result.rows.map(item => {
            return {
                id: item[0],
                title: item[1],
                desc: item[2],
                dateCreated: item[3],
                dateUpdated: item[4],
                author: item[5],
            }
        }))
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error - db comm")
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    return res
}

export const getPost = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT * FROM posts WHERE id = :id`,
            [req.params.id]
        );
        res.status(200).json(result.rows.map(item => {
            return {
                id: item[0],
                title: item[1],
                desc: item[2],
                dateCreated: item[3],
                dateUpdated: item[4],
                author: item[5],
            }
        })[0])
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error - db comm")
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    return res
}

export const addPost = async (req, res) => {
    const token = req.body.token
    if (!token) return res.status(401).json("Not Authenticated")
    let error = false
    jwt.verify(token, process.env.JWTKEY, (err, userInfo) => {
        error = err || userInfo.id != process.env.ADMIN_USERNAME
    })

    if (error)
        return res.status(403).json("Invalid token!")

    let connection;
    try {
        connection = await oracledb.getConnection();
        console.log("writing" + req.body)
        const result = await connection.execute(
            "INSERT INTO posts(title, content)" +
            " VALUES " +
            "(:1, :2)",
            [req.body.title, req.body.content],
            { autoCommit: true });
        res.status(200).json("Post added!")
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error - db comm")
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    return res
}

// export const deletePost = (req, res) => {
//     const token = req.cookies.access_token
//     if(!token) return res.status(401).json("Not Authenticated")

//     jwt.verify(token,"jwtkey",(err,userInfo)=>{
//         if(err) return res.status(403).json("Token is invalid!")

//         const postId = req.params.id
//         const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"
//         db.query(q,[postId, userInfo.id],(err,data)=>{
//             if(err) return res.status(403).json("You can delete only your post!")

//             return res.status(200).json("Your post has been deleted!")
//         })
//     })
// }

// export const updatePost = (req, res) => {
//     const token = req.cookies.access_token
//     if(!token) return res.status(401).json("Not Authenticated")

//     jwt.verify(token,"jwtkey",(err,userInfo)=>{
//         if(err) return res.status(403).json("Token is invalid!")

//         const postId = req.params.id
//         const q = 'UPDATE posts SET `title`=?, `desc`=?, `img`=?,`cat`=? WHERE `id` = ? AND `uid` =?'

//         const values = [
//             req.body.title,
//             req.body.desc,
//             req.body.img,
//             req.body.cat
//         ]

//         db.query(q, [...values, postId, userInfo.id], (err,data) => {
//             if(err) return res.status(500).json(err)
//             return res.status(200).json("Post has been updated")
//         })
//     })
// }
