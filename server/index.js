const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
app = express()
app.use(express.json())

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //Bearer TOKEN
    if (!token) return res.sendStatus(401)
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.get("/check", authToken, async(req, res) => {
    res.status(200).send({msg: 'Verified!', user: req.user})
})

app.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || 12))
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const user = await prisma.user.create({data: {username: req.body.username, password: hashedPassword}})
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: "15m"})
        res.status(200).send({token, user})
    }
    catch (e) {
        res.sendStatus(409)
    }
    
})

app.post("/login", async(req, res) => {
    try {
        const user = await prisma.user.findUnique({where: {username: req.body.username}})
        const isAuthed = await bcrypt.compare(req.body.password, user.password)
        if (isAuthed)
        {
            const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: "15m"})
            res.status(200).send({token, user})
        }
        else
            res.sendStauts(401)
    }
    catch (e) {
        res.sendStatus(404)
    }
})

app.post("/save_recipe", authToken, async(req, res) => {
    try {
        const user = await prisma.user.update({where: {username: req.user.username}, data: {savedRecipes: {create: {recipeId: parseInt(req.body.recipeId), name: req.body.name, thumbnail: req.body.thumbnail} }}, include: {savedRecipes: true}})
        res.status(200).send({savedRecipes: user.savedRecipes})
    }
    catch (e) {
        res.sendStatus(400)
        console.log(e)
    }
    
})

app.get("/saved_recipes", authToken, async(req,res) => {
    try {
        const user = await prisma.user.findUnique({where: {username: req.user.username}, include: {savedRecipes: true}})
        res.status(200).send({savedRecipes: user.savedRecipes})
    }
    catch(e) {
        res.sendStatus(400)
        console.log(e)
    }
})

app.delete("/recipe/:id", authToken, async(req,res) => {
    try {
        const id = parseInt(req.params.id)
        const user = await prisma.user.update({where: {username: req.user.username}, data: {savedRecipes: {disconnect: {id: id}}}})
        res.sendStatus(201)
    }
    catch (e) {
        res.sendStatus(400)
        console.log(e)
    }
})

app.listen(process.env.PORT || 5555, () => {console.log("Listening on port " + process.env.PORT || 5555)})