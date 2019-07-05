var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/messages', (req, res) => {
    var messages = [{name:'fa',message:'fesg'},{name:'faf',message:'fesgs'}]
    res.send(messages);
})

// app.post('/messages', (req, res) => {
//     try{
//         io.emit('message', req.body);
//         res.sendStatus(200);
//     } catch (error){
//         res.sendStatus(500);
//         return console.log('error',error);
//     }
// })

io.on('connection', (socket) =>{
    console.log('a user is connected')
    socket.on('message', (msg) => {
        console.log(`msg: ${msg}`)
        io.emit('message', msg);
    })
})

var server = http.listen(3001, () => {
    console.log('server is running on port', server.address().port);
});