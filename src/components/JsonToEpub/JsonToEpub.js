import epub from 'epub-gen-memory/bundle';
import { saveAs } from 'file-saver';
import JsonToHtml from '../JsonToHtml/JsonToHtml';

async function JsonToEpub({
  data,
  styleObj,
  options,
  showImages = true,
  bookIntroBack = {},
  fileName = 'obs.epub',
  imageUrl = 'https://cdn.door43.org/obs/jpg/360px/',
}) {
  const { intro, back } = bookIntroBack;
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
        title: back.title,
        content: back.content,
      },
    ];
  }

  try {
    const epubFile = await epub(options, chapters);
    saveAs(epubFile, fileName);
  } catch (error) {
    throw new Error('Error converting Markdown to JSON: ' + error.message);
  }
}

export default JsonToEpub;
