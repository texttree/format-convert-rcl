### Options:

- `title`: `string`
  Title of the book
- `author`: `string | string[]` (optional, default `['anonymous']`)
  Name of the author for the book, e.g. `"Alice"` or `["Alice", "Bob"]`
- `publisher`: `string` (optional, default `anonymous`)
  Publisher name
- `tocTitle`: `string` (optional, default `Table of Contents`)
  Title of the Table of Contents
- `numberChaptersInTOC`: `boolean` (optional, default `true`)
  Automatically number entries in TOC
- `lang`: `string` (optional, default `en`)
  Language code of the book
- `verbose`: `boolean | ((type, ...args) => void)` (optional, default `false`)
  Whether to log progress messages; If a function is provided, the first argument will either be `'log'` or `'warn'`

You can see the full list of options by visiting the library [epub-gen-memory](https://github.com/cpiber/epub-gen-memory#options)

### An example of converting a JSON object back to an MD file

```jsx
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Showdown from 'showdown';

import { JsonToEpub, MdToJson } from '@texttree/obs-format-convert-rcl';

const [isDataLoaded, setIsDataLoaded] = useState(false);
const [front, setFront] = useState('');
const [back, setBack] = useState('');
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const urls = new Array(50)
        .fill()
        .map(
          (_, index) =>
            'https://git.door43.org/ru_gl/ru_obs/raw/branch/master/content/' +
            ('000' + (index + 1)).slice(-2) +
            '.md'
        );
      try {
        axios.all(urls.map((url) => axios.get(url))).then((_data) => {
          const res = _data.map((el) => MdToJson(el.data));
          setData(res);
        });

        let converter = new Showdown.Converter();
        const md_front = await axios.get(
          'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/front/intro.md'
        );
        let html_front = converter.makeHtml(md_front.data);
        setFront(html_front);

        const md_back = await axios.get(
          'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/back/intro.md'
        );
        let html_back = converter.makeHtml(md_back.data);
        setBack(html_back);
      } catch (error) {
        console.log(error);
      }
      setIsDataLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);

const options = {
  title: 'Открытые Библейские Истории',
  author: 'TextTree',
  lang: 'Русский',
  publisher: 'TextTree Movement Publisher',
  numberChaptersInTOC: false,
  tocTitle: 'Оглавление',
  verbose: true,
};

function Component() {
  const handleClick = async () => {
    if (isDataLoaded) {
      await JsonToEpub({
        data,
        bookIntroBack: {
          intro: { content: front, title: 'Введение' },
          back: { content: back, title: 'Послесловие' },
        },
        options,
      });
    }
  };

  return <button onClick={handleClick}>Generate</button>;
}

<Component />;
```
