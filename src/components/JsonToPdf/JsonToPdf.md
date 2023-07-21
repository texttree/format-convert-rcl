### Style properties:

- `font`: `string`
  name of the font
- `fontSize`: `number`
  size of the font in pt
- `fontFeatures`: `string[]`
  array of advanced typographic features supported in TTF fonts (supported features depend on font file)
- `lineHeight`: `number`
  the line height (default: 1)
- `bold`: `boolean`
  whether to use bold text (default: false)
- `italics`: `boolean`
  whether to use italic text (default: false)
- `alignment`: `string`
  (‘left’ or ‘center’ or ‘right’ or ‘justify’) the alignment of the text
- `characterSpacing`: `number`
  size of the letter spacing in pt
- `color`: `string`
  the color of the text (color name e.g., ‘blue’ or hexadecimal color e.g., ‘#ff5500’)
- `background`: `string`
  the background color of the text
- `markerColor`: `string`
  the color of the bullets in a buletted list
- `decoration`: `string`
  the text decoration to apply (‘underline’ or ‘lineThrough’ or ‘overline’)
- `decorationStyle`: `string`
  the style of the text decoration (‘dashed’ or ‘dotted’ or ‘double’ or ‘wavy’)
- `decorationColor`: `string`
  the color of the text decoration, see color
- `sup`: `boolean`
  superscript text (default: false)
- `sub`: `boolean`
  subscript text (default: false)
- `opacity`: `boolean`
  text opacity (default: 1)

### An example of converting a JSON object to PDF

```jsx
import React, { useState } from 'react';
import { JsonToPdf } from '@texttree/obs-format-convert-rcl';

function Component() {
  const [showImages, setShowImages] = useState(true);
  const [combineVerses, setCombineVerses] = useState(false);
  const [showVerseNumber, setShowVerseNumber] = useState(false);
  const [isCreatingPdf, setIsCreatingPdf] = useState(false);
  const [showChapterTitlePage, setshowChapterTitlePage] = useState(false);

  const data = [
    {
      title: '26. Иисус начинает Своё служение',
      verseObjects: [
        {
          path: 'obs-en-26-01.jpg',
          text: 'После того как Иисус преодолел искушения сатаны, Он вернулся в регион Галилея, туда, где жил...',
          verse: '1',
        },
        {
          path: 'obs-en-26-02.jpg',
          text: 'Однажды Иисус отправился в город Назарет, где провёл Своё детство...',
          verse: '2',
        },
      ],
      reference:
        'Библейская история из Евангелия от Матфея 4:12-25, Евангелия от Марка 1:14-15, 35-39; 3:13-21 и Евангелия от Луки 4:14-30, 38-44',
    },
    {
      title: '35. История о потерянном сыне',
      verseObjects: [
        {
          path: 'obs-en-35-01.jpg',
          text: 'Однажды Иисус учил толпу людей, собравшихся Его послушать...',
          verse: '1',
        },
        {
          path: 'obs-en-35-02.jpg',
          text: 'Фарисеи и учителя Закона увидели, что Иисус общался с теми людьми как с друзьями...',
          verse: '2',
        },
      ],
      reference: 'Библейская история из Евангелия от Луки 15:11-32',
    },
    {
      title: '46. Павел становится учеником Иисуса',
      verseObjects: [
        {
          path: 'obs-en-46-01.jpg',
          text: 'В те времена жил один человек по имени Савл...',
          verse: '1',
        },
        {
          path: 'obs-en-46-02.jpg',
          text: 'Получив такие письма, Савл отправился в Дамаск...',
          verse: '2',
        },
      ],
      reference:
        'Библейская история из Деяний святых апостолов 8:3; 9:1-31; 11:19-26; 13:1-3',
    },
  ];
  const bookPropertiesObs = {
    intro: 'Introduction goes here...',
    titlePageTitle: 'Открытые Библейские Истории',
    copyright: 'unfoldingWord®',
    SubtitlePageTitle: 'Open Bible Stories',
    back: 'Endpaper',
    tableOfContentsTitle: 'Table Of Contents',
    projectLanguage: 'Russian',
  };

  const styles = {
    SubtitlePageTitle: {
      alignment: 'center',
      fontSize: 20,
      bold: true,
      margin: [73, 0, 73, 20],
    },
    currentPage: { fontSize: 16, alignment: 'center', bold: true, margin: [0, 10, 0, 0] },
    titlePageTitle: { alignment: 'center', fontSize: 32, bold: true, margin: [73, 20] },
    projectLanguage: { alignment: 'center', bold: true, margin: [73, 15, 73, 0] },
    tableOfContentsTitle: { alignment: 'center', margin: [0, 0, 0, 20] },
    chapterTitle: { fontSize: 20, bold: true, margin: [0, 26, 0, 15] },
    copyright: { alignment: 'center', margin: [0, 10, 0, 0] },
    verseNumber: { sup: true, bold: true, opacity: 0.8 },
    reference: { italics: true, margin: [0, 10, 0, 0] },
    image: { alignment: 'center', margin: [0, 15] },
    defaultPageHeader: { bold: true, width: '50%' },
    text: { alignment: 'justify' },
    back: { alignment: 'center' },
  };

  const fileName = 'test-book.pdf';

  const handleToggleImages = () => {
    setShowImages((prevShowImages) => !prevShowImages);
    setCombineVerses(false);
  };

  const handleToggleCombineVerses = () => {
    setCombineVerses((prevCombineVerses) => !prevCombineVerses);
  };

  const handleToggleVerseNumber = () => {
    setShowVerseNumber((prevShowVerseNumber) => !prevShowVerseNumber);
  };

  const handleToggleTitlePage = () => {
    setshowChapterTitlePage((prevshowChapterTitlePage) => !prevshowChapterTitlePage);
  };

  const handleCreatePdf = () => {
    setIsCreatingPdf(true);
    JsonToPdf({
      data,
      styles,
      fileName,
      showImages,
      combineVerses,
      showChapterTitlePage,
      showVerseNumber,
      bookPropertiesObs,
    })
      .then(() => console.log('PDF creation completed'))
      .catch((error) => console.error('PDF creation failed:', error))
      .finally(() => {
        setIsCreatingPdf(false);
      });
  };

  return (
    <div>
      <button
        onClick={handleCreatePdf}
        style={{ marginRight: '10px' }}
        disabled={isCreatingPdf}
      >
        {isCreatingPdf ? 'Creating PDF...' : 'Create PDF'}
      </button>
      <button onClick={handleToggleVerseNumber} style={{ marginRight: '10px' }}>
        {showVerseNumber ? 'Hide Verse Number' : 'Show Verse Number'}
      </button>
      <button onClick={handleToggleTitlePage} style={{ marginRight: '10px' }}>
        {showChapterTitlePage ? 'Hide Chapter Title Page' : 'Show Chapter Title Page'}
      </button>
      <button onClick={handleToggleImages} style={{ marginRight: '10px' }}>
        {showImages ? 'Hide Images' : 'Show Images'}
      </button>
      {!showImages && (
        <button onClick={handleToggleCombineVerses} style={{ marginTop: '10px' }}>
          {combineVerses ? 'Split Verses' : 'Combine Verses'}
        </button>
      )}
    </div>
  );
}

<Component />;
```
