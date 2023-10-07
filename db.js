import oracledb from "oracledb";



export async function runApp()
{
 let connection;
  try {
    console.log("Trying to connect to database...")
    connection = await oracledb.getConnection({ user: process.env.DB_USER, password: process.env.DB_PASSWORD, connectionString: process.env.DB_CONN});
    console.log("Connected!")
    const result = await connection.execute(`SELECT * FROM posts`);
    console.log(result.rows);
  } catch (err) {
    console.error(err); 
  } finally {
    if (connection)
      {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
      }
    }
  }
}