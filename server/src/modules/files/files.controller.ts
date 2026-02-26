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


  @Get('files/:owner/:repoName')
  async getFileContent(
    @Param('owner') owner: string,
    @Param('repoName') repoName: string,
    @Query('filePath') filePath: string
  ): Promise<string> {
    return await this.filesService.getFileContent(owner, repoName, filePath);
  }
}
