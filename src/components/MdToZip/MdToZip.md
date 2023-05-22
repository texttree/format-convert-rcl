### An example of converting an MD file to a ZIP-archive

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import MdToZip from './MdToZip';

function Component() {
  const url =
    'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/36.md';

  const [jsonData, setJsonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        const title = data.match(/^#\s(.+)/m)[1];
        const content = data.replace(/^#\s(.+)/m, '');
        setJsonData({ title, content });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  const handleDownloadZip = () => {
    if (!jsonData) {
      return;
    }

    const markdownContent = `# ${jsonData.title}\n\n${jsonData.content}`;
    MdToZip({ markdown: markdownContent, fileName: 'story-36.md' });
  };

  if (errorMessage) return <div>{errorMessage}</div>;
  return <button onClick={handleDownloadZip}>Download Zip</button>;
}

<Component />;
```
