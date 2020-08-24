const nodemailer=require('nodemailer')

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'suryagraha2207@gmail.com',
        pass:'gcuilkiotbikshrg'
    },
    tls:{
        rejectUnauthorized:false
    }
})

module.exports=transporter