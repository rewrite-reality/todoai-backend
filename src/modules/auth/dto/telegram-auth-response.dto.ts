export class TelegramAuthUserDto {
  id!: string;
  telegramId!: string;
  telegramName!: string | null;
  telegramPhoto!: string | null;
  locale!: string;
}

export class TelegramAuthResponseDto {
  accessToken!: string;
  tokenType!: 'Bearer';
  expiresIn!: string;
  user!: TelegramAuthUserDto;
}
