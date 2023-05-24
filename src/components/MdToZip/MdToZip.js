import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function addFileToZip(zip, fileData) {
  if (fileData.isFolder) {
    // Create a new archive folder
    const folder = zip.folder(fileData.name);

    // Recursively adding the contents of a folder
    fileData.content.forEach((item) => {
      addFileToZip(folder, item);
    });
  } else {
    // Create a file in a folder or archive
    zip.file(fileData.name, fileData.content);
  }
}

function MdToZip({ fileName = 'document.zip', fileData }) {
  const zip = new JSZip();

  // Recursively adding content to an archive
  addFileToZip(zip, fileData);

  // Generate and download archive
  zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, fileName);
  });
}

export default MdToZip;
