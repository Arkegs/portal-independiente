module.exports.sessionizeUser = user => {
    return {"userId": user._id.toString(), "username": user.username};
}