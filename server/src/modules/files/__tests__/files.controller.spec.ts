import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from '../files.controller';
import { FileNode, FilesService } from '../files.service';

describe('FilesController', () => {
  let controller: FilesController;

  const mockTree: FileNode[] = [
    { path: 'todo-md/README.md', type: 'file' },
    { path: 'todo-md/src', type: 'directory', children: [] },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        {
          provide: FilesService,
          useValue: {
            getFiles: jest.fn().mockResolvedValue(mockTree),
          },
        },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('returns a list of files', async () => {
    await expect(controller.getFiles('todo-md', 'todo-md')).resolves.toEqual(
      mockTree,
    );
  });
});
