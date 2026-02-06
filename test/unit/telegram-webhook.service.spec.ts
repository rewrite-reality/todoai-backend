import { ForbiddenException, HttpException } from '@nestjs/common';
import { TelegramWebhookService } from '../../src/modules/telegram/telegram-webhook.service';

describe('TelegramWebhookService', () => {
  const configService = {
    get: jest.fn(),
  };

  const userService = {
    upsertTelegramUser: jest.fn(),
  };

  const queueProducer = {
    enqueueCommand: jest.fn(),
    enqueueTaskParsing: jest.fn(),
    enqueueVoiceTranscription: jest.fn(),
  };

  const logger = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  const service = new TelegramWebhookService(
    configService as any,
    userService as any,
    queueProducer as any,
    logger as any,
  );

  const secret = 'sprint1-secret';
  const correlationId = 'corr-unit-1';

  beforeEach(() => {
    jest.clearAllMocks();
    configService.get.mockReturnValue(secret);
    userService.upsertTelegramUser.mockResolvedValue({ id: 'user-id' });
    queueProducer.enqueueCommand.mockResolvedValue(undefined);
    queueProducer.enqueueTaskParsing.mockResolvedValue(undefined);
    queueProducer.enqueueVoiceTranscription.mockResolvedValue(undefined);
  });

  it('throws TELEGRAM_INVALID_SECRET on missing/invalid secret', async () => {
    await expect(
      service.ingestUpdate({ update_id: 1 }, 'wrong-secret', correlationId),
    ).rejects.toBeInstanceOf(ForbiddenException);

    await expect(
      service.ingestUpdate({ update_id: 1 }, 'wrong-secret', correlationId),
    ).rejects.toMatchObject({
      response: {
        code: 'TELEGRAM_INVALID_SECRET',
      },
    });
  });

  it('throws TELEGRAM_INVALID_PAYLOAD for malformed update payload', async () => {
    await expect(
      service.ingestUpdate({ invalid: true }, secret, correlationId),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.ingestUpdate({ invalid: true }, secret, correlationId),
    ).rejects.toMatchObject({
      response: {
        code: 'TELEGRAM_INVALID_PAYLOAD',
      },
    });
  });

  it('enqueues non-command text message into task parsing queue', async () => {
    const result = await service.ingestUpdate(
      {
        update_id: 1001,
        message: {
          message_id: 77,
          text: 'Buy milk tomorrow',
          from: { id: 2001, username: 'alice' },
          chat: { id: 3001 },
        },
      },
      secret,
      correlationId,
    );

    expect(result).toEqual({ ok: true });
    expect(userService.upsertTelegramUser).toHaveBeenCalledWith({
      telegramId: 2001,
      username: 'alice',
      firstName: undefined,
      lastName: undefined,
    });
    expect(queueProducer.enqueueTaskParsing).toHaveBeenCalledWith({
      telegramUpdateId: 1001,
      telegramUserId: 2001,
      telegramChatId: 3001,
      telegramMessageId: 77,
      text: 'Buy milk tomorrow',
      correlationId,
    });
    expect(queueProducer.enqueueCommand).not.toHaveBeenCalled();
    expect(queueProducer.enqueueVoiceTranscription).not.toHaveBeenCalled();
  });

  it('enqueues voice message into voice transcription queue', async () => {
    await service.ingestUpdate(
      {
        update_id: 1002,
        message: {
          message_id: 88,
          voice: { file_id: 'voice-file-id' },
          from: { id: 2002, username: 'bob' },
          chat: { id: 3002 },
        },
      },
      secret,
      correlationId,
    );

    expect(queueProducer.enqueueVoiceTranscription).toHaveBeenCalledWith({
      telegramUpdateId: 1002,
      telegramUserId: 2002,
      telegramChatId: 3002,
      telegramMessageId: 88,
      telegramVoiceFileId: 'voice-file-id',
      correlationId,
    });
    expect(queueProducer.enqueueTaskParsing).not.toHaveBeenCalled();
    expect(queueProducer.enqueueCommand).not.toHaveBeenCalled();
  });

  it.each([
    ['/start'],
    ['/connect_user'],
    ['/accept_invite'],
    ['/decline_invite'],
    ['/revoke_assignee'],
    ['/my_assignments'],
  ])('enqueues supported command %s into command queue', async (command) => {
    await service.ingestUpdate(
      {
        update_id: 1003,
        message: {
          message_id: 99,
          text: `${command} payload`,
          from: { id: 2003, username: 'carol' },
          chat: { id: 3003 },
        },
      },
      secret,
      correlationId,
    );

    expect(queueProducer.enqueueCommand).toHaveBeenCalledWith({
      telegramUpdateId: 1003,
      telegramUserId: 2003,
      telegramChatId: 3003,
      telegramMessageId: 99,
      command,
      rawText: `${command} payload`,
      correlationId,
    });
  });

  it('ignores unknown command safely', async () => {
    const result = await service.ingestUpdate(
      {
        update_id: 1004,
        message: {
          message_id: 111,
          text: '/unknown_cmd',
          from: { id: 2004, username: 'dave' },
          chat: { id: 3004 },
        },
      },
      secret,
      correlationId,
    );

    expect(result).toEqual({ ok: true });
    expect(queueProducer.enqueueCommand).not.toHaveBeenCalled();
    expect(queueProducer.enqueueVoiceTranscription).not.toHaveBeenCalled();
    expect(queueProducer.enqueueTaskParsing).toHaveBeenCalledTimes(1);
  });

  it('ignores updates without message with warning logs', async () => {
    const result = await service.ingestUpdate(
      {
        update_id: 1005,
      },
      secret,
      correlationId,
    );

    expect(result).toEqual({ ok: true });
    expect(userService.upsertTelegramUser).not.toHaveBeenCalled();
    expect(queueProducer.enqueueCommand).not.toHaveBeenCalled();
    expect(queueProducer.enqueueTaskParsing).not.toHaveBeenCalled();
    expect(queueProducer.enqueueVoiceTranscription).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalled();
  });
});
