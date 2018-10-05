const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://192.168.20.100');
 
client.on('connect', function() {

    client.subscribe('#', function(error) {

        if(error) {
            console.log(error);
        }else {
            console.log("Tópico assinado");
        }
    });

    ligarSalaAutomacao();
    //desligarSalaAutomacao();
});
 
client.on('message', function(topic, message) {

    console.log(topic);
    console.log(message.toString());
});

function desligarSalaAutomacao() {

    client.publish('iotech/30AEA4754084/command', '{"state": "off", "relay": "4", "command": "SetRelay"}');
    client.publish('iotech/30AEA4754084/command', '{"state": "off", "relay": "3", "command": "SetRelay"}');
    client.publish('iotech/30AEA4754084/command', '{"state": "off", "relay": "2", "command": "SetRelay"}');
    client.publish('iotech/30AEA4754084/command', '{"state": "off", "relay": "1", "command": "SetRelay"}');
}

function ligarSalaAutomacao() {

    client.publish('iotech/30AEA4754084/command', '{"state": "on", "relay": "4", "command": "SetRelay"}');
    client.publish('iotech/30AEA4754084/command', '{"state": "on", "relay": "3", "command": "SetRelay"}');
    client.publish('iotech/30AEA4754084/command', '{"state": "on", "relay": "2", "command": "SetRelay"}');
    client.publish('iotech/30AEA4754084/command', '{"state": "on", "relay": "1", "command": "SetRelay"}');
}