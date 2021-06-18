const router = require("express").Router()
const Post = require("../models/Post")

//create a post --(here post means a social media post....)
router.post("/",async(req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.json(savedPost)

    }catch(err){
        res.json(err)
    }
})

//update post
router.put("/:id",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        if( post.userId === req.body.userId){
            await post.updateOne({$set: req.body})
            res.json("updated post")
        }else{
            res.json("You can update only ur post")
        }
    }catch(err){
        res.json(err)
    }
})


//delete post
router.delete("/:id",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        if( post.userId === req.body.userId){
            await post.deleteOne()
            res.json("deleted post")
        }else{
            res.json("You can delete only ur post")
        }
    }catch(err){
        res.json(err)
    }
})

//Like and Dislike (if again pressed) post
router.put("/:id/like",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.json("Liked post")
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.json("Disliked post")
        }
    }catch(err){
        res.json(err)
    }
})

// get a post
router.get("/:id",async(req,res)=>{
    try{
        const post =  await Post.findById(req.params.id)
        res.json(post)

    }catch(err){
        res.json(err)
    }
})
module.exports = router