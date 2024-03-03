const fs = require('fs');
const path = require('path');

// Function to rename files in a directory
function renameFilesInDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    
    // Regex to match supported video file extensions (you can extend this list if needed)
    const videoFileExtensions = /\.(mp4|mov|avi|mkv)$/i;
    let fileCount = 0;

    files.forEach(file => {
      const oldFilePath = path.join(directory, file);
      
      // Check if the file has a video extension
      if (videoFileExtensions.test(path.extname(file))) {
        fileCount++;
        const fileNumber = fileCount.toString().padStart(4, '0');
        const newFileName = `Video-${fileNumber}${path.extname(file)}`;
        const newFilePath = path.join(directory, newFileName);
        
        fs.rename(oldFilePath, newFilePath, err => {
          if (err) {
            console.error(`Error renaming file ${oldFilePath}:`, err);
          } else {
            console.log(`Renamed ${oldFilePath} to ${newFilePath}`);
          }
        });
      }
    });
  });
}

// Specify the directory containing the files
const directoryPath = './TIKTOK';

// Call the function to rename files in the specified directory
renameFilesInDirectory(directoryPath);
