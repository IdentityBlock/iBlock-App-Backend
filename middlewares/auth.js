require('dotenv').config();

module.exports = (req, res, next) => {
    if (req.header("apiKey") === process.env.APIKEY  ){
        next();
    }
    else{
        return res.status(403).json({"message": "UNAUTHORIZED"}).end();
    }

}
