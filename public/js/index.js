var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'long',
    //     text: 'hello!!'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newEmail', function (email) {
    console.log('New email ', email);
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    //
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('HH:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>')
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Hai',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocaltion not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (postion) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: postion.coords.latitude,
            longitude: postion.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.')
    });
});


