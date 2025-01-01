import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { IsString } from 'class-validator';
export class UpdateCatDto extends PartialType(CreateCatDto) {
  @IsString()
  id: string;
}
