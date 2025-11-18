import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitRepoController } from './git-repo/git-repo.controller';
import { GitRepoService } from './git-repo/git-repo.service';

@Module({
  imports: [],
  controllers: [AppController, GitRepoController],
  providers: [AppService, GitRepoService],
})
export class AppModule {}
