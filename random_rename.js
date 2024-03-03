const fs = require('fs');
const path = require('path');
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function renameFilesInDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    files.forEach(file => {
      const oldFilePath = path.join(directory, file);
      const fileExtension = path.extname(file);
      const newFileName = generateRandomString(20) + fileExtension;
      const newFilePath = path.join(directory, newFileName);
      fs.rename(oldFilePath, newFilePath, err => {
        if (err) {
          console.error(`Error renaming file ${oldFilePath}:`, err);
        } else {
          console.log(`Renamed ${oldFilePath} to ${newFilePath}`);
        }
      });
    });
  });
}
const a = prompt("good")
const directoryPath = './TIKTOK';
renameFilesInDirectory(directoryPath);
