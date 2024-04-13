import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SpeechService } from './speech.service';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller('speech')
@ApiTags("speech")
export class SpeechController {
  constructor(private speechService: SpeechService) { }

  @Post('to-text')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes("multipart/form-data")
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: FileUploadDto) {
    try {
      const transcript = await this.speechService.transcribe(file);
      return { result: transcript, error: null };
    } catch (error) {
      return { result: null, error: error.message };
    }
  }
}
