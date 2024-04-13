import { ApiProperty } from "@nestjs/swagger";

export class EvaluateResultGptDto {
  @ApiProperty({
    required: true
  })
  taskText: string;

  @ApiProperty({
    required: true
  })
  responseText: string;
}
