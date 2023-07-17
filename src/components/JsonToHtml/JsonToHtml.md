### An example of converting a JSON object to HTML

```jsx
import { useState, useEffect } from 'react';

import axios from 'axios';

import { MdToJson, JsonToHtml } from '@texttree/obs-format-convert-rcl';

function Component() {
  const [showResult, setShowResult] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [htmlData, setHtmlData] = useState('');

  const btnStyle = {
    marginBottom: '10px',
    marginLeft: '40px',
    padding: '15px',
    backgroundColor: '#FFCD5C',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  };
  const url =
    'https://git.door43.org/ru_gl/ru_obs/raw/commit/e562a415f60c5262382ba936928f32479056310e/content/30.md';

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url);

      const jsonData = MdToJson(data);
      setJsonData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const generateHtml = () => {
      if (jsonData && showResult) {
        const styleObj = {
          contentWrapper: 'background-color: #f1f1f1; padding:32px',
          title:
            'font-size: 24px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid black',
          verses: 'font-size: 16px;',
          paragraph: 'padding-bottom: 16px;',
          image: 'padding-bottom: 16px;',
          reference: 'font-style: italic; margin-top: 16px',
        };
        const htmlData = JsonToHtml(jsonData, styleObj);
        setHtmlData(htmlData);
      }
    };

    generateHtml();
  }, [jsonData, showResult]);

  const handleShowResult = () => {
    setShowResult((prev) => !prev);
  };

  return !jsonData ? (
    <div>Loading...</div>
  ) : (
    <>
      <button onClick={handleShowResult} style={btnStyle}>
        {showResult ? 'Hide' : 'Show'} Result
      </button>
      {showResult && (
        <div
          style={{ height: '550px', overflow: 'auto' }}
          dangerouslySetInnerHTML={{ __html: htmlData }}
        />
      )}
    </>
  );
}

<Component />;
```
