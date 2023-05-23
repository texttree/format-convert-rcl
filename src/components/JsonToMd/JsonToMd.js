function JsonToMd({
  title = '',
  reference = '',
  verseObjects = {},
  imageUrl = 'https://cdn.door43.org/obs/jpg/360px/',
}) {
  const _title = title ? `# ${title}\n\n` : '';
  const _reference = reference ? `_${reference}_` : '';
  let markdown = '';
  verseObjects.forEach((verseObject) => {
    const { path, text } = verseObject;
    const urlImage = imageUrl + path; // Формирование полной ссылки на изображение
    if (urlImage) {
      markdown += `![OBS Image](${urlImage})\n\n`;
    }
    markdown += `${text}\n\n`;
  });
  return _title + markdown + _reference;
}

export default JsonToMd;
