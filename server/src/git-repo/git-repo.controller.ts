import { Controller, Get } from '@nestjs/common';
import { GitRepoService } from './git-repo.service';

@Controller('git-repo')
export class GitRepoController {
  constructor(private readonly gitRepoService: GitRepoService) {}

  @Get()
  getRepo() {
  }
}
