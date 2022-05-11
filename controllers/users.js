const { sessionizeUser } = require('../helpers');
const passport = require('passport');
const User = require('../models/user');


module.exports.userAction = (req, res) => {
    return res.send("El user duro");
}

// Function to show one user info
module.exports.showUser = async (req, res) => {
    try{
        const foundUser = await User.find({username: req.params.username});
        return res.send({status:"success", payload: foundUser});
    }
    catch(err){
        return res.send({status:"failure", payload: err});
    }
}

// Function to delete an user
module.exports.deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.findOneAndDelete({username: req.params.username}).exec();
        return res.send({status:"success", payload: deletedUser});
    }
    catch(err){
        return res.send({status:"failure", payload: err});
    }
}

// Function to update an existing user
module.exports.updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findOneAndUpdate({username: req.params.username}, {...req.body}).exec();
        return res.send(updatedUser);
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
}

// Function to register a new user
module.exports.registerUser = async (req, res) => {
    try{
        const newUser = new User({...req.body});
        const registeredUser = await User.register(newUser, req.body.password);
        req.login(registeredUser, err =>{
            if(err) return next(err);
            return res.send({name: registeredUser.name, id: registeredUser._id});
        })
    } catch(err){
        return res.send({status:"failure", payload: err});
    }
}

// Function after successfully login an existing user
module.exports.loginUser = async (req, res) =>{
    try{
        console.log("Authentication successful conchetumare");
        return res.send({status: "success", payload:{name: req.user.name, id: req.user._id}});
    } catch(err){
        return res.send({status:"failure", payload: err});
    }

}

// Function for logging out users
module.exports.logoutUser = async (req, res) => {
    try{
        req.logout();
        return res.send({status:"success", payload: {name: '', id: ''}});
    } catch(err){
        return res.send({status:"failure", payload: err});
    }

}