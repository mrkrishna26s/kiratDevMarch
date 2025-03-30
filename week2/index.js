const express = require("express");
const bodyParser = require("body-parser");//only use whe we need to pass input from body
const app = express();
const port = 3000;
app.use(bodyParser.json())// it adds a middleware before the work flow
function calculateSum(counter){
    var sum = 0;
    for(var i =0; i< counter ; i++){
        sum = sum + i;
    }
    return sum;
}
function handleFirstRequest(req, res){
    var counter = req.query.counter;
    var calculatedSum = calculateSum(counter);
    var answerObj = {
        sum : calculatedSum,
    };
    res.send(answerObj);
}
app.get('/handlesum', handleFirstRequest)

function started(){
    console.log(`Example app listning on port ${port}`);
}

app.listen(port, started)
 