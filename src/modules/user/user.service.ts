import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export interface UpsertTelegramUserInput {
  telegramId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  languageCode?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates or updates user profile using Telegram identity payload.
   */
  async upsertTelegramUser(input: UpsertTelegramUserInput) {
    const telegramId = BigInt(input.telegramId);
    const normalizedName = this.buildDisplayName(input);
    const normalizedPhoto = this.normalizeOptionalString(input.photoUrl);
    const normalizedLocale = this.normalizeLocale(input.languageCode);

    const updateData: Prisma.UserUpdateInput = {
      telegramName: normalizedName,
    };

    if (normalizedPhoto !== undefined) {
      updateData.telegramPhoto = normalizedPhoto;
    }

    if (normalizedLocale !== undefined) {
      updateData.locale = normalizedLocale;
    }

    const createData: Prisma.UserCreateInput = {
      telegramId,
      telegramName: normalizedName,
      ...(normalizedPhoto !== undefined
        ? { telegramPhoto: normalizedPhoto }
        : {}),
      ...(normalizedLocale !== undefined ? { locale: normalizedLocale } : {}),
    };

    return this.prisma.user.upsert({
      where: { telegramId },
      update: updateData,
      create: createData,
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

  private normalizeOptionalString(
    value: string | undefined,
  ): string | undefined {
    if (!value) {
      return undefined;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : undefined;
  }

  private normalizeLocale(value: string | undefined): string | undefined {
    const normalized = this.normalizeOptionalString(value);
    if (!normalized) {
      return undefined;
    }

    return normalized.toLowerCase().slice(0, 10);
  }
}
