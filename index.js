const express = require('express')
const app = express()
const port = 3001;
var bodyParser = require('body-parser')
require('./models')

const userCtrl = require('./controllers/userController');


app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/add', userCtrl.addUser)
app.get('/users', userCtrl.getUsers)
app.get('/users/:id', userCtrl.getUser)
app.post('/users', userCtrl.postUsers)
app.delete('/users/:id', userCtrl.deleteUser)
app.patch('/users/:id', userCtrl.patchUser)
app.get('/query', userCtrl.queryUser)
app.get('/finders', userCtrl.findersUser)

app.get('/get-set-virtual', userCtrl.getSetVirtual)

app.get('/validations', userCtrl.getValidations)
app.get('/raw-queries', userCtrl.rawQueriesUser)


// User.sync({force: true}); // check sequelize, first if table present it is drop and create new table 
// User.sync({alter: true});
// User.sync();
// User.drop(); table delete
// Contact.sync();
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})