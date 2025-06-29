import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OpenAIService } from './openai.service';
import { PdfReportService } from './pdf-report.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly openaiService: OpenAIService,
    private readonly pdfReportService: PdfReportService,
  ) {}

  private validatePayload(file: Express.Multer.File) {

    const allowedMimetypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/gif'];

    if (!file) {
      throw new BadRequestException('Arquivo não enviado');
    }

    if(!allowedMimetypes.includes(file.mimetype)) {
      throw new BadRequestException('Arquivo não é uma imagem');
    }

    if(file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('Arquivo muito grande');
    }
  }

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    this.validatePayload(file);
    let result = await this.openaiService.analyzeImage(file.buffer, file.mimetype);

    if(!result || result.includes('Nenhuma ameaça identificada')) {
      result = 'Nenhuma ameaça identificada';
    }
    
    const pdfBuffer = await this.pdfReportService.generateReport(result, file.buffer);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=relatorio-seguranca.pdf',
      'Content-Length': pdfBuffer.length,
    });
    
    res.end(pdfBuffer);
  }
}
