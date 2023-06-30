import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function JsonToPdf({
  data,
  styles,
  bookPropertiesObs,
  imageWidth = 500,
  showImages = true,
  fileName = 'file.pdf',
  combineVerses = false,
  showVerseNumber = false,
  imageUrl = 'https://cdn.door43.org/obs/jpg/360px/',
}) {
  const generatePdf = async () => {
    const docDefinition = {
      content: [],
      styles: styles
        ? {
            text: styles.text,
            back: styles.back,
            title: styles.title,
            intro: styles.intro,
            image: styles.image,
            reference: styles.reference,
            verseNumber: styles.verseNumber,
            projectTitle: styles.projectTitle,
          }
        : {},
      pageBreakBefore: (currentNode) => {
        if (currentNode.style?.pageBreakBefore === 'always') {
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
      const { projectTitle, title } = bookPropertiesObs || {};

      if (projectTitle && title) {
        docDefinition.content.push(
          { text: projectTitle, style: 'projectTitle', pageBreakBefore: 'always' },
          { text: '\n' },
          { text: title, style: 'projectTitle', pageBreakBefore: 'always' }
        );
      }
    };

    const addIntroPage = () => {
      if (bookPropertiesObs?.intro) {
        docDefinition.content.push(
          { text: '', pageBreak: 'before' },
          { text: bookPropertiesObs.intro, style: 'intro', pageBreak: 'after' }
        );
      } else if (bookPropertiesObs?.projectTitle && bookPropertiesObs?.title) {
        docDefinition.content.push({ text: '', pageBreak: 'before' });
      }
    };

    const addDataToDocument = async (dataItem) => {
      if (dataItem.title) {
        docDefinition.content.push({
          text: dataItem.title,
          pageBreak: 'after',
          style: 'title',
        });
      }

      let verseContent = '';

      for (const { path, text, verse } of dataItem.verseObjects) {
        try {
          if (path && showImages) {
            const imageDataUrl = await getImageDataUrl(imageUrl + path);
            docDefinition.content.push({
              image: imageDataUrl,
              width: imageWidth,
              style: 'image',
            });
          }

          if (text) {
            let verseText = text;
            if (showVerseNumber && combineVerses) {
              verseText = [
                { text: ` ${verse}`, style: 'verseNumber' },
                { text: verseText, style: 'text' },
              ];
            } else if (showVerseNumber) {
              verseText = [
                { text: `${verse} `, style: 'verseNumber' },
                { text: verseText, style: 'text' },
              ];
            }
            if (combineVerses) {
              verseContent += verseText.map((verse) => verse.text).join(' ') + ' ';
            } else {
              if (verseContent) {
                docDefinition.content.push({ text: verseContent, style: 'text' });
                verseContent = '';
              }
              docDefinition.content.push({ text: verseText, style: 'text' });
            }
          }
        } catch (error) {
          console.error('Error fetching image data URL:', error);
        }
      }

      if (combineVerses && verseContent) {
        const formattedVerseContent = verseContent
          .split(' ')
          .map((word, index, array) => {
            if (!isNaN(parseInt(word))) {
              const nextWord = array[index - 1];
              if (nextWord === '') {
                return { text: word + ' ', style: 'verseNumber' };
              }
              return { text: word + ' ', style: 'text' };
            } else if (word === '') {
              const nextWord = array[index + 1];
              if (nextWord && nextWord !== '') {
                return word;
              }
            }
            return word + ' ';
          });

        docDefinition.content.push({ text: formattedVerseContent, style: 'text' });
      }

      docDefinition.content.push({
        text: dataItem.reference,
        style: 'reference',
        pageBreak: 'after',
      });
    };

    const addBackPage = () => {
      if (bookPropertiesObs?.back) {
        docDefinition.content.push({ text: bookPropertiesObs.back, style: 'back' });
      }
    };

    const generateAndDownloadPdf = () => {
      pdfMake.createPdf(docDefinition).download(fileName);
    };

    addTitlePage();
    addIntroPage();

    try {
      for (const dataItem of data) {
        await addDataToDocument(dataItem);
      }

      addBackPage();
      generateAndDownloadPdf();
    } catch (error) {
      console.error('Error rendering PDF:', error);
    }
  };

  return new Promise((resolve, reject) => {
    generatePdf()
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

export default JsonToPdf;
