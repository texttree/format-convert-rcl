import epub from 'epub-gen-memory/bundle';
import { saveAs } from 'file-saver';
import JsonToHtml from '../JsonToHtml/JsonToHtml';

async function JsonToEpub({
  data,
  styleObj,
  bookPropertiesObs = {},
  showImages = true,
  fileName = 'obs.epub',
  imageUrl = 'https://cdn.door43.org/obs/jpg/360px/',
  options,
}) {
  const { intro, back } = bookPropertiesObs;
  let chapters = [];
  if (intro) {
    chapters.push({
      beforeToc: true,
      excludeFromToc: true,
      title: intro.title,
      content: intro.content,
    });
  }
  chapters = [
    ...chapters,
    ...data.map((chapter) => ({
      title: chapter.title,
      content: JsonToHtml({
        jsonData: chapter,
        styleObj,
        showImages,
        showTitle: false,
        imageUrl,
      }),
    })),
  ];
  if (back) {
    chapters = [
      ...chapters,
      {
        beforeToc: false,
        excludeFromToc: false,
        title: back.title,
        content: back.content,
      },
    ];
  }
  // https://github.com/cpiber/epub-gen-memory#options

  try {
    const epubFile = await epub(options, chapters);
    saveAs(epubFile, fileName);
  } catch (error) {
    throw new Error('Error converting Markdown to JSON: ' + error.message);
  }
}

export default JsonToEpub;
