function JsonToHtml(jsonData, styleObj = {}) {
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
      const { urlImage, text } = verse;
      return `
        <div class="verse">
          <div class="verse-image">
            <img src="${urlImage}" alt="verse-image" style="${styleObj.image}">
          </div>
          <div class="verse-text">
            <div class="verse-content" style="${styleObj.paragraph}">${text}</div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="content-wrapper" style="${styleObj.contentWrapper}">
      <div class="title" style="${styleObj.title}">${title}</div>
      <div class="verses" style="${styleObj.verses}">${verseHtml}</div>
      <div class="reference" style="${styleObj.reference}">${reference}</div>
    </div>
  `;
}

export default JsonToHtml;
