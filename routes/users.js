const {Router}=require('express');
const db=require('../database');
const router=Router();
const {check ,validationResult}=require('express-validator');

router.use((req,res,next)=>{
    console.log('Request made to/USERS ROUTE');
    next();
})

router.get('/',async(req,res)=>{
    if(req.user){
        //console.log(req.user);
        const result=await db.promise().query('select * from Users');
        res.status(200).send(result[0]);
    } else {
        res.status(403).send({msg:'Not Authenticated'});
    }
    
})

// router.get('/posts',(req,res)=>{
//     res.json({route:'Posts'});
// })

router.post('/',[check('username').notEmpty().withMessage('Cannot be Empty').isLength({min:5}).withMessage('grater than 5 char'),
    check('password').notEmpty().withMessage('Cannot be Empty')],
    (req,res)=>{
    const error=validationResult(req);
    console.log(error);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    const{username,password}=req.body;
    if(username && password){
        try {
            db.promise().query(`insert into Users values('${username}','${password}')`);
            res.status(201).send({msg:'Insert users Successfully'})
        } catch (error) {
            console.log(error);
        }
        
    }
})

module.exports=router; 