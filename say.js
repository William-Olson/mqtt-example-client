'use strict';
const mqtt = require('mqtt');
const config = require('./config');

const url = process.env.MQTT_URL   || config.url;
const topic = process.env.MQTT_TOPIC || config.topic;


const opts = {
    clientId: 'Producer-Say',  // + Math.random(),
    clean: false
};


const client  = mqtt.connect(url, opts);
let done;
const p1 = new Promise(r => done = r);

console.log('using client id: ', opts.clientId);

client.on('connect', function () {

    console.log('producing message: ' + process.argv[2]);
    client.publish(topic, process.argv[2], {
        qos: 2,
        retain: false,
    }, done);

});


p1.then(() => {
    client.end();
});
