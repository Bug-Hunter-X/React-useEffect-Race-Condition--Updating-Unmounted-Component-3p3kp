The solution is to add a cleanup function to the useEffect hook.  This function will be called when the component unmounts, allowing you to cancel the data fetch or any other long-running operation. This prevents the component from updating after it's unmounted.

```javascript
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', { signal });
        const data = await response.json();
        if (!signal.aborted) {
          setMyData(data);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  if (myData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Data</h1>
      <pre>{JSON.stringify(myData, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
```