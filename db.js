import postgres from "postgres"

export const db = postgres({
    host                 : 'ec2-52-215-68-14.eu-west-1.compute.amazonaws.com',            // Postgres ip address[s] or domain name[s]
    port                 : '5432',          // Postgres server port[s]
    database             : 'd9sc3hn05baohk',            // Name of database to connect to
    username             : 'xlvdmgazrwmznz',            // Username of database user
    password             : 'da4cfcf5639a8b220d122979a643408d0dd4108c0193ee020cc7e8e35f722c75',   
    ssl : 'require'         // Password of database user
  })

