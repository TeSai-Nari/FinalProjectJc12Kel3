const mysql=require('mysql')

const db=mysql.createConnection({
    host:'localhost',
    user:'tesai',
    password:'Jesusnumber1!',
    database:'adidasfinalproject',
    port:'3306'
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('sudah tersambung ke mysql')
})


module.exports={db}