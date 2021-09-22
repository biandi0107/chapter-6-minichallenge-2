const express = require('express')
const app = express()
const { User } = require('./models')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/users', (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users)
        })
})

app.post('/users', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(user => {
        res.status(201).json(user)
    }) .catch(err => {
        res.status(422).json("Can't create user")
    })
})

app.get('/users/update/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id }
    })
        .then((user) => {
            res.render('users/update', {
                user
            })
        })
})

app.post('/users/update/:id', (req, res) => {
    User.update({
        username: req.body.username,
        password: req.body.password
    },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.send('You have updated a user')
        })
})

app.get('/users/delete/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.send('You have deleted a user')
        })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
