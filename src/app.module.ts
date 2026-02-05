import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { EnvironmentSchema } from './config/validation.schema';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			validate: (config) => {
				return EnvironmentSchema.parse(config);
			},
		}),
		PrismaModule,
		TelegramModule,
		QueueModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
