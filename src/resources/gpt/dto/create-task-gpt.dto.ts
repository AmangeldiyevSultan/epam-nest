import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskGptDto {
  @ApiProperty({
    example: [
      "restaurant",
      "food",
      "point_of_interest",
      "establishment"
    ],
    required: true
  })
  locations: string[];
}
