var moment = require('moment');

// var date = new moment();
// console.log(date.format('Y-MM-DD H:m S'));

// var date = new Date();
// var months = ['Jan', 'Fed'];
// console.log(date.getMonth());

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 31234;
var date = new moment(createdAt);
console.log(date.format('HH:mm a'));
