import { Injectable } from '@nestjs/common';
import { SpeechClient } from '@google-cloud/speech';

const {
  GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_PRIVATE_KEY_ID,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID
} = process.env;

@Injectable()
export class SpeechService {
  private speechClient: SpeechClient;

  constructor() {
    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    this.speechClient = new SpeechClient({
      credentials: {
        private_key_id: GOOGLE_PRIVATE_KEY_ID,
        private_key: privateKey,
        client_email: GOOGLE_CLIENT_EMAIL,
        client_id: GOOGLE_CLIENT_ID,
      },
      projectId: GOOGLE_CLOUD_PROJECT_ID,
    });
  }

  async transcribe(file: Express.Multer.File): Promise<string> {
    const audio = {
      content: file.buffer.toString('base64'),
    };
    const config = {
      encoding: 'FLAC' as const,
      sampleRateHertz: 48000,
      languageCode: 'kk-KZ',
    };
    const request = {
      audio: audio,
      config: config,
    };

    const response = await this.speechClient.recognize(request);
    console.log(response[0].results[0].alternatives[0]);
    const transcription = response[0].results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    return transcription;
  }
}
