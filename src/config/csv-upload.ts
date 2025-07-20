import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

const UploadDestination = path.join('media', 'csv');

export const csvUploadConfig: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      // Making sure the upload directory exists
      // if not it will be created so Multer doesn't throw ERROR
      if (!fs.existsSync(UploadDestination)) {
        fs.mkdirSync(UploadDestination, { recursive: true });
      }
      cb(null, UploadDestination);
    },
    // avoid file name conflicts by adding a timestamp + unique suffix
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}.csv`);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Allow only CSV files
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed!'), false);
    }
  },
};
