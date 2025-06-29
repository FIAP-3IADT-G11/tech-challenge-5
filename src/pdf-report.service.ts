import { Injectable } from "@nestjs/common";
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfReportService {
  constructor() {}

  async generateReport(analysisText: string, imageBuffer: Buffer): Promise<Buffer> {

    const reportText = analysisText.replaceAll('---', '')

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const chunks: Buffer[] = [];
  
        doc.on('data', (chunk) => 
          chunks.push(chunk)
        );
        doc.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        doc.on('error', (err) => reject(err));
  

        doc.font('Helvetica-Bold').fontSize(20).text('Relatório de Análise de Segurança', { align: 'center' });
        doc.moveDown();

        doc.font('Helvetica').fontSize(12).text(reportText, { align: 'left' });
  
        doc.end();
      });
  }
}