import { Controller, Get, Param, Query } from '@nestjs/common';
import { FileNode, FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Implement getFileContent. file should be passed as query parameter.

  @Get('files/:owner/:repoName')
  async getFiles(
    @Param('owner') owner: string,
    @Param('repoName') repoName: string,
  ): Promise<FileNode[]> {
    return await this.filesService.getFiles(owner, repoName);
  }

  @Get('file-content/:owner/:repoName')
  async getContent(
    @Param('owner') owner: string,
    @Param('repoName') repoName: string,
    @Query('file') file: string
  ) {
    
    return await this.filesService.getFileContent(owner, repoName, file)
  }
}
