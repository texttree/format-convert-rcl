function JsonToMd({ title = '', reference = '', verseObjects = {} }) {
  const _title = title ? `# ${title}\n\n` : '';
  const _reference = reference ? `_${reference}_` : '';
  let markdown = '';
  verseObjects.forEach((verseObject) => {
    const { urlImage, text } = verseObject;
    if (urlImage) {
      markdown += `![OBS Image](${urlImage})\n\n`;
    }
    markdown += `${text}\n\n`;
  });
  return _title + markdown + _reference;
}

export default JsonToMd;
