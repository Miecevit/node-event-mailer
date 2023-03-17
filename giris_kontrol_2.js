var http = require('http');
var url = require('url');
var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "nodedb"
    }
);

con.connect(function(err){
    if(err) throw err;
    console.log("Baglandi");
});


http.createServer(function (req, res){

    fs.readFile("giris_form.html", function(err,data){

        if(err){
            res.writeHead(404, {'Content-Type':'text/html'});
            return res.end("404 Dosya bulunamadi.");
        }

        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        return res.end();

    });

    var bilgi = url.parse(req.url, true).query;

    if(bilgi.username && bilgi.password){

        var sql = "SELECT * FROM user WHERE username = '" +bilgi.username+ "' AND password = '" + bilgi.password + "'";

        con.query(sql, function(err, result){

            var giris = false;

            if(result.length > 0){
                giris = true;
            }
            
            if(giris == true){
                console.log("Giris Yapildi");
            }
            else{
                console.log("Bilgiler eslesmiyor");
            }
            

        });

    }


}).listen(8080);