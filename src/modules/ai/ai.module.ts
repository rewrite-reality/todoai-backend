import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AI_TEXT_PARSER } from './constants/ai.tokens';
import { DeepSeekTextParser } from './providers/deepseek-text.parser';
import { MockAiParser } from './providers/mock-ai.parser';

@Module({
  imports: [ConfigModule],
  providers: [
    MockAiParser,
    DeepSeekTextParser,
    {
      provide: AI_TEXT_PARSER,
      inject: [ConfigService, MockAiParser, DeepSeekTextParser],
      useFactory: (
        configService: ConfigService,
        mockParser: MockAiParser,
        deepSeekParser: DeepSeekTextParser,
      ) => {
        const providerValue =
          configService.get<string>('ai.textProvider') ??
          configService.get<string>('AI_TEXT_PROVIDER') ??
          process.env.AI_TEXT_PROVIDER;
        const provider = providerValue?.trim().toLowerCase();

        if (provider === 'deepseek') {
          return deepSeekParser;
        }

        if (provider !== undefined && provider !== 'mock') {
          new Logger(AiModule.name).warn(
            `Unknown AI text provider "${providerValue}", falling back to mock`,
          );
        }

        return mockParser;
      },
    },
  ],
  exports: [AI_TEXT_PARSER],
})
export class AiModule {}
