const passport= require('passport');
const localStrategy= require('passport-local');
const User= require('../models/Users')

passport.use(new localStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    const user= await User.findOne({email})
    if(!user){
        return done(null,false,{message:'email not found'})
    }else{
           const match= await user.matchPassword(password);
           if(match){
                return done(null,user)
           }else{
            return done(null,false,{message:'password not found'})
           }
    }

}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser(async(id,done)=>{
    const user= await User.findById(id).lean()
    done(null,user)
});