// const http = require ('http')
// const mysql = require('mysql')

// const server = http.createServer((req, res)=>{
//     res.end('hola mundo')
// })

// server.on('clientError', (err, socket) =>{
//     socket.end ('HTTP/1.1 400 Bad Request \r\n\r\n')
// })

// server.listen(8000)

// Check dependencies
var http = require('http');
// Create the http server.
// reference: http://net.tutsplus.com/tutorials/javascript-ajax/node-js-for-beginners/
http.createServer( function(request, response) {
    // Attach listener on end event.
    request.on('close', function() {
        console.log('request');

        // run asynchronous 
        getSQL(function(err, result) {
            console.log('json:', result);
            response.writeHead(200, {
                'Content-Type' : 'x-application/json'
            });
            // Send data as JSON string.
            response.write(result)
            response.end('hola')
        });
    });
}).listen(8000);

// Access MySQL via node-mysql
// https://github.com/felixge/node-mysql
function getSQL(callback) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host : 'sql121.main-hosting.eu',
        user : 'u865215954_marea',
        password : 'cnsm3314',
        database : 'u865215954_marea',
        // socketPath : '/var/run/mysqld/mysqld.sock', // socket for communication from debian <-> client, seems not to be set correcly by default?
    });

    connection.connect();    

    var json = '';
    var query = 'SELECT * FROM datos ORDER BY date DESC LIMIT 1';
    connection.query(query, function(err, results, fields) {
        if (err)
            return callback(err, null);

        // console.log('The query-result is: ', results[0]);

        // wrap result-set as json
        json = JSON.stringify(results);

        /***************
        * Correction 2: Nest the callback correctly!
        ***************/
        connection.end();
        // console.log('JSON-result:', json);
        callback(null, json);
    });
};
