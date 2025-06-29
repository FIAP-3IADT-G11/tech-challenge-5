import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OpenAIService } from './openai.service';
import { ConfigModule } from '@nestjs/config';
import { PdfReportService } from './pdf-report.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [OpenAIService, PdfReportService],
})
export class AppModule {}
