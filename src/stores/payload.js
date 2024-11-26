import { defineStore } from 'pinia'
import { ref } from 'vue'
import Payload from '../assets/payload.json'

export const usePayload = defineStore('payload', () => {
  const payload = ref(null);

  function initialise() {
    let nodes = [];
    let edges = [];

    Payload.forEach((object, index) => {
      switch (object.type) {
        case "trigger":
          nodes.push({
            id: object.id.toString(),
            position: { x: 100, y: (index + 1) * 100 },
            type: "trigger",
            data: {
              title: "Trigger",
              description: "Conversation Opened",
            }
          });
          break;

        case "sendMessage":
          nodes.push({
            id: object.id.toString(),
            position: { x: 100, y: (index + 1) * 100 },
            type: "sendMessage",
            data: {
              title: object.name,
              description: object.data.payload[0].text,
              attachments: object.data.payload[1] ? [object.data.payload[1].attachment] : [],
            },
          });

          if (Payload.find((payloadObject) => payloadObject.id === object.parentId).type !== "dateTimeConnector") {
            edges.push({
              id: crypto.randomUUID(),
              type: 'edgeWithButton',
              source: object.parentId.toString(),
              target: object.id.toString(),
              animated: true,
            });
          }
          break;

        case "dateTime": {
          let node = {
            id: object.id.toString(),
            position: { x: 100, y: (index + 1) * 100 },
            type: "businessHours",
            data: {
              title: object.name,
              description: object.name,
              times: {},
              timeZone: object.data.timezone === "UTC" ? "+0" : "+8",
            }
          };

          for (const time of object.data.times) {
            node.data.times[time.day] = {
              from: time.startTime,
              to: time.endTime,
            }
          }

          nodes.push(node);

          edges.push({
            id: crypto.randomUUID(),
            type: 'edgeWithButton',
            source: object.parentId.toString(),
            target: object.id.toString(),
            animated: true,
          });
          break;
        }

        case "dateTimeConnector":
          edges.push({
            id: crypto.randomUUID(),
            type: 'edgeWithButton',
            source: object.parentId.toString(),
            target: Payload.find((payloadObject) => payloadObject.parentId === object.id).id.toString(),
            animated: true,
            label: object.name,
          });
          break;
        
        case "addComment":
          nodes.push({
            id: object.id.toString(),
            position: { x: 100, y: (index + 1) * 100 },
            type: "addComment",
            data: {
              title: object.name,
              description: object.data.comment,
            },
          });

          edges.push({
            id: crypto.randomUUID(),
            type: 'edgeWithButton',
            source: object.parentId.toString(),
            target: object.id.toString(),
            animated: true,
          });
          break;
      }
    });

    payload.value = { nodes, edges };
  }

  return { payload, initialise };
});