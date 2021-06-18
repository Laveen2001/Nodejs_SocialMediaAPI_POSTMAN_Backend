// await is waiting for promise/response and used only with async

const User = require('../models/User')

const router = require('express').Router()
const bcrypt = require("bcrypt")
//REGISTER
router.post("/register", async (req, res) => {

    try {
        //generate new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //create user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        //save user and respond
        const user = await newUser.save()
        res.json(user)

    } catch (err) {
        console.log(err)
    }
})

//LOGIN
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        !user && res.json("User not Found")
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.json("Wrong Password")

        res.json(user)

    }catch(err){
        res.json(err)
    }
})

module.exports = router