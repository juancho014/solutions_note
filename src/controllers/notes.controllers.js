const notesCtrl={};
const Nota=require('../models/notes');

notesCtrl.renderNoteForm=(req,res)=>{
  
    res.render('notes/all-notes')
}

notesCtrl.renderNewNote=async(req,res)=>{
 const {title,description}=req.body;
   const newNote= new Nota({title , description});
   newNote.user=req.user._id
     await newNote.save()
     req.flash('success_msg','Note added  successfuly')
    res.redirect('/notes')
}

notesCtrl.renderNote=async(req,res)=>{
  const notas=await Nota.find({user:req.user._id}).lean()
    res.render('notes/notes',{notas})
}

notesCtrl.renderEditNote=async(req,res)=>{
const notas= await Nota.findById(req.params.id).lean()
if (notas.user != req.user._id) {
  req.flash('error_msg','nota no autorizada')
  return res.redirect('/notes')
}
    res.render('notes/edit-notes',{notas})
}

notesCtrl.updateNote=async(req,res)=>{
 const {title,description}= req.body;
 await Nota.findByIdAndUpdate(req.params.id,{title,description})
 req.flash('success_msg','Note edit successfuly')
   res.redirect('/notes')
}

notesCtrl.deleteNote=async(req,res)=>{
    await Nota.findByIdAndDelete(req.params.id)
    req.flash('success_msg','Note delete successfuly')
    res.redirect('/notes')
}



module.exports=notesCtrl;