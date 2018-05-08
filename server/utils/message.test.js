var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Long';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
        // store res in variable
        // assert from match
        // assert text match
        // assert createdAt is number
    });
});

describe('generateLocationMessage', ()=>{
   it('should generate correct location object' , () =>{
       var from = 'Deb';
       var lat = 15;
       var long = 19;
       var url = 'https://google.com/maps?q=15,19'
       var message = generateLocationMessage(from, lat, long);

       expect(typeof message.createdAt).toBe('number');
       expect(message).toMatchObject({from, url});
   });
});