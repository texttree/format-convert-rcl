### Style properties:

<ul>
    <li>font: string: name of the font</li>
    <li>fontSize: number: size of the font in pt</li>
    <li>fontFeatures: string[]: array of advanced typographic features supported in TTF fonts (supported features depend on font file)</li>
    <li>lineHeight: number: the line height (default: 1)</li>
    <li>bold: boolean: whether to use bold text (default: false)</li>
    <li>italics: boolean: whether to use italic text (default: false)</li>
    <li>alignment: string: (‘left’ or ‘center’ or ‘right’ or ‘justify’) the alignment of the text</li>
    <li>characterSpacing: number: size of the letter spacing in pt</li>
    <li>color: string: the color of the text (color name e.g., ‘blue’ or hexadecimal color e.g., ‘#ff5500’)</li>
    <li>background: string the background color of the text</li>
    <li>markerColor: string: the color of the bullets in a buletted list</li>
    <li>decoration: string: the text decoration to apply (‘underline’ or ‘lineThrough’ or ‘overline’)</li>
    <li>decorationStyle: string: the style of the text decoration (‘dashed’ or ‘dotted’ or ‘double’ or ‘wavy’)</li>
    <li>decorationColor: string: the color of the text decoration, see color</li>
    <li>sup: boolean: superscript text (default: false)</li>
    <li>sub: boolean: subscript text (default: false)</li>
    <li>opacity: boolean: text opacity (default: 1)</li>
  </ul>

### An example of converting a JSON object to PDF

```jsx
import React, { useState } from 'react';
import { JsonToPdf } from '@texttree/obs-format-convert-rcl';

function Component() {
  const [showImages, setShowImages] = useState(true);
  const [combineVerses, setCombineVerses] = useState(false);
  const [showVerseNumber, setShowVerseNumber] = useState(false);
  const [isCreatingPdf, setIsCreatingPdf] = useState(false);

  const data = [
    {
      title: '26. Иисус начинает Своё служение',
      verseObjects: [
        {
          path: 'obs-en-26-01.jpg',
          text: 'После того как Иисус преодолел искушения сатаны, Он вернулся в регион Галилея, туда, где жил. Святой Дух давал Ему большую силу. Иисус ходил по Галилее из города в город, посещая разные места и наставляя людей. Все очень по-доброму отзывались о Нём.',
          verse: '1',
        },
        {
          path: 'obs-en-26-02.jpg',
          text: 'Однажды Иисус отправился в город Назарет, где провёл Своё детство. В субботу Иисус пошёл в синагогу, место молитвы. Там Ему дали свиток со словами пророка Исайи, чтобы Он прочитал вслух отрывок из этой книги. Иисус развернул свиток и начал читать.',
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
          text: 'Однажды Иисус учил толпу людей, собравшихся Его послушать. Среди них были сборщики налогов и другие люди, которые не исполняли закон Моисея, и поэтому их считали грешниками.',
          verse: '1',
        },
        {
          path: 'obs-en-35-02.jpg',
          text: 'Фарисеи и учителя Закона увидели, что Иисус общался с теми людьми как с друзьями. Поэтому они стали возмущаться и говорить друг другу: «Он поступает неправильно, разговаривает с грешниками и даже ест вместе с ними». Иисус услышал их и рассказал им такую историю:',
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
          text: 'В те времена жил один человек по имени Савл. Он был против учения об Иисусе. Савл присутствовал на том месте, где бросали камни в Стефана, и охранял одежду людей, убивавших его. Затем Савл стал преследовать верующих. Он ходил из дома в дом в Иерусалиме, хватал мужчин и женщин и бросал их в тюрьмы. Однажды Савл пришёл к первосвященнику и попросил у него письма к синагогам в Дамаске, чтобы там у него было право арестовывать и отправлять в Иерусалим последователей Иисуса.',
          verse: '1',
        },
        {
          path: 'obs-en-46-02.jpg',
          text: 'Получив такие письма, Савл отправился в Дамаск. Когда он был недалеко от города, яркий свет с неба осветил всё вокруг, и Савл упал на землю. Он услышал, как Кто-то сказал: «Савл! Савл! Почему ты преследуешь Меня?» Савл спросил: «Кто ты, Господин?» Голос ответил: «Я — Иисус, Которого Ты преследуешь!»',
          verse: '2',
        },
      ],
      reference:
        'Библейская история из Деяний святых апостолов 8:3; 9:1-31; 11:19-26; 13:1-3',
    },
  ];

  const bookPropertiesObs = {
    projectTitle: 'Project Title',
    title: 'Book Title',
    intro: 'Introduction goes here',
    back: 'Endpaper',
  };

  const styles = {
    projectTitle: {
      fontSize: 24,
      bold: true,
      alignment: 'center',
    },
    title: { fontSize: 24, bold: true, alignment: 'center', margin: [0, 250, 0, 0] },
    intro: { fontSize: 14 },
    image: {
      alignment: 'center',
      margin: [0, 10],
    },
    verseNumber: {
      sup: true,
      bold: true,
      opacity: 0.8,
    },
    text: {
      alignment: 'justify',
    },
    back: { fontSize: 14, alignment: 'center' },
    reference: {
      margin: [0, 10, 0, 0],
      italics: true,
    },
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

  const handleCreatePdf = () => {
    setIsCreatingPdf(true);

    JsonToPdf({
      data,
      styles,
      fileName,
      showImages,
      combineVerses,
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
      <button onClick={handleToggleImages} style={{ marginRight: '10px' }}>
        {showImages ? 'Hide Images' : 'Show Images'}
      </button>
      {!showImages && (
        <button onClick={handleToggleCombineVerses}>
          {combineVerses ? 'Split Verses' : 'Combine Verses'}
        </button>
      )}
    </div>
  );
}

<Component />;
```
