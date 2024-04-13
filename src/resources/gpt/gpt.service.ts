import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateTaskGptDto } from './dto/create-task-gpt.dto';
import { EvaluateResultGptDto } from './dto/evaluate-response-gpt.dto';

@Injectable()
export class GptService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.GPT_SECRET_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  private generateGrammarTask(locations: string[]): string {
    const location = locations.map(item => item).join(', ');
    return `Create three grammar exercises for a Kazakh language learner at a ${location}. Each exercise should include:
            1. An original sentence in Russian related to a typical activity at a ${location}, no longer than 8 words.
            2. A translation of this sentence into Kazakh.
            3. A list of partial words which includes all the words from the Kazakh sentence and an additional 2-3 unrelated words.

            The exercises should be returned as an array of objects, each object having the fields: originalSentence, kazakhSentence, and partials. The response should be entirely in Kazakh.`;
  }

  private generateSpeakingTask(locations: string[]): string {
    const location = locations.map(item => item).join(', ');
    return `Create a brief speaking task for a Kazakh language learner at a ${location}. Only one task, without AND. Please keep the instruction under 17 words in Kazakh. Response should be like object with field 'task'`;
  }

  async generateResponse(gptDto: CreateTaskGptDto): Promise<{ result: any; error: any }> {
    const prompt = this.generateSpeakingTask(gptDto.locations);
    const data = {
      model: "gpt-4-turbo",
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ],
      temperature: 1,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    try {
      const response = await this.httpService.post(this.apiUrl, data, { headers }).toPromise();
      return { result: JSON.parse(response.data.choices[0].message.content), error: null };
    } catch (error) {
      return { result: null, error: new BadRequestException(error.toString()) };
    }
  }

  async evaluateResponse(dto: EvaluateResultGptDto): Promise<{ result: any; error: any }> {
    const prompt = `Given the task in Kazakh: "${dto.taskText}", evaluate the response: "${dto.responseText}". Is the response correct and culturally appropriate? Provide a brief comment (up to 10 words) starting with "Дұрыс" if correct or "Дұрыс емес" if incorrect.`;
    const data = {
      model: "gpt-4-turbo",
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ],
      temperature: 1,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    try {
      console.log(this.apiUrl, data, { headers });
      const response = await this.httpService.post(this.apiUrl, data, { headers }).toPromise();
      console.log(response.data.choices[0].message);
      return { result: JSON.parse(response.data.choices[0].message.content), error: null };
    } catch (error) {
      console.log("\n\n\n\n\n");
      console.log(error);
      console.log("\n\n\n\n\n");
      return { result: null, error: new Error(error.toString()) }
    }
  }
}

//JSON.parse(response.data.choices[0].message.content)