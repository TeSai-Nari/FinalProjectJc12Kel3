const {db} = require('../connection/mysqldb')
const transporter = require('../helper/mailer')
const encrypt = require('../helper/crypto')
const {createJWTToken} = require('../helper/jwt')
const jwt = require('jsonwebtoken')
const fs =  require('fs')

module.exports={
    register:(req,res)=>{
        console.log('creating new user...') 
        const {username, password, email}=req.body
        var data={
            username,
            password:encrypt(password),
            email,
            lastlogin: new Date()
        }
        console.log(req.body)
        console.log(data)
        var sql=`select * from users where username='${username}'`
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send({message:'error get data'})
            if(result.length){
                return res.status(200).send({status:false,message:'username / e-mail already been used'})
            }else{
                sql=`insert into users set ?`
                db.query(sql,data,(err,result1)=>{
                    console.log(result1)
                    console.log(data)
                    if(err) return res.status(500).send({message:'error insert data'})
                    const token=createJWTToken({id:result1.insertId})
                    var LinkVerifikasi=`http://localhost:3000/verified?token=${token}`
                    var mailoptions={
                        from:'Admin <ardiani.bernhard@gmail.com>',
                        to: email,
                        subject:'Account Verification - Expires after :12 Hour',
                        html:`Hello ${username},<br>
                        Before you start shopping, please verify your e-mail address by clicking on the link below :<br>
                        <a href=${LinkVerifikasi}>Account Verification</a><br>
                        Thanks,<br>
                        Adidas Team`
                    }
                    transporter.sendMail(mailoptions,(err,result2)=>{
                        // if(err) return res.status(500).send(err)
                        // return res.status(200).send({status:true})              
                            if (err) return res.status(500).send(err)
                            sql=`select * from users where id=${result1.insertId}`
                            db.query(sql,(err,result3)=>{
                                if (err) return res.status(500).send(err)
                                return res.status(200).send({...result3[0],token,status:true})
                        })
                    })
                })
            }
        })
    },
    verifieduser:(req,res)=>{ // untuk ganti status user jadi verified.
        const {id}=req.user
        var obj={
            isverified:1
        }
        var sql=`update users set ? where id=${id}` //update kolom isverified jadi 1 di sql where user id sekian
        db.query(sql,obj,(err,result)=>{
            if(err) return res.status(500).send(err)
            sql=`select * from users where id=${id}`
            db.query(sql,(err,result1)=>{
                if(err) return res.status(500).send(err)
                return res.status(200).send(result1[0]) //send updatean dr sql yang isverifiednya udah 1, untuk di FE
            })
        })
    },
    sendemailverified:(req,res)=>{ //untuk send email ulang kalo tokennya udah expired
        const {userid,username,email}=req.body
        const token=createJWTToken({id:userid,username:username})
        var LinkVerifikasi=`http://localhost:3000/verified?token=${token}`
        var mailoptions={
            from:'Admin <ardiani.bernhard@gmail.com>',
            to: email,
            subject:'Second Account Verification - Expires after :12 Hour',
            html:`Hello ${username},<br>
            Before you start shopping, please verify your e-mail address by clicking on the link below :<br>
            <a href=${LinkVerifikasi}>Account Verification</a><br>
            Thanks,<br>
            Adidas Team`
        }
        transporter.sendMail(mailoptions, (err,result2)=>{
            if (err) return res(500).send(err)
            return res.status(200).send({status:true})
        })
    },
    login:(req,res)=>{
        const {username,password}=req.query
        const hashpass = encrypt(password)
        var sql=`select * from users where username='${username}' or email='${username}' and password='${hashpass}'`
        console.log('logging in..')
        db.query(sql,(err,result)=>{ 
            if(err) return res.status(500).send(err)
            if(result.length){
                console.log(result)
                var data = {
                    lastlogin: new Date()            
                }
                sql = `update users set ? where id=${result[0].id}`
                db.query(sql,data,(err2,result2)=>{
                    if(err2) return res.status(500).send(err2)
                    console.log(result[0].id)
                    console.log(result2)
                    const token=createJWTToken({id:result[0].id,username:result[0].username})
                    return res.status(200).send({...result[0],status:true,token:token})
                })
            }
            else{
                sql=`select * from users where username = '${username}' or email = '${username}'`
                db.query(sql, (err3, res3)=>{
                    if(err3) return res.status(500).send(err3)
                    if(res3.length) {
                        return res.status(200).send({status : false, message : 'wrong password'})
                    }else{
                        return res.status(200).send({status : false, message : 'wrong username / email'})
                    }
                })
            }
        })
    },
    keeplogin:(req,res)=>{
        console.log(req.user)
        var sql=`select * from users where id=${req.user.id}`
        db.query(sql,(err,result)=>{
            if(err) return res.status(500).send(err)
            const token=createJWTToken({id:result[0].id,username:result[0].username})
            return res.status(200).send({...result[0],token:token})
        })
    },
    forgotpassword:(req,res)=>{
        const {email,username}=req.body
        var token=createJWTToken({email:email})
        var forgotPasswordLink=`http://localhost:3000/resetpassword?token=${token}`
        var maildata={
            from: 'Admin <ardiani.bernhard@gmail.com>',
            to: email,
            subject: 'Forgot Your Password?',
            html: `Hi ${username}, <br>
            We've received a notification that you forgot your password. <br>
            If you didn't make the request, just ignore this email. <br>
            Otherwise, you can reset your password using this link below.<br>
            <a href=${forgotPasswordLink}>Reset_Password<a/><br>
            This link will expires after 12 hour`
        }
        transporter.sendMail(maildata,(err,result)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send({status:true})
        }) 
    },
    forgotpasswordverified:(req,res) => {
        console.log(req.user, 'this is req.user')
        const {email} = req.user
        return res.status(200).send(email)
    },
    resetpassword:(req,res)=>{
        console.log(req.body, 'this is req.body')
        const {email, username, password} = req.body
        console.log(req.body.username)
        const hashpass=encrypt(password)
        var obj={
            password:encrypt(password) 
        }
        var sql = `update users set ? where username='${username}' and email='${email}'`
        db.query(sql, obj,(err,res1)=>{
            if(err) return res.status(500).send(err)
            return res.status(200).send({status:'success'})
        })
    },
}