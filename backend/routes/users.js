const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req,res)=> {
    res.send("Hey It's User Route")
})

//update user
router.put("/:id", async(req,res)=>{
    if(req.body.userID === req.params.id)
    {
        if(req.body.password)
        {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            return res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
        
    }
    else{
        return res.status(403).json("Invalid Access!")
    }
});


//delete user
//get a user
router.get("/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
});



//follow a user
//unfollow a user

module.exports = router