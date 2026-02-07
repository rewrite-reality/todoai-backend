import { z } from 'zod';

export interface TelegramUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface TelegramChat {
  id: number;
}

export interface TelegramVoice {
  file_id: string;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat?: TelegramChat;
  text?: string;
  voice?: TelegramVoice;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

const TelegramUserSchema = z.object({
  id: z.number().int(),
  username: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

const TelegramChatSchema = z.object({
  id: z.number().int(),
});

const TelegramVoiceSchema = z.object({
  file_id: z.string().trim().min(1),
});

const TelegramMessageSubsetSchema = z.object({
  message_id: z.number().int(),
  from: TelegramUserSchema,
  chat: TelegramChatSchema,
  text: z.string().optional(),
  voice: TelegramVoiceSchema.optional(),
});

export const TelegramUpdateSubsetSchema = z.object({
  update_id: z.number().int(),
  message: TelegramMessageSubsetSchema.optional(),
});

export type SupportedTelegramCommand =
  | '/start'
  | '/connect_user'
  | '/accept_invite'
  | '/decline_invite'
  | '/revoke_assignee'
  | '/my_assignments';

const SUPPORTED_COMMANDS = new Set<SupportedTelegramCommand>([
  '/start',
  '/connect_user',
  '/accept_invite',
  '/decline_invite',
  '/revoke_assignee',
  '/my_assignments',
]);

export function parseTelegramCommand(
  text: string,
): SupportedTelegramCommand | undefined {
  const firstToken = text.trim().split(/\s+/)[0];
  const commandWithNoBotMention = firstToken.split('@')[0].toLowerCase();

  return SUPPORTED_COMMANDS.has(
    commandWithNoBotMention as SupportedTelegramCommand,
  )
    ? (commandWithNoBotMention as SupportedTelegramCommand)
    : undefined;
}

export function isTelegramUpdate(value: unknown): value is TelegramUpdate {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybeUpdate = value as Partial<TelegramUpdate>;
  return (
    typeof maybeUpdate.update_id === 'number' &&
    Number.isInteger(maybeUpdate.update_id)
  );
}
