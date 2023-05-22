### An example of converting an MD file to a JSON object

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';
import MdToJson from './MdToJson';

function Component() {
  const url =
    'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/01.md';

  const [jsonData, setJsonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        const { verseObjects, ...remainingData } = MdToJson(data);
        const limitedVerseObjects = verseObjects.slice(0, 3);
        const jsonData = { ...remainingData, verseObjects: limitedVerseObjects };
        setJsonData(jsonData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!jsonData) return <div>Loading...</div>;

  return <ReactJson src={jsonData} />;
}

<Component />;
```
