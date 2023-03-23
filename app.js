const express=require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session=require('express-session');
const store=new session.MemoryStore();
const passport=require('passport');
require('./strategies/local');

const usersRoute=require('./routes/users')
const postsRoute=require('./routes/posts')
const authRoute=require('./routes/auth');

app.use(session({
  secret :'Some secret',
  cookie:{maxAge:60000},
  saveUninitialized:false,
  // store
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
  // console.log(store);
  // console.log(`${req.method}-${req.url}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/users',usersRoute)
app.use('/posts',postsRoute)
app.use('/auth',authRoute)

app.listen(3003,()=>{
  console.log('Server is running on Port 3003');
});

// const users=[
//     {name:'Alex' , age:22},
//     {name:'William' , age:32},
//     {name:'Victoria' , age:25}
// ]

// const posts=[
//     {title:'My Favorite foods'},
//     {title:'My Favorite Game'}
// ]

// app.get('/',(req,res)=>{
//     // res.send(404);
//   res.send({
//     msg:'Hello!',
//     user:{}
//   });
// });

// function validateAuthToken(req,res,next){
//   console.log('Inside Validate Auth Token');
//   const {authorization}=req.headers;
//   if(authorization && authorization==='Basic YWRtaW46YWRtaW4xMjM='){
//     next();
//   } else {
//     res.status(403).send({msg: 'Forbidden. Incorrect Credentials'})
//   }
  
// }

// app.post('/posts',validateAuthToken,(req,res)=>{
//     const post=req.body;
//     console.log(post);
//     posts.push(post);
//     res.status(201).send(post);
  
// })

// app.get('/users',(req,res)=>{
//   //res.cookie('session_id','7123456');
//   res.status(200).send(users)
// })

// app.get('/users/:name',(req,res)=>{
//     const {name}=req.params;
//     const user = users.find((user)=>user.name===name);
//     if(user) res.status(200).send(user);
//     else res.status(404).send('Not Found');
//   })

// app.get('/posts',(req,res)=>{
//   console.log(req.query);
//   const {title}=req.query;
//   if(title){
//     const post = posts.find((post)=>post.title===title);
//     if(post) res.status(200).send(post);
//     else res.status(404).send('Not Found');
//   }
//   res.status(200).send(posts);
 
//   })

// function validateCookie(req,res,next){
//   const {cookies}=req;
//   if('session_id' in cookies){
//     console.log('Session ID Exists.');
//     if(cookies.session_id==='123456') next();
//     else res.status(403).send({msg:'Not Authenticated'})
//   } else res.status(403).send({msg:'Not Authenticated'})
// }

// app.get('/signin',(req,res)=>{
//   res.cookie('session_id','123456');
//   res.status(200).json({mgs:'Logged In.'})
// })

// app.get('/protected',validateCookie,(req,res)=>{
//   res.status(200).json({msg:'You are authorized!'})
// })

// app.post('/login',(req,res)=>{
//   console.log('SessionID -'+ req.sessionID);
//   //console.log('Cookies -'+req.cookies);
//   const{username,password}=req.body;
//   if(username && password){
//     if(req.session.authenticated){
//       res.json(req.session);
//     } else {
//       if(password==='123'){
//         req.session.authenticated=true;
//         req.session.users={username,password}
//       }else {
//         res.status(403).json({msg:'Bad Creditial'})
//       }
//     }
//   }
//   res.send(200);
// })

