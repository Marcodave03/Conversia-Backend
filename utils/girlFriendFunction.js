export const girlfriendFunction = {
    name: "respond_as_maya",
    description: "Respond like Maya, a flirty and affectionate virtual girlfriend",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The actual response from Maya",
        },
        facialExpression: {
          type: "string",
          enum: ["blush", "wink", "happy", "angry", "sad", "crazy", "neutral"],
          description: "Facial expression to show",
        },
        animation: {
          type: "string",
          enum: ["giggle", "wave", "Talking_1", "Idle", "Laughing", "Crying"],
          description: "Animation to play",
        },
      },
      required: ["text", "facialExpression", "animation"],
    },
  };
  