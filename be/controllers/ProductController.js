const {db} = require('../connection/mysqldb')
const transporter=require('../helper/mailer')
const {createJWTToken}=require('../helper/jwt')
const encript=require('../helper/crypto')
const {uploader}=require('../helper/uploader')
const fs = require('fs')

module.exports={

    //================ ADMIN PAGE ================//

    getProduct:(req,res)=>{
            var sql=`   SELECT p.*,c.id AS idcat,c.name AS catnama
                        FROM products p 
                            JOIN category c 
                            ON p.categoryId=c.id
                        WHERE p.isdeleted=0`
            db.query(sql,(err,product)=>{
                if(err) res.status(500).send(err)
                sql=`SELECT id,name FROM category`
                db.query(sql,(err,category)=>{
                    if(err) res.status(500).send(err) 
                    return res.send({product,category})
                })
            })
    },
    addProduct:(req,res)=>{
        try {
            console.log('masuk try')
            const path='/product' //terserah namanya
            const upload=uploader(path,'PROD').fields([{name:'image'}])
            console.log(path)
            upload(req,res,(err)=>{ 
                if(err){
                    return res.status(500).json({message: 'upload picture failed !',error:err.message})
                }
                console.log('lewat') //pada tahap ini foto berhasil di upload
                const {image}=req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
                console.log(req.body.data)
                const data = JSON.parse(req.body.data); //mengubah json menjadi objek
                console.log(data,1)
                data.image=imagePath
                console.log(data,2)
                var sql=`insert into products set ?`
                db.query(sql,data,(err,result)=>{
                    if (err){
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({message:"There is an error on the server. Please contact the administrator.",error:err.message});
                    }
                    sql=`select p.*,c.id as idcat,c.name as catnama 
                        from products p join category c on p.categoryid=c.id
                        where p.isdeleted=0`
                    db.query(sql,(err1,result1)=>{
                        if(err1) return res.status(500).send({message:'error insert'})
                        return res.status(200).send(result1)
                    })
                })
            })
        }catch(error){
            return res.status(500).send({message:'catch error'})
        }
    },
    getcategory:(req,res)=>{
        var sql=`select id,name from category`
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send({status:false})
            return res.status(200).send(result)
        })
    },
    deleteProduct:(req,res)=>{
        const {id}=req.params
        var sql=`select * from products where id=${id}`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            if (result.length){
                var obj={
                    isdeleted:1,
                    image:null
                }
                sql=`update products set ? where id=${id}`
                db.query(sql,obj,(err,result2)=>{
                    if (err) res.status(500).send(err)
                    console.log(result2)
                    if(result[0].image){
                        fs.unlinkSync('./public'+result[0].image)
                    }
                    sql=`select p.*,c.id as idcat,c.name as catnama 
                    from products p join category c on p.categoryId=c.id
                    where p.isdeleted=0`
                    db.query(sql,(err1,result1)=>{
                        if(err1) return res.status(500).send({message:'error insert'})
                        return res.status(200).send(result1)
                    })
                })
            } else {
                return res.status(500).send({message:'nggak ada woy idnya'})
            }
        })
    },
    editProduct:(req,res)=>{
        const {id}=req.params
        var sql=`select * from products where id=${id}`
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            if(result.length){
                try {
                    const path='/product' //terserah namanya
                    const upload=uploader(path,'PROD').fields([{name:'image'}])
                    upload(req,res,(err)=>{ 
                        if(err){
                            return res.status(500).json({message: 'upload picture failed !',error:err.message})
                        }
                        console.log('lewat') //pada tahap ini foto berhasil di upload
                        const {image}=req.files;
                        console.log(image)
                        const imagePath = image ? path + '/' + image[0].filename : null;
                        const data = JSON.parse(req.body.data); //mengubah json menjadi objek
                        if(imagePath){
                            data.image=imagePath
                        }
                        sql=`update products set ? where id = ${id}`
                        db.query(sql,data,(err1,result1)=>{
                            if (err1){
                                if(imagePath){
                                    fs.unlinkSync('./public' + imagePath);
                                }
                                return res.status(500).json({message:"There is an error on the server. Please contact the administrator.",error:err.message});
                            }
                            if(imagePath){ //hapus foto lama
                                if(result[0].image){
                                    fs.unlinkSync('./public'+result[0].image)
                                }
                            }
                            sql=`select p.*,c.id as idcat,c.name as catnama 
                                from products p join category c on p.categoryId=c.id
                                where p.isdeleted=0`
                            db.query(sql,(err,result2)=>{
                                if(err) return res.status(500).send({message:'error get data'})
                                return res.status(200).send(result2)
                            })
                        })
                    })
                }catch(error){
                    return res.status(500).send({message:'catch error'})
                }
            }else{
                return res.status(500).send({message:'nggak ada idnya oy'})
            }
        })
    },

    //================ USER PAGE ================//

    getProductUser:(req,res)=>{
        const {search, filter, page}=req.query
        if(search){
            var sql= `  SELECT p.*,c.id AS idcat,c.name AS catnama
                        FROM products p 
                            JOIN category c 
                            ON p.categoryId=c.id
                        WHERE p.isdeleted=0 AND p.name LIKE '%${search}%'
                        LIMIT ${page},8`
            db.query(sql,(err,result)=>{
                if(err) res.status(500).send({err,message:'error get product search'})
                return res.send(result)
            })
        }else if(filter){
            var sql= `  SELECT p.*,c.id AS idcat,c.name AS catnama
                        FROM products p 
                            JOIN category c 
                            ON p.categoryId=c.id
                        WHERE p.isdeleted=0 AND p.categoryId=${filter}
                        LIMIT ${page},8`
            db.query(sql,(err,result)=>{
                if(err) res.status(500).send({err,message:'error get total product'})
                return res.send(result)
            })
        }else{
            var sql= `  SELECT p.*,c.id AS idcat,c.name AS catnama
                        FROM products p 
                            JOIN category c 
                            ON p.categoryId=c.id
                        WHERE p.isdeleted=0
                        LIMIT ${page},8`
            db.query(sql,(err,result)=>{
                if(err) res.status(500).send({err,message:'error get total product'})
                return res.send(result)
            })
        }
    },
    getTotalProduct:(req,res)=>{
        const {search, filter}=req.query
        if(search){
            console.log('masuk search')
            var sql= `  SELECT COUNT(id) AS total
                        FROM products 
                        WHERE isdeleted=0 AND name LIKE '%${search}%'`
            db.query(sql,(err,result)=>{
                if(err) res.status(500).send({err,message:'error get total product'})
                console.log(result)
                console.log(search)
                return res.send(result[0])
            })
        }else if(filter){
            console.log('masuk filter')
            var sql= `  SELECT COUNT(id) AS total
                        FROM products 
                        WHERE isdeleted=0 AND categoryId=${filter}`
            db.query(sql,(err,result)=>{
                if(err) res.status(500).send({err,message:'error get total product'})
                return res.send(result[0])
            })
        }else{
            var sql= `  SELECT COUNT(id) AS total
                        FROM products 
                        WHERE isdeleted=0`
            db.query(sql,(err,result)=>{
                if(err) res.status(500).send({err,message:'error get total product'})
                return res.send(result[0])
            })
        }
    },
    selectproduct:(req,res)=>{
        const {id}=req.params
        var sql=`   SELECT * 
                    FROM products 
                    WHERE id=${id}`
        db.query(sql,(err,result)=>{
            if(err) res.status(500).send(err)
            if(result.length){
                res.status(200).send(result[0])
            }else{
                res.status(500).send({message:'product not found'})
            }
        })
    }
}