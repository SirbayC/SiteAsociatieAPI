import oracledb from "oracledb";



export async function runApp()
{
 let connection;
  try {
    console.log("Trying to connect...")
    // Use the connection string copied from the cloud console
    // and stored in connstring.txt file from Step 2 of this tutorial
    connection = await oracledb.getConnection({ user: "admin", password: "123456789Minu", connectionString: "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=g15e917efa5de06_rv3f3p1h2j0m1k4e_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))" });
    console.log("Connected!")
    // Create a table
    await connection.execute(`begin execute immediate 'drop table nodetab'; exception when others then if sqlcode <> -942 then raise; end if; end;`);
    await connection.execute(`create table nodetab (id number, data varchar2(20))`);
    
    // Insert some rows
    const sql = `INSERT INTO nodetab VALUES (:1, :2)`;
    const binds = [ [1, "First" ], [2, "Second" ], [3, "Third" ], [4, "Fourth" ], [5, "Fifth" ], [6, "Sixth" ], [7, "Seventh" ] ];
    await connection.executeMany(sql, binds);
    // connection.commit(); // uncomment to make data persistent
    
    // Now query the rows back
    const result = await connection.execute(`SELECT * FROM nodetab`);
    console.dir(result.rows, { depth: null });
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