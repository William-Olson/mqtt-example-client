'use strict';
const mqtt = require('mqtt');
const config = require('./config');

const url = process.env.MQTT_URL   || config.url;
const topic = process.env.MQTT_TOPIC || config.topic;


const opts = {
    clientId: 'Producer-A',  // + Math.random(),
    clean: false
};


const client  = mqtt.connect(url, opts);
let pub1Done, pub2Done, pub3Done;
const p1 = new Promise(r => pub1Done = r);
const p2 = new Promise(r => pub2Done = r);
const p3 = new Promise(r => pub3Done = r);

console.log('using client id: ', opts.clientId);

client.on('connect', function () {

    client.publish(topic, JSON.stringify({ message: 'hello mqtt from retained 1' }), {
        qos: 2,
        retain: true,
    }, () => { console.log('done'); pub1Done(); });

    client.publish(topic, JSON.stringify({ message: 'hello mqtt from retained 2' }), {
        qos: 2,
        retain: true,
    }, () => { console.log('done'); pub2Done(); });

    client.publish(topic, JSON.stringify({ message: 'hello mqtt from retained 3' }), {
        qos: 2,
        retain: true,
    }, () => { console.log('done'); pub3Done(); });


});


Promise.all([ p1, p2, p3 ]).then(() => {
    client.end();
});
