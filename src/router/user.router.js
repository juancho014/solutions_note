const { Router}=require('express');
const router=Router();
const{renderSigninUpForm,
      signup,
      renderSigninForm,
      signin,
      logout}=require('../controllers/user.controllers');
   


router.get('/user/signup',renderSigninUpForm);


router.post('/user/signup',signup);

router.get('/user/signin',renderSigninForm);

router.post('/user/signin',signin);

router.get('/user/logout',logout);


module.exports=router;