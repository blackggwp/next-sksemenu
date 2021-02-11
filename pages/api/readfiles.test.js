const fs = require('fs');
const path = require('path');

const dirRelativeToPublicFolder = 'images';
const dir = path.resolve('./public', dirRelativeToPublicFolder);
let imagesPath = []
const files = fs.readdirSync(dir)
files.forEach(file => {
  if (path.extname(file).toLowerCase() ===
    '.png' || '.jpg' || '.jpeg' || '.webp' || '.gif') {
    imagesPath.push(`/${dirRelativeToPublicFolder}/${file}`)
  }
})

describe('stringMatching in arrayContaining', () => {
  const imgExt = ['.png', '.jpg', '.jpeg', '.webp', '.gif']
  const expected = [
    expect.stringMatching(/^[BR].JPG/),
    expect.stringMatching(/^[BR]ob/),
  ];
  it('matches even if received contains additional elements', () => {
    expect(files).toEqual(
      expect.arrayContaining(expected),
    );
  });
})
