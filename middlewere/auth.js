const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("../util/validate");
const userModel = require("../models/signUpModel");

//=========================================== authentication ===========================================================================================

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-auth-key"];
        if (!token) {
            return res.status(400).send({ status: false, msg: "Token is required" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if (error) {
                console.error('JWT verification error:', error);
                return res.status(401).send({ status: false, msg: "Invalid token" });
            } else {
                console.log('Decoded token:', decodedToken);
                req.userId = decodedToken.userId;
                next(); // Call next() inside the callback to ensure it's called after token verification
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, msg: error.message });
    }
}


//=========================================== authorisation ============================================================================================

const authorisation = async function (req, res, next) {
    try {
        let userId = req.params.userId;

        if (!isValidObjectId(userId)) {
            res
                .status(400)
                .send({ status: false, message: `${userId} is not a valid userId` });
            return;
        }
        let isUserExist = await userModel.findById(userId);
        if (!isUserExist) {
            return res
                .status(404)
                .send({ status: false, msg: "user does not exist" });
        }

        //📌 AUTHORISATION:
        if (req.userId !== userId) {
            return res.status(403).send({
                status: false,
                message: `Authorisation failed; You are logged in as ${req.userId}, not as ${userId}`,
            });
        }
        next();
    } catch (err) {
        res.status(500).send({
            status: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

//======================================================================================================================================================

module.exports = { authentication, authorisation };