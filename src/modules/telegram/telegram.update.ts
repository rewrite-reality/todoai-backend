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
