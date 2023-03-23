const mysql=require('mysql2');
module.exports=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Solution@2023',
    database:'Testing',
});

