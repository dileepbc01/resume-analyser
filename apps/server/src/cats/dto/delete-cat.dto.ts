import { IsString } from 'class-validator';

export class DeleteCatDto {
  @IsString()
  id: string;
}
