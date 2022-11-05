const { join } = require('path');
const { readdir, copyFile, mkdir } = require('fs/promises');
const fs = require('fs');

const mainPath = join(__dirname, 'files');
const copyPath = join(__dirname, 'files-copy');

fs.rm(copyPath, { recursive: true }, () => {
  copyDirectory(mainPath, copyPath).then();
});

async function copyDirectory(mainLink, copyLink) {
  await mkdir(copyLink, { recursive: true });
  try {
    const files = await readdir(mainLink, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        await copyFile(join(mainLink, file.name), join(copyLink, file.name));
      } else
        copyDirectory(join(mainLink, file.name), join(copyLink, file.name));
    }
    process.stdout.write('Файлы скопированы.\n');
  } catch {
    process.stdout.write('Возникла ошибка.\n');
  }
}
