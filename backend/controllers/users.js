const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    const { password, ...rest } = req.body
    const passHash = await bcrypt.hash(password, 10)
    console.log(password, passHash)
    const user = await User.create({
        ...rest,
        passwordDigest: passHash
    })
    res.json(user)
})


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router