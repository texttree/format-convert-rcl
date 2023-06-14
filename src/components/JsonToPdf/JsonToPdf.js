import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function JsonToPdf({ data, bookPropertiesObs, styles, filename }) {
  const generatePdf = async () => {
    const docDefinition = {
      content: [],
      styles: {
        title: { fontSize: 32, bold: true, alignment: 'center', ...styles.projectTitle },
        intro: Object.assign({}, styles.intro, { fontSize: 14, alignment: 'left' }),
        reference: { fontSize: 14, italics: true, alignment: 'center' },
        image: { margin: [0, 0, 0, 0], alignment: 'center' },
        text: { fontSize: 12, margin: [0, 0, 0, 16] },
        back: { fontSize: 14, alignment: 'center', ...styles.back },
        ...styles,
      },
      pageBreakBefore: (currentNode) => {
        if (currentNode.style && currentNode.style.pageBreakBefore === 'always') {
          return true;
        }
        return currentNode.pageBreak === 'before' || currentNode.pageBreak === 'left';
      },
    };

    const getImageDataUrl = async (url) => {
      try {
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
      } catch (error) {
        console.error('Error fetching image data URL:', error);
        throw new Error('Invalid URL');
      }
    };

    const addTitlePage = () => {
      if (
        bookPropertiesObs &&
        bookPropertiesObs.projectTitle &&
        bookPropertiesObs.title
      ) {
        docDefinition.content.push({
          text: bookPropertiesObs.projectTitle,
          style: 'title',
          pageBreakBefore: 'always',
        });
        docDefinition.content.push({ text: '\n' });
        docDefinition.content.push({
          text: bookPropertiesObs.title,
          style: 'title',
          pageBreakBefore: 'always',
        });
      }
    };

    const addIntroPage = () => {
      if (bookPropertiesObs && bookPropertiesObs.intro) {
        docDefinition.content.push({ text: '', pageBreak: 'before' });
        docDefinition.content.push({
          text: bookPropertiesObs.intro,
          style: 'intro',
          pageBreak: 'after',
        });
      }
    };

    const addDataToDocument = async (dataItem) => {
      if (dataItem.title) {
        docDefinition.content.push({ text: dataItem.title, style: 'title' });
      }

      for (const verseObject of dataItem.verseObjects) {
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

      docDefinition.content.push({
        text: dataItem.reference,
        style: 'reference',
        pageBreak: 'after',
      });
    };

    const addBackPage = () => {
      if (bookPropertiesObs && bookPropertiesObs.back) {
        docDefinition.content.push({ text: bookPropertiesObs.back, style: 'back' });
      }
    };

    const generateAndDownloadPdf = () => {
      pdfMake.createPdf(docDefinition).download(filename);
    };

    addTitlePage();
    addIntroPage();

    for (const dataItem of data) {
      await addDataToDocument(dataItem);
    }

    addBackPage();
    generateAndDownloadPdf();
  };

  return (
    <div>
      <button onClick={generatePdf}>Create PDF</button>
    </div>
  );
}

export default JsonToPdf;
