# Auto Complete Demo

## Solution

### 1. Create a custom hook `useAutoComplete` to handle calling api to fetch the search result. This custom hook also returns the basic indicator, such as `error`, `isLoading` and so on, to help the component to display not only the result but also the loader and error.

### 2. Build a simple component to consume the custom hook describe above. This component is presentation only. All the core logic or function will call from custom hook.

### 3. Create a API function to fetch search result. Inside the API call, in order to mock it like real call, I added a `setTimeout` function there to simulate the real api call delay.

### 4. Create a helper function to handle the most important logic for this task, which is highlight the text. `buildHighlightStr` this function accepts two inputs, oen is the string which need to highlight, the second is the keyword which provide by the user. And this function returns a HTML String which wraps by `div` and contains `<span class='highlight'>..</span>` for the text which been highlight. For example,

```
const result = buildHighlightStr('Hello Jay', 'jay');
//result = '<div>Hello <span class='highlight'>jay</span></div>'
```
