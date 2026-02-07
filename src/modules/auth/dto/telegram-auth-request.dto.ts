import { IsNotEmpty, IsString } from 'class-validator';

export class TelegramAuthRequestDto {
  @IsString()
  @IsNotEmpty()
  initData!: string;
}
