# Part2

## 1.What is the difference between Component and PureComponent? Give an example where it might break my app.

The major diff is PureComponent has built-in implementation for `shouldComponentUpdate` function, which will optimize the re-render, and shallow compare the props and state. And PureComponent only re-renders when props or state changes. However, if your props or state is nested data structure, even though, your props or state changed, PureComponent still might not re-render properly, because `shallow compare` only compare the top-level properties.

For example, consider the following example, if in top level component change the `age` value of data, Sample component won't re-render. Since `shallow compare` only change the top-level properties which is `a` and `d` same or not. Changing `d.e.age` won't affect the result comparing `a` and `d`.

```
const data = {a: {b: [1,2,3]}, d: {e : {age: 12}} };
class Sample extends PureComponent {
    render () {
        const {data} = this.props;

        return <div>...</div>
    }
}
```

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

When using `ShouldComponentUpdate` in our component, which means we are going to optimize the performance of our component, we only want to trigger the re-render when props or state got changed.

If our data comes from Context, our component might ignore the re-render because the `ShouldComponentUpdate` optimization, and it might cause the our component render some out of date data.

## 3. Describe 3 ways to pass information from a component to its PARENT.

Option 1, you can pass a callback function to your child component, and child can trigger that callback function when they want to pass some data back to the parent component.

Option 2, we can use the Context or Redux. parent component can subscribe the data, and child component can modify (such as dispatch in Redux) the data. So, parent component can get the latest data from child.

Option 3, you can publish an Event in the child component (such as `new Event()`), and listen an Event in the parent component (such as `document.addEventListener()`).

## 4.Give 2 ways to prevent components from re-rendering.

Option 1, you can `memo` hoc, which will only re-render when props changed. If props is nested data structure, you need to provide the compare function to handle it. By default, the default compare function will only shallow compare the props.

Option 2, you can use `ShouldComponentUpdate` function or `PureComponent` for the legacy class component.

## 5.What is a fragment and why do we need it? Give an example where it might break my app.

In React, you only can return one JSX element in your component, so, usually we would wrap it with `<div>` on top level. But if you don't want to wrap any top layer html element, you can use fragment to wrap it.

For example,

```
<>
  <div>test</div>
  <div>test</div>
</>
```

I am not quite sure how the fragment can break the app. But it might cause some un-consistence behavior. For example, if the component render element based on some condition, such as

```
function MyComp(props){
    if(props.a){
        return <div>
           <div>..</div>
           <div>..</div>
        <div>
    }
    return <>
        <div>..</div>
        <div>..</div>
    </>
}
```

When you call this component, you might not receive a root element if `a` is false.

## 6.Give 3 examples of the HOC pattern.

1 - in the old React Router version, if you want to access the `history`, `location` etc object from Rect Router, you need to wrap the component with `withRouter` hoc.

2 - in the old Redux, if you want to subscribe the data in the Redux store, the component need to wrap `connect` hoc provide by Redux.

3 - in the MUI (Material UI), they provide a hoc `withStyle` to apply some custom style to the component.

## 7.What's the difference in handling exceptions in promises, callbacks and async...await?

For promise, you can chain the `catch` function to handle it. Such as,
`somePromise().then().catch()`

For callback, usually you will receive some parameters in the callback function. So, you can handle the exception or error inside your callback. Such as,

```
function apiCallback(error, data){
    if(error){...}
}
```

For async await, you need to wrap by try an catch to handle. Such as

```
const myFn = async() => {
    try{
        const response = await someAPICall();
    }catch(e){
        //handle error here
    }
}
```

## 8.How many arguments does setState take and why is it async.

It provides 2 arguments, the 1st one the object you would provide to update, or you can provide a function to return a update object. The 2nd one is option, which is the callback function, which will trigger when the state is updated and the component re-render is done.

The setState is async, and it will trigger update right after you call teh setState function because react will put all the setState request in their own queue, and schedule it in the batch update. It can improve the performance and also make it kind of predictable.

## 9. List the steps needed to migrate a Class to Function Component.

0. write unit tests to make sure your existing component is functional
1. create a function
2. create a interface for the props if using ts
3. put the props as parameter in the new created function
4. replace all the old life cycle to useEffect
5. replace the this.state to useState
6. change all the class method to function
7. remove the render function, and put the return jsx element in the return statement
8. update the unit tests to make sure the new function component working expected

## 10.List a few ways styles can be used with components.

1. inline style, EG `<div style={{width: '10px'}}></div>`
2. create css/scss in a separate file, and use it with `className`, EG `<div className="my-button">...</div>`
3. you can also create a module css, and import it as object in your component, and use it. EG

```
//MyComp.module.css
.someClass {
  ....
}

// MyComp.jsx
....
import styles from './MyComponent.module.css';

function MyComp() {
  return <div className={styles.someClass}>...</div>;
}
```

Rather than that, you can also use others Library to style your component, such as MUI, style-component and so on.

## 11.How to render an HTML string coming from the server.

You can use `dangerouslySetInnerHTML` to render the html string which provide by react. Or you can use some 3rd party library, like `html-react-parser`. The good thing to use some 3rd party library, they will handle the string sanitizing for you. You can need to worry about the html string might include some cross site script.
