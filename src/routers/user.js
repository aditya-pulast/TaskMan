const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const router = new express.Router()
// const {sendEmail} = require('../emails/account')
// const { sendCreationEmail } = require('../emails/account');
// const { sendDeletionEmail } = require('../emails/account');
// const multer = require('multer')
// router.post ('/user', async (req, res) => {
//     try{
//         const user = new User(req.body)
//         await user.save()
//         await sendEmail(user.email)
//         const token = await user.generateAuthToken()
//          res.status(201).send({user, token})
//     } catch(e){
//         res.status(400).send(e)
//     } 
   
// })
const { sendCreationEmail, sendDeletionEmail } = require('../emails/account');

// Route for creating a user
router.post('/user', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    // Call the sendCreationEmail function after successfully creating the user
    await sendCreationEmail(user.email);

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route for deleting a user
router.delete('/user/me', auth, async (req, res) => {
  try {
    const _id = req.user._id;

    // Call the sendDeletionEmail function before deleting the user
    await sendDeletionEmail(req.user.email);

    // Delete the user
    await User.findByIdAndDelete(_id);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/user/login', async(req, res)=>{
    try{
       const user = await User.findByCredentials(req.body.email,req.body.password)
    //    console.log('ahysgd')
    if(!req.body.email) console.log('wrong mail')
    if(!req.body.password) console.log('wrong password')
          const token = await user.generateAuthToken()
       res.status(200).send({user, token})
    }catch(e){
        res.status(400).send(e.message)
    }
})
// router.post('/user/login', async(req, res) => {
//     //Login a registered user
//     try {
//       const { email, password } = req.body
//       const user = await User.findByCredentials(email, password)
//       const token = await user.generateAuthToken()
//     //   if (!user) {
//     //     return res.status(401).send({error: 'Login failed! Check authentication credentials'})
//     //   }
//     //   console.log('iaugsc')
//       res.send({ user, token })
//     } catch (error) {
//       res.status(200).send(error)
//     }
  
//   })
router.post('/user/logout', auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()

    }
})

router.post('/user/logoutAll',auth,async(req, res)=>{
    try{
        req.user.token = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
router.get ('/user/me',auth,async (req, res) => {
    
    res.send(req.user)

})

router.get ('/user/:id', async(res,req)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send(e)
    }

})
router.patch('/user/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((updates)=> allowedUpdates.includes(updates))
    if(!isValidOperation){
        return res.status(404).send({error:'Invalid updates'})
    }
    try{
        // const user = await User.findById(req.params.id)
        updates.forEach((updates)=> req.user[updates] = req.body[updates])
       await req.user.save()
  
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})
// router.delete('/user/me',auth ,async (req, res)=>{
//     try{
//          const _id = req.user._id
//          console.log(_id)
//         // await req.user.remove()
//         await sendDeletionEmail(req.user.email);
//         await User.findByIdAndDelete(_id)
//         res.send(req.user)
//     }catch(e){
//         res.status(500).send()

//     }
// })
const upload = multer({ 
    // dest: 'avatars',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error('Please upload a image'))
    }
    cb(undefined,true)
}
});


router.post('/user/me/avatar', auth,upload.single('avatar'),async (req, res) => {
    const buffer = await sharp(req,file,buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send();
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
});
router.delete('/user/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})
router.get('/user/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set("Content-Type", "image/png")
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

module.exports = router