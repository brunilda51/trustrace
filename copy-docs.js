const fs = require('fs');
const path = require('path');

// Source and destination paths
const sourcePath = path.resolve(__dirname, 'src/docs');
const destPath = path.resolve(__dirname, 'dist', 'docs');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
}

// Copy the files from the source directory to the destination directory
fs.readdir(sourcePath, (err, files) => {
  if (err) {
    console.error('Error reading source directory:', err);
    return;
  }

  files.forEach(file => {
    const srcFile = path.join(sourcePath, file);
    const destFile = path.join(destPath, file);

    fs.copyFile(srcFile, destFile, err => {
      if (err) {
        console.error(`Error copying file ${srcFile}:`, err);
      } else {
        console.log(`Copied ${srcFile} to ${destFile}`);
      }
    });
  });
});
