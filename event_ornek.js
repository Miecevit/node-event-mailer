var fs = require('fs');
var events = require('events');

var dosyaOku = fs.createReadStream('a.html');

dosyaOku.on('open', function(){
    console.log("Dosya açık!");
});