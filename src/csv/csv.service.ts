import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class CsvService {
  async parseCsv(filePath: string): Promise<any[]> {
    const results: any = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => {
          console.log('Parsed data:', data);
          results.push(data);
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}
