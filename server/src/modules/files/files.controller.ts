import { Controller, Get, Param } from '@nestjs/common';
import { FileNode, FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Implement getFileContent. filePath should be passed as query parameter.

  @Get('files/:owner/:repoName')
  async getFiles(
    @Param('owner') owner: string,
    @Param('repoName') repoName: string,
  ): Promise<FileNode[]> {
    return await this.filesService.getFiles(owner, repoName);
  }
}
