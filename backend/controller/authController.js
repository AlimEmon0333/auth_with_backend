const sendResponse = require("../helper/helper")
const userModel = require("../model/authModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authController = {
    signUp: async (req, res) => {
        try {
            let { userName, password, contactNumber } = req.body
            let signupObj = { userName, password, contactNumber }
            // array of validation errors
            let errArray = []
            // create validation
            if (!signupObj.userName) {
                errArray.push("User name is required")
            }
            if (!signupObj.password) {
                errArray.push("Password is required")
            }
            if (!signupObj.contactNumber) {
                errArray.push("Contact number is required")
            }
            if (errArray.length > 0) {
                res.status(400).send(sendResponse(false, "validation error", errArray))
                return;
            }
            const userExist = await userModel.findOne({ userName: signupObj.userName })
            if (userExist) {
                res.status(400).send(sendResponse(false, "User name is already exist"))
                return;
            }
            // let hash the password
            signupObj.password = await bcrypt.hash(signupObj.password, 10)
            // let create the user
            let user = new userModel(signupObj)
            let result = user.save()
            if (result) {
                res.status(200).send(sendResponse(true, "User Created Successfully", result))
                return;
            }
        } catch (error) {
            res.status(500).send(sendResponse(false, "internal server error", error))
            return;
        }
    },

    login: async (req, res) => {
        try {
            let { userName, password } = req.body;
            let loginObj = { userName, password }
            let checkUserExist = await userModel.findOne({ userName: loginObj.userName })
            if (checkUserExist) {
                let checkPasswordIsCorrect = await bcrypt.compare(
                    loginObj.password,
                    checkUserExist.password
                )
                if (checkPasswordIsCorrect) {
                    let token = jwt.sign({ ...checkUserExist }, process.env.SECRET_KEY)
                    res.status(200).send(sendResponse(true, 'login successfully', { user: checkUserExist, token: token }))
                    return;
                } else {
                    res.status(400).send(sendResponse(true, 'your password is in correct'))
                    return;
                }
            } else {
                res.status(401).send(sendResponse(false, "user not foud with this user name"))
                return;
            }
        } catch (error) { }

    },
}

module.exports = authController