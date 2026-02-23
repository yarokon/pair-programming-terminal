import { FilesService } from '../files.service';

describe('FilesService', () => {
  it('returns a list of files', () => {
    const service = new FilesService();

    expect(service.getFiles()).toEqual(['file-a.txt', 'file-b.txt']);
  });
});
