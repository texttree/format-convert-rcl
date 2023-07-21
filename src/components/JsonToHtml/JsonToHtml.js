function JsonToHtml({
  jsonData,
  styleObj,
  showImages = true,
  showTitle = true,
  imageUrl = 'https://cdn.door43.org/obs/jpg/360px/',
}) {
  const defaultStyleObj = {
    contentWrapper: 'background-color: #fff; padding: 10px;',
    title: 'font-size: 20px; font-weight: bold; margin-bottom: 10px;',
    verses: 'margin-bottom: 20px;',
    reference: 'font-size: 14px; color: #999;',
    image: 'max-width: 100%; height: auto;',
    paragraph: 'font-size: 16px; line-height: 1.5; margin-bottom: 10px;',
  };

  styleObj = { ...defaultStyleObj, ...styleObj };
  const { title, reference, verseObjects } = jsonData;
  const verseHtml = verseObjects
    .map((verse) => {
      const { path, text } = verse;
      const urlImage = imageUrl + path;

      return `
        <div style="${styleObj.verse}">
        ${
          showImages
            ? `<div style="${styleObj.verseImage}">
            <img src="${urlImage}" alt="verse-image" style="${styleObj.image}">
          </div>`
            : ''
        }
          <div style="${styleObj.verseText}">
            <div style="${styleObj.paragraph}">${text}</div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div style="${styleObj.contentWrapper}">
      ${showTitle ? `<div style="${styleObj.title}">${title}</div>` : ''}
      <div style="${styleObj.verses}">${verseHtml}</div>
      <div style="${styleObj.reference}">${reference}</div>
    </div>
  `;
}

export default JsonToHtml;
