const fs = require('fs');
const AdmZip = require('adm-zip');

const archivesFolder = './archives';
const extractedFolder = './extracted';

// Check if the extracted folder exists, if not, create it
if (!fs.existsSync(extractedFolder)) {
    fs.mkdirSync(extractedFolder);
}

// Read the contents of the archives folder
fs.readdir(archivesFolder, (err, files) => {
    if (err) {
        console.error('Error reading archives folder:', err);
        return;
    }

    // Filter out only the .zip files
    const zipFiles = files.filter(file => file.endsWith('.zip'));

    // Extract each zip file
    zipFiles.forEach(zipFile => {
        const zipFilePath = `${archivesFolder}/${zipFile}`;
        const zip = new AdmZip(zipFilePath);

        // Extract the contents of the zip file
        try {
            zip.extractAllTo(extractedFolder, /*overwrite*/ true);
            console.log(`Extracted ${zipFile} to ${extractedFolder}`);
        } catch (error) {
            console.error(`Error extracting ${zipFile}:`, error);
        }
    });
});
