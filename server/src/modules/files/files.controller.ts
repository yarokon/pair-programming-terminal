import { Controller, Get, Param } from '@nestjs/common';
import { FileNode, FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // GET http://localhost:3000/files/todo-md/todo-md
  @Get('files/:owner/:repoName')
  async getFiles(
    @Param('owner') owner: string,
    @Param('repoName') repoName: string,
  ): Promise<FileNode[]> {
    return await this.filesService.getFiles(owner, repoName);
  }

  // TODO: Implement getFileContent.
  // GET http://localhost:3000/file-content/todo-md/todo-md?file=README.md
}
