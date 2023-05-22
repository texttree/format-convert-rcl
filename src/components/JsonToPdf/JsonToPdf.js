import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function JsonToPdf({ data, styles, filename }) {
  const generatePdf = () => {
    const docDefinition = {
      content: [{ text: data.title, style: 'title' }, { text: '\n\n' }],
      styles: {
        title: { fontSize: 32, bold: true, alignment: 'center' },
        reference: { fontSize: 14, italics: true, alignment: 'center' },
        image: { margin: [0, 0, 0, 0], alignment: 'center' },
        text: { fontSize: 12, margin: [0, 0, 0, 16] },
        ...styles,
      },
    };

    const getImageDataUrl = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const addVerseObjects = async () => {
      for (const verseObject of data.verseObjects) {
        if (verseObject.urlImage) {
          const imageDataUrl = await getImageDataUrl(verseObject.urlImage);
          docDefinition.content.push({
            image: imageDataUrl,
            style: 'image',
          });
        }

        if (verseObject.text) {
          docDefinition.content.push({
            text: verseObject.text,
            style: 'text',
          });
        }
      }
      docDefinition.content.push({ text: data.reference, style: 'reference' });
    };

    addVerseObjects().then(() => {
      pdfMake.createPdf(docDefinition).download(filename);
    });
  };

  return (
    <div>
      <button onClick={generatePdf}>Create PDF</button>
    </div>
  );
}

export default JsonToPdf;
