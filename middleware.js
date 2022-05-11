module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        return res.send({status:'failure', payload:'Unauthorized'});
    }
    next();
}
