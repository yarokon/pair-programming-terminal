import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  getFiles(): string[] {
    return ['file-a.txt', 'file-b.txt'];
  }
}
