#### Extremely basic MQTT client to test Consumption of and Producing MQTT messages


Write consumed messages to file
```
docker run --rm -it --name consumer-writer -e "MQTT_URL=mqtt://broker:1883" --link mqtt-server:broker -v <absolute-path>:/opt/container/output willko/mqtt-example-client node index.js
```


Or just log messages
```
docker run -it --rm --name my-consumer --link mqtt-server:broker -e "MQTT_URL=mqtt://broker:1883" willko/mqtt-example-client
```

Produce a single message:
```
docker run -it --rm --name my-producer --link mqtt-server:broker -e "MQTT_URL=mqtt://broker:1883" -e "MQTT_TOPIC=axzon-topic" willko/mqtt-example-client node say hello
```
