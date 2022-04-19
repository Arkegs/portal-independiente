const User = require('../models/user');

module.exports.userAction = (req, res) => {
    return res.send("El user duro");
}

// Function to show one user info
module.exports.showUser = async (req, res) => {
    const foundUser = await User.find({username: req.params.username});
    return res.send(foundUser);
}

// Function to delete an user
module.exports.deleteUser = async (req, res) => {
    const deletedUser = await User.findOneAndDelete({username: req.params.username}).exec();
    return res.send(deletedUser);
}

// Function to update an existing user
module.exports.updateUser = async (req, res) => {
    const updatedUser = await User.findOneAndUpdate({username: req.params.username}, {...req.body}).exec();
    return res.send(updatedUser);
}

// Function to register a new user
module.exports.register = async (req, res) => {
    return res.send('Equis de');
}