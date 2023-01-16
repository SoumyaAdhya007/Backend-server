const express=require("express");
const {PostModel}=require("../models/post.model")
const PostRouter=express.Router();

PostRouter.get("/", async (req,res)=>{
    const querry=req.query;;
    const userId_req=req.body.userId;

    try {
        const post=await PostModel.find({userId:userId_req, querry});
        res.send(post)

    } catch (error) {
        res.send({"msg":error})
    }
})

PostRouter.post("/create", async (req,res)=>{
    const payload= req.body;
    try {
        const post=new PostModel(payload);
        await post.save();
        res.send(post)
    } catch (error) {
        res.send({"msg":"Cannot Post"})
        
    }
})
PostRouter.patch("/update/:id", async (req,res)=>{
    const payload= req.body;;
    const id= req.params.id;
    const post=await PostModel.findOne({_id:id})
    const userId=post.userId;
    const userId_req=req.body.userId;
    try {
        if(userId_req!=userId){
            res.send({"msg":"Not Aythorazid"})
        }else{
            await PostModel.findByIdAndUpdate({_id:id},payload);
            res.send(`Note is updated of ${id}`)
        }
    } catch (error) {
        res.send({"msg":error})
        
    }
})
PostRouter.delete("/delete/:id", async (req,res)=>{
    const payload= req.body;;
    const id= req.params.id;
    const post=await PostModel.findOne({_id:id})
    const userId=post.userId;
    const userId_req=req.body.userId;
    try {
        if(userId_req!=userId){
            res.send({"msg":"Not Aythorazid"})
        }else{
            await PostModel.findByIdAndDelete({_id:id});
            res.send(`Note is updated of ${id}`)
        }
    } catch (error) {
        res.send({"msg":error})
        
    }
})

module.exports={
    PostRouter
}