var mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'nodedb'
    }
);

con.connect(function (err) {
    if (err) throw err;
    console.log("Baglandi!");

    var sql = "DELETE FROM user WHERE id_num = 4";

    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("1 Kayit silindi.");
    });
});