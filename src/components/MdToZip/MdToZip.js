import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function MdToZip({ fileName = 'document.md', markdown }) {
  const zip = new JSZip();

  // Create a file called fileName in the archive and add markdown content to it
  zip.file(fileName, markdown);

  // Generate and download archive
  zip.generateAsync({ type: 'blob' }).then((blob) => {
    saveAs(blob, 'my-zip-archive.zip');
  });
}

export default MdToZip;
