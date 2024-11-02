const userCtrl={}
const User= require('../models/Users');
const passport=require('passport');


userCtrl.renderSigninUpForm=(req,res)=>{
    res.render('users/signup')
};

userCtrl.signup=async(req,res)=>{
 errors=[]
 const {name,email,password,confirm_password}=req.body
   if(password != confirm_password){
      return errors.push({text:'las contraseñas no coinciden'})
   }if(password.lenght < 4){
    return errors.push({text:'las contraseña debe tener 4 caracteres'})
   }if(errors.length <0){
     res.render('users/signup',{
        email,
        name,
        errors,
        password,
        confirm_password
     })
   }else{
        const userEmail= await User.findOne({email:email})
        if(userEmail){
            req.flash('errors_msg','el email ya existe')
            res.redirect('users/signup')
        }else{
            const newUser= new User({name,email,password})
            newUser.password= await newUser.encryptPassword(password)
           await newUser.save()
            req.flash('success_msg','Usuario creado correctamente')
          res.redirect('/user/signin')
            
   }
    
};

}

userCtrl.renderSigninForm=(req,res)=>{
    res.render('users/signin')
}

userCtrl.signin =passport.authenticate('local',{
    failureRedirect:'users/signin',
    successRedirect:'/notes',
    failureFlash:true,

});



userCtrl.logout=(req,res)=>{
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "success_msg" , "Session cerrada" );
        res.redirect( "/user/signin" );

    });
}



module.exports=userCtrl;