var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('miyav', function(sayi, sayi2){
    console.log(sayi +" tane kedinin "+sayi2+" defa miyavladığını duydum sanki!");
});

eventEmitter.emit('miyav', 2, 3);