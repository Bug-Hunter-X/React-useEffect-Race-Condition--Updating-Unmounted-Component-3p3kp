## React useEffect Race Condition

This repository demonstrates a common React bug: updating the state of an unmounted component within a `useEffect` hook.  This typically occurs when an asynchronous operation (like a data fetch) takes longer than the component's lifecycle.  The provided `bug.js` file showcases this issue.  The solution (`bugSolution.js`) demonstrates how to prevent this using a cleanup function within the `useEffect` hook.

**To reproduce the bug:**
1. Clone this repository.
2. Run `npm install`.
3. Run `npm start`.
4. Observe the console for warnings about updating an unmounted component (you may need to quickly navigate away from the page).

**The solution:**
The `bugSolution.js` file provides a corrected version that avoids the race condition by using a cleanup function in the `useEffect` hook. This function ensures that the asynchronous operation is cancelled if the component unmounts before the operation is complete. 