import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface UpsertTelegramUserInput {
  telegramId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertTelegramUser(input: UpsertTelegramUserInput) {
    const normalizedName = this.buildDisplayName(input);

    return this.prisma.user.upsert({
      where: { telegramId: BigInt(input.telegramId) },
      update: {
        telegramName: normalizedName,
      },
      create: {
        telegramId: BigInt(input.telegramId),
        telegramName: normalizedName,
      },
    });
  }

  private buildDisplayName(input: UpsertTelegramUserInput): string {
    if (input.username && input.username.trim().length > 0) {
      return input.username.trim();
    }

    const firstName = input.firstName?.trim() ?? '';
    const lastName = input.lastName?.trim() ?? '';
    const fullName = `${firstName} ${lastName}`.trim();

    return fullName.length > 0 ? fullName : `telegram:${input.telegramId}`;
  }
}
