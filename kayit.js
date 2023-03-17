var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "nodedb"
    }
);

http.createServer(function (req, res){

    fs.readFile("kayit_form.html", function(err, data){
        if(err){
            res.writeHead(404, {'Content-Type':'text/html'});
            return res.end("404 Dosya Bulunamadi.");
        }

        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    })

    var bilgi = url.parse(req.url, true).query;

    if(bilgi.username && bilgi.password){

        console.log(bilgi.username);
        console.log(bilgi.password);

        con.connect(function (err){
            if (err) throw err;
            console.log("Baglandi!");

            var degerler = [bilgi.username, bilgi.password];

            var sql = "INSERT INTO user (username,password) VALUE (?,?)";

            con.query(sql, degerler, function(err, result){
                if(err) throw err;
                console.log("1 Kayit oluştu.");
            } )

        });



    }



}).listen(8080);