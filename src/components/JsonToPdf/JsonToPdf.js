import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function JsonToPdf({
  data,
  styles,
  bookPropertiesObs,
  imageWidth = 523,
  showImages = true,
  showTitlePage = true,
  fileName = 'file.pdf',
  combineVerses = false,
  showVerseNumber = false,
  imageUrl = 'https://cdn.door43.org/obs/jpg/360px/',
}) {
  const { projectTitle, title, back, copyright } = bookPropertiesObs || {};

  const generatePdf = async () => {
    const pageHeaders = {};

    const docDefinition = {
      content: [],
      defaultStyle: {
        fontSize: 14,
      },
      pageMargins: [36, 60],
      styles: styles
        ? {
            text: styles.text,
            back: styles.back,
            chapterTitle: styles.chapterTitle,
            intro: styles.intro,
            image: styles.image,
            reference: styles.reference,
            verseNumber: styles.verseNumber,
            projectTitle: styles.projectTitle,
            bookTitle: styles.bookTitle,
            projectLanguage: styles.projectLanguage,
            copyright: styles.copyright,
            tableOfContentsTitle: styles.tableOfContentsTitle,
          }
        : {},
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
      if (projectTitle && title) {
        docDefinition.content.push(
          { text: '\n', margin: [0, 100] },
          {
            canvas: [
              {
                type: 'line',
                x1: 73,
                y1: 0,
                x2: 450,
                y2: 0,
                lineWidth: 1,
                lineColor: '#000000',
              },
            ],
          },
          { text: projectTitle, style: 'projectTitle' },
          { text: title, style: 'bookTitle' },
          {
            canvas: [
              {
                type: 'line',
                x1: 73,
                y1: 0,
                x2: 450,
                y2: 0,
                lineWidth: 1,
                lineColor: '#000000',
              },
            ],
          },
          {
            text: 'projectLanguage',
            style: 'projectLanguage',
            pageBreak: 'after',
          }
        );
      }
    };

    const addTableOfContentsPage = () => {
      docDefinition.content.push([
        {
          toc: {
            title: { text: 'Table Of Contents', style: 'tableOfContentsTitle' },
          },
        },
        {
          text: '\n',
          pageBreak: 'after',
        },
      ]);
    };

    const addIntroPage = () => {
      if (bookPropertiesObs?.intro) {
        docDefinition.content.push({
          text: bookPropertiesObs.intro,
          style: 'intro',
          pageBreak: 'after',
        });
      }
    };

    const generateHeader = (docDefinition) => {
      let headerLeftText = title;
      let startCurrentChapterPage = 0;
      let endCurrentChapterPage = 0;
      let currentChapterTitle = '';

      for (let i = 0; i < docDefinition.content.length; i++) {
        const contentItem = docDefinition.content[i];

        if (contentItem?.style === 'chapterTitle') {
          if (startCurrentChapterPage === 0) {
            startCurrentChapterPage = contentItem.positions[0].pageNumber;
            currentChapterTitle = contentItem.text;
            continue;
          }

          endCurrentChapterPage = contentItem.positions[0].pageNumber;

          for (let page = startCurrentChapterPage; page < endCurrentChapterPage; page++) {
            pageHeaders[page] = createHeader(headerLeftText, currentChapterTitle);
          }

          currentChapterTitle = contentItem.text;
          startCurrentChapterPage = endCurrentChapterPage;
        }

        if (contentItem?.style === 'back' && startCurrentChapterPage !== 0) {
          endCurrentChapterPage = contentItem.positions[0].pageNumber;

          for (let page = startCurrentChapterPage; page < endCurrentChapterPage; page++) {
            pageHeaders[page] = createHeader(headerLeftText, currentChapterTitle);
          }

          currentChapterTitle = '';
          startCurrentChapterPage = endCurrentChapterPage;
        }
      }
      return pageHeaders;
    };
    const generateFooter = (docDefinition) => {
      const pageFooters = {};

      for (let i = 0; i < docDefinition.content.length; i++) {
        const contentItem = docDefinition.content[i];

        if (contentItem?.style === 'intro' || contentItem?.style === 'back') {
          continue;
        }

        pageFooters[contentItem.positions[0].pageNumber] = createFooter(
          contentItem.positions[0].pageNumber
        );
      }

      return pageFooters;
    };

    const createHeader = (leftText, rightText) => {
      return [
        {
          columns: [
            { text: leftText, bold: true, alignment: 'left', width: '50%' },
            { text: rightText, bold: true, alignment: 'right', width: '50%' },
          ],
          margin: [36, 30, 36, 10],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 36,
              y1: 0,
              x2: 559,
              y2: 0,
              lineWidth: 1,
              lineColor: '#000000',
            },
          ],
        },
      ];
    };

    const createFooter = (currentPage) => {
      return [
        {
          canvas: [
            {
              type: 'line',
              x1: 36,
              y1: 0,
              x2: 559,
              y2: 0,
              lineWidth: 1,
              lineColor: '#000000',
            },
          ],
        },
        {
          text: currentPage,
          fontSize: 16,
          alignment: 'center',
          bold: true,
          margin: [0, 10, 0, 0],
        },
      ];
    };

    const addDataToDocument = async (dataItem) => {
      if (dataItem.title) {
        const titleBlock = {
          text: dataItem.title,
          style: 'chapterTitle',
          tocItem: true,
        };

        if (showTitlePage) {
          titleBlock.pageBreak = 'after';
        }

        docDefinition.content.push(titleBlock);
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

      const isLastItem = data.indexOf(dataItem) === data.length - 1;

      if (!isLastItem) {
        docDefinition.content.push({
          text: dataItem.reference,
          style: 'reference',
          pageBreak: 'after',
        });
      } else {
        docDefinition.content.push({
          text: dataItem.reference,
          style: 'reference',
        });
      }
    };

    const addBackPage = () => {
      if (bookPropertiesObs?.back) {
        docDefinition.content.push({
          text: bookPropertiesObs.back,
          style: 'back',
          pageBreak: 'before',
        });
      }
    };

    const generateAndDownloadPdf = () => {
      pdfMake.createPdf(docDefinition).download(fileName);
    };

    addTitlePage();
    addIntroPage();
    addTableOfContentsPage();

    try {
      for (const dataItem of data) {
        await addDataToDocument(dataItem);
      }

      addBackPage();

      docDefinition.header = function (currentPage, totalPages) {
        if (back && currentPage === totalPages) {
          return null;
        }

        return generateHeader(docDefinition)[currentPage];
      };

      docDefinition.footer = function (currentPage) {
        if (projectTitle && title && currentPage === 1) {
          return [
            {
              text: copyright,
              style: 'copyright',
            },
          ];
        }

        return generateFooter(docDefinition)[currentPage];
      };

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
