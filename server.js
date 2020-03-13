// Module
let express = require('express')
let session = require('express-session')
let bodyParser = require('body-parser')

let app = express()

// Moteur de templates
app.set('view engine', 'ejs')

// Middleware
app.use('/assets',express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Session
app.use(session({
  secret: 'aazazazaz',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use(require('./middlewares/flash'))

// Routes
app.get('/', (request, response) => {

    let Message = require('./models/message')
    Message.all(function (messages) {
        response.render('pages/index', {messages: messages})

    })
    //console.log(request.session)
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        //response.render('pages/index', {error: "Vous n'avez pas entrez de message"})
        request.flash('error', "Vous n'avez pas entrez de message")
        response.redirect('/')

    } else {
        let Message = require('./models/message')
        Message.create(request.body.message , function () {
            request.flash('success', "Merci !")
            response.redirect('/')

        })
    }
})

app.get('/message/:id', (request, response) => {

    let Message = require('./models/message')
    Message.find(request.params.id, function (message) {
        response.render('messages/show', {message : message})
    })
    
})

//Ecouteur
app.listen(8080)