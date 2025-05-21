

![Video Thumbnail](https://img.youtube.com/vi/EzzcEL_1o9o/maxresdefault.jpg)

[Video tutorial](https://youtu.be/EzzcEL_1o9o)

The frontend is [here](https://github.com/wass08/r3f-virtual-girlfriend-frontend).

## Setup
Create a `.env` file at the root of the repository to add your **OpenAI** and **ElevenLabs API Keys**. Refer to `.env.example` for the environment variable names.

Download the **RhubarbLibrary** binary for your **OS** [here](https://github.com/DanielSWolf/rhubarb-lip-sync/releases) and put it in your `bin` folder. `rhubarb` executable should be accessible through `bin/rhubarb`.

Start the development server with
```
yarn
yarn dev
```


    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "elevenlabs-node": "^1.2.0",
    "express": "^4.18.2",
    "openai": "^4.26.0"