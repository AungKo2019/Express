const LocalStrategy = require('passport-local');
const passport=require('passport');
const db=require('../database');

passport.serializeUser((user,done)=>{
    //console.log(user.username);
    done(null,user.username);
});

passport.deserializeUser(async(username,done)=>{
    try {
        const result=await db.promise().query(`select * from Users where username='${username}'`);
         if(result[0][0]){
            //console.log(result[0][0])
            done(null,result[0][0]);
         }
    } catch (error) {
        done(err,null);
    }
   
});

passport.use(new LocalStrategy(
    async(username,password,done)=>{
        try {
            console.log(username,password);
            const result=await db.promise().query(`select * from Users where username='${username}'`);
            if(result[0].length===0){
             done(null,false);
            }else {
             if(result[0][0].password=== password){
                 done(null,result[0][0]);
             }else {
                 done(null,false);
             }
            }
        } catch (error) {
            done(err,false);
        }
    }
));

 module.exports =passport;