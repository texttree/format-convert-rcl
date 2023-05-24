function MdToJson(md) {
  try {
    let _markdown = md.replaceAll('\u200B', '').split(/\n\s*\n\s*/);
    const title = _markdown.shift().trim().slice(1);
    let reference = _markdown.pop().trim().slice(1, -1);
    if (reference === '') {
      reference = _markdown.pop().trim().slice(1, -1);
    }
    const verseObjects = [];

    for (let n = 0; n < _markdown.length / 2; n++) {
      let urlImage;
      let text;
      if (/\(([^)]*)\)/g.test(_markdown[n * 2])) {
        urlImage = /\(([^)]*)\)/g.exec(_markdown[n * 2])[1];
        text = _markdown[n * 2 + 1];
      } else {
        text = _markdown[n * 2] + '\n' + _markdown[n * 2 + 1];
      }

      let path;
      if (urlImage.startsWith('https://cdn.door43.org/obs/jpg/360px/')) {
        path = urlImage.replace('https://cdn.door43.org/obs/jpg/360px/', '');
      } else {
        path = urlImage;
      }

      verseObjects.push({ path, text, verse: (n + 1).toString() });
    }

    return { verseObjects, title, reference };
  } catch (error) {
    throw new Error('Error converting Markdown to JSON: ' + error.message);
  }
}

export default MdToJson;
