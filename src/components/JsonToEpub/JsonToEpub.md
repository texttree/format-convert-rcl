### An example of converting a JSON object back to an MD file

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Showdown from 'showdown';
import ReactMarkdown from 'react-markdown';

import { JsonToEpub, MdToJson } from '@texttree/obs-format-convert-rcl';

const [data, setData] = useState([]);
const [front, setFront] = useState('');
const [back, setBack] = useState('');
const [isDataLoaded, setIsDataLoaded] = useState(false);

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
        bookPropertiesObs: {
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
