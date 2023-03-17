var http = require('http');
var url = require('url');
var mysql = require('mysql');
var fs = require('fs');
var nodemailer = require('nodemailer');

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

var transporter = nodemailer.createTransport(
    {
        service: 'Hotmail',
        auth: {
            user: 'badem3444@hotmail.com',
            pass: 'Caglaymn123'
        }
    }
)


http.createServer(function (req, res){

    fs.readFile("giris.html", function(err,data){

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

        var sql_notpass = "SELECT * FROM user WHERE username = '" +bilgi.username+ "' AND password != '" + bilgi.password + "'";

        con.query(sql, function(err, result){



            var giris = false;

            if(result.length > 0){
                giris = true;
            }
            
            if(giris == true)
            {
                console.log("Giris Yapildi");
            }
            else if(giris == false)
            {
                var mailOption = 
                    {
                        from: 'badem3444@hotmail.com',
                        to: bilgi.username,
                        subject: 'Kaydiniz Olusturuldu',
                        text: 'Sistemimiz üzerinde varolan hesabiniza yanlis bir sifre giris denendi.'
                    }
                con.query(sql_notpass, function(err, result){
                    console.log("Kullanici adi dogru ancak sifre hatali!");

                    transporter.sendMail(mailOption, function(err, info){
                        if(err) throw err;
                        console.log("Mail gonderildi.");
                    })
                })
            }
            

        });

    }


}).listen(8080);