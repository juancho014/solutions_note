const express= require('express');
const morgan= require('morgan');
const path=require('path');
const exphbs=require('express-handlebars');
const app= express();
const method= require('method-override');
const flash= require('connect-flash');
const session= require('express-session');
const passport= require('passport');
require('./config/passport');


app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.set('view engine', '.hbs');
app.use(method('_method'));
app.use(session({secret:'secret',
                 resave:true,
                 saveUninitialized:true}))
app.use(flash());
const hbs= exphbs.create({
    defaultLayouts:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
});

app.use(passport.initialize());
app.use(passport.session());
app.engine('.hbs',hbs.engine);

app.use(morgan('dev'));

app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error =req.flash('error');
  res.locals.user=req.user||null;
    next()
});


app.use(require('./router/index.router'));
app.use(require('./router/notes.router'));
app.use(require('./router/user.router'))

module.exports=app;