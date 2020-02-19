#### Very Simple MQTT client to test Consumption of and/or Producing MQTT messages

First boot some sort of MQTT Server (broker) instance.

```
docker run --name mqtt-server --rm -it \
    -p 1883:1883 eclipse-mosquitto
```


Write consumed messages to file. Be sure to replace `<absolute-path>` with your desired output destination on your machine.

```
docker run --rm -it --name consumer-writer \
    -e "MQTT_URL=mqtt://broker:1883" \
    --link mqtt-server:broker \
    -v <absolute-path>:/opt/container/output \
    willko/mqtt-example-client node index.js
```


Or just log messages (to terminal)

```
docker run -it --rm --name my-consumer \
    --link mqtt-server:broker \
    -e "MQTT_URL=mqtt://broker:1883" \
    willko/mqtt-example-client
```

Produce a single message:

```
docker run -it --rm --name my-producer \
    --link mqtt-server:broker \
    -e "MQTT_URL=mqtt://broker:1883" \
    -e "MQTT_TOPIC=some-topic" \
    willko/mqtt-example-client node say hello
```
