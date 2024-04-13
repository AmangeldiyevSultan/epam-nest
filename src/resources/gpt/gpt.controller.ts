import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateTaskGptDto } from './dto/create-task-gpt.dto';
import { EvaluateResultGptDto } from './dto/evaluate-response-gpt.dto';

@Controller('chatgpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }

  @Post("/grammar")
  @HttpCode(HttpStatus.OK)
  generateResponse(@Body() dto: CreateTaskGptDto) {
    return this.gptService.createGrammarTask(dto);
  }

  @Post("/speaking/check")
  @HttpCode(HttpStatus.OK)
  evaluateResponse(@Body() dto: EvaluateResultGptDto) {
    return this.gptService.evaluateResponse(dto);
  }
}