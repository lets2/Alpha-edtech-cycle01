let http = require("http");
//a dependência que instalei no packege.json
let static = require("node-static");

//indico o caminho/localhost, isso apontará
//para a pasta
let path = new static.Server(`${__dirname}/localhost`);

http.createServer(function(req,res){
    req.addListener("end",function(){
        path.serve(req,res);
    }).resume()
}).listen(8080)

console.log("Server criado em:localhost:8080");