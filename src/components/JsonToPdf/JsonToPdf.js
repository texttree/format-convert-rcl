import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function JsonToPdf({
  customTitlePageContent,
  customIntroPageContent,
  customBackPageContent,
  bookPropertiesObs,
  styles,
  data,
  imageWidth = 523,
  showImages = true,
  showChapterTitlePage = true,
  fileName = 'file.pdf',
  combineVerses = false,
  showPageHeaders = true,
  showPageFooters = true,
  showVerseNumber = false,
  imageUrl = 'https://cdn.door43.org/obs/jpg/360px/',
}) {
  const {
    back,
    copyright,
    titlePageTitle,
    projectLanguage,
    SubtitlePageTitle,
    pageHeaderContent,
    pageFooterContent,
    tableOfContentsTitle,
  } = bookPropertiesObs || {};

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
            image: styles.image,
            intro: styles.intro,
            reference: styles.reference,
            copyright: styles.copyright,
            verseNumber: styles.verseNumber,
            currentPage: styles.currentPage,
            chapterTitle: styles.chapterTitle,
            titlePageTitle: styles.titlePageTitle,
            projectLanguage: styles.projectLanguage,
            defaultPageHeader: styles.defaultPageHeader,
            SubtitlePageTitle: styles.SubtitlePageTitle,
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
      if (customTitlePageContent) {
        docDefinition.content.push(customTitlePageContent);
      } else {
        if (titlePageTitle && SubtitlePageTitle) {
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
            { text: titlePageTitle, style: 'titlePageTitle' },
            { text: SubtitlePageTitle, style: 'SubtitlePageTitle' },
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
              text: projectLanguage,
              style: 'projectLanguage',
              pageBreak: 'after',
            }
          );
        }
      }
    };

    const addTableOfContentsPage = () => {
      if (tableOfContentsTitle) {
        docDefinition.content.push([
          {
            toc: {
              title: { text: tableOfContentsTitle, style: 'tableOfContentsTitle' },
            },
          },
          {
            text: '\n',
            pageBreak: 'after',
          },
        ]);
      }
    };

    const addIntroPage = () => {
      if (customIntroPageContent) {
        docDefinition.content.push(customIntroPageContent);
      } else {
        if (bookPropertiesObs?.intro) {
          docDefinition.content.push({
            text: bookPropertiesObs.intro,
            style: 'intro',
            pageBreak: 'after',
          });
        }
      }
    };

    const createPageHeader = (leftText, rightText) => {
      if (pageHeaderContent) {
        return pageHeaderContent;
      } else {
        return [
          {
            columns: [
              { text: leftText, style: 'defaultPageHeader', alignment: 'left' },
              { text: rightText, style: 'defaultPageHeader', alignment: 'right' },
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
      }
    };

    const createPageFooter = (currentPage) => {
      const hasPageNumber = pageFooterContent?.some((item) => item.text === 'pageNumber');

      if (pageFooterContent?.length && hasPageNumber) {
        return pageFooterContent.map((item) =>
          item.text === 'pageNumber' ? { text: currentPage, style: 'currentPage' } : item
        );
      }

      return (
        pageFooterContent || [
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
            style: 'currentPage',
          },
        ]
      );
    };

    const addDataToDocument = async (dataItem) => {
      if (dataItem.title) {
        const titleBlock = {
          text: dataItem.title,
          style: 'chapterTitle',
          tocItem: true,
        };

        if (showChapterTitlePage) {
          titleBlock.pageBreak = 'after';
        }

        docDefinition.content.push(titleBlock);
      }

      let verseContent = '';

      for (const { path, text, verse } of dataItem.verseObjects) {
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
          if (showVerseNumber || (showVerseNumber && combineVerses)) {
            verseText = [
              { text: ` ${verse}`, style: 'verseNumber' },
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
      if (customBackPageContent) {
        docDefinition.content.push(customBackPageContent);
      } else {
        if (bookPropertiesObs?.back) {
          docDefinition.content.push({
            text: bookPropertiesObs.back,
            style: 'back',
            pageBreak: 'before',
          });
        }
      }
    };

    try {
      addTitlePage();
      addIntroPage();
      addTableOfContentsPage();

      for (const dataItem of data) {
        await addDataToDocument(dataItem);
      }

      addBackPage();
    } catch (error) {
      console.error('Error generating content:', error);
      return;
    }

    if (showPageHeaders) {
      const generatePageHeader = (docDefinition) => {
        let startCurrentChapterPage = 0;
        let endCurrentChapterPage = 0;
        let currentChapterTitle = '';
        let leftText = SubtitlePageTitle || '';

        for (let i = 0; i < docDefinition.content.length; i++) {
          const contentItem = docDefinition.content[i];

          if (contentItem?.style === 'chapterTitle') {
            if (startCurrentChapterPage === 0) {
              startCurrentChapterPage = contentItem.positions[0].pageNumber;
              currentChapterTitle = contentItem.text;
              continue;
            }

            endCurrentChapterPage = contentItem.positions[0].pageNumber;

            for (
              let page = startCurrentChapterPage;
              page < endCurrentChapterPage;
              page++
            ) {
              pageHeaders[page] = createPageHeader(leftText, currentChapterTitle);
            }

            currentChapterTitle = contentItem.text;
            startCurrentChapterPage = endCurrentChapterPage;
          }

          if (contentItem?.style === 'back' && startCurrentChapterPage !== 0) {
            endCurrentChapterPage = contentItem.positions[0].pageNumber;

            for (
              let page = startCurrentChapterPage;
              page < endCurrentChapterPage;
              page++
            ) {
              pageHeaders[page] = createPageHeader(leftText, currentChapterTitle);
            }

            currentChapterTitle = '';
            startCurrentChapterPage = endCurrentChapterPage;
          }
        }
        return pageHeaders;
      };

      docDefinition.header = (currentPage) => {
        const pageHeaders = generatePageHeader(docDefinition);
        return pageHeaders[currentPage];
      };
    }

    if (showPageFooters) {
      const generatePageFooter = (docDefinition) => {
        const pageFooters = {};

        for (let i = 0; i < docDefinition.content.length; i++) {
          const contentItem = docDefinition.content[i];

          if (contentItem?.style === 'intro' || contentItem?.style === 'back') {
            continue;
          }

          pageFooters[contentItem.positions[0].pageNumber] = createPageFooter(
            contentItem.positions[0].pageNumber
          );
        }

        return pageFooters;
      };

      docDefinition.footer = (currentPage) => {
        if (titlePageTitle && SubtitlePageTitle && currentPage === 1) {
          return [
            {
              text: copyright,
              style: 'copyright',
            },
          ];
        }

        return generatePageFooter(docDefinition)[currentPage];
      };
    }

    try {
      pdfMake.createPdf(docDefinition).download(fileName);
    } catch (error) {
      console.error('Error rendering PDF:', error);
    }
  };

  return new Promise((resolve, reject) => {
    generatePdf().then(resolve).catch(reject);
  });
}

export default JsonToPdf;
