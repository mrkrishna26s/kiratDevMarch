// example:  a node js process can also get response from another running node.js process
function logResponseBody(jsonBody){
    console.log(jsonBody)
}

function callbackfn(result){
    result.json().then(logResponseBody)
}

var sendObj = {
    method :"GET"
}
fetch("http://localhost:3000/handlesum?counter=10",sendObj).then(callbackfn);