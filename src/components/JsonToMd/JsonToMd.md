### An example of converting a JSON object back to an MD file

```jsx
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { JsonToMd } from '@texttree/format-convert-rcl';

function Component() {
  const [data, setData] = useState({
    verseObjects: [
      {
        urlImage: 'https://cdn.door43.org/obs/jpg/360px/obs-en-04-01.jpg',
        text: 'Спустя много лет после потопа в мире снова стало много людей, и они по-прежнему были злы и совершали грехи против Бога и против друг друга. В то время все люди говорили на одном языке. И хотя Бог повелел людям расселиться по всей земле, они, наоборот, собрались вместе и принялись строить город.',
      },
    ],
    title: ' 4. Завет Бога с Аврамом',
    reference: 'Библейская история из Бытия 11-15',
  });

  const [mdData, setMdData] = useState('');

  useEffect(() => {
    const generateMarkdown = async () => {
      const mdData = await JsonToMd(data);
      setMdData(mdData);
    };

    generateMarkdown();
  }, [data]);

  return <ReactMarkdown children={mdData} />;
}

<Component />;
```
