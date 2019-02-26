const mqtt = require('mqtt');
const config = require('./config');

const url = process.env.MQTT_URL   || config.url;
const topic = process.env.MQTT_TOPIC || config.topic;


const opts = {
    clientId: 'Consumer-A', // + Math.random(),
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
  console.log(topic + ': ', message.toString());
});
