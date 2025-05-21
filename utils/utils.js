import fetch from "node-fetch";
import path from "path";
import { exec } from "child_process";
import { promises as fsp } from "fs";

const execCommand = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      resolve(stdout);
    });
  });

export async function elevenLabsTTS(apiKey, voiceId, text, outputFile) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`TTS failed: ${err}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fsp.writeFile(outputFile, buffer);
}

// export async function generateLipSyncData(inputMp3, wavFile, jsonFile) {
//   const rhubarbPath = path.resolve("bin", "rhubarb", "rhubarb");
//   await execCommand(`ffmpeg -y -i "${inputMp3}" "${wavFile}"`);
//   await execCommand(`cmd.exe /c ""${rhubarbPath}" -f json -o "${jsonFile}" "${wavFile}" -r phonetic"`);
// }

export async function generateLipSyncData(inputMp3, wavFile, jsonFile) {
  const rhubarbPath = path.resolve("bin", "rhubarb", "rhubarb");
  await execCommand(`ffmpeg -y -i "${inputMp3}" "${wavFile}"`);

  const isWindows = process.platform === "win32";
  const command = isWindows
    ? `cmd.exe /c "${rhubarbPath} -f json -o ${jsonFile} ${wavFile} -r phonetic"`
    : `${rhubarbPath} -f json -o "${jsonFile}" "${wavFile}" -r phonetic`;

  await execCommand(command);
}



export async function readJsonFile(filePath) {
  const content = await fsp.readFile(filePath, "utf8");
  return JSON.parse(content);
}
