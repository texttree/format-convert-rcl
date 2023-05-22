function JsonToMd(ref) {
  const title = ref.title ? `# ${ref.title}\n\n` : '';
  const reference = ref.reference ? `_${ref.reference}_` : '';
  let markdown = '';
  ref.verseObjects.forEach((verseObject) => {
    const { urlImage, text } = verseObject;
    if (urlImage) {
      markdown += `![OBS Image](${urlImage})\n\n`;
    }
    markdown += `${text}\n\n`;
  });
  return title + markdown + reference;
}

export default JsonToMd;
