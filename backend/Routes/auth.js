const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Harrietiso%^d"
const fetchuser = require("../Middleware/fetchuser")
const User = require('../Models/User')

//ROUTE 1: Creating a user using POST api/auth/createuser

router.post('/createuser', [
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
    body('email').isEmail()
], async (req, res) => {
    let success = false;
    // If there are errors return the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    try {
        // check whwether email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Email already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const securedPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPass
        })
        // console.log(user.id)
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("some error occured")
    }
})


//ROUTE 2:  Authenticate a user
router.post('/login', [
    body('email').isEmail(),
    body('password', "password cannot be blank").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Incorrect credentials" })
        }
        const pCompare = await bcrypt.compare(password, user.password)
        if (!pCompare) {
            success = false
            return res.status(400).json({ success, error: "Incorrect credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


//ROUTE 2:  Get logged in user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;