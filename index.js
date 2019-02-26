'use strict';
const mqtt = require('mqtt');
const config = require('./config');
const fs = require('fs');
const path = require('path');

// file to output to
const stream = fs.createWriteStream(path.join(__dirname, 'output', 'dump.txt'));

const url = process.env.MQTT_URL   || config.url;
const topic = process.env.MQTT_TOPIC || config.topic;

let count = 0;

const opts = {
    clientId: 'Consumer-A',
    clean: false
};


const client  = mqtt.connect(url, opts);

console.log('using client id: ', opts.clientId);

client.on('connect', function () {

  client.subscribe(topic, { qos: 2 }, function (err) {
    if (err) {
      console.error('Error:', err);
      process.exit(-1);
    }
  });

});

client.on('message', function (topic, message) {

  let msg = `${message}`;
  if (msg === 'done') {
    const countMessage = '\n' + ' Total Message Count for ' + topic + ' :: ' + count + '\n';
    stream.write(countMessage);
    stream.end();
    client.end();
    console.log('\n' + countMessage);
    console.log('\nexiting now...');
    process.exit(0);
  }

  // increment count and show we are processing a message
  count += 1;
  process.stdout.write(':' + count + ':');

  // write to file
  stream.write(message + '\n');

});

