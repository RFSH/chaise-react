# Summary

The following presentation explains everything that we need to know about
React and Redux:

https://blog.isquaredsoftware.com/presentations/react-redux-ts-intro-2020-12

## Table of contents
  * [Structure and Deployment](#structure-and-deployment)
  * [TypeScript](#angular-and-typescript)
  * [Using ERMrestJS](#using-ermrestjs)
  * [Communication between components](#communication-between-components)
  * [HTML content (iframe)](#html-content--iframe-)
  * [Bootstrap](#bootstrap)

## Structure and Deployment

To deploy react, we don't necessarily need anything. We can just include react.js
and react-dom.js and that would work. But for bigger projects it's recommended
to use a Toolchain.

I tried three methods:

1. [create-react-app](https://github.com/facebook/create-react-app): Suitable for
   single page applications. Hides the webpack configuration and in order to make
   it work for us, we have to eject the build files and manually relocate them. So
   not really suitable for us.
2. [Next.js](https://nextjs.org/): It has a lot of features that we are not going to use.
   For example it allows server rendering, route pre-fetching, etc. It's more than what
   we might want.
3. Creating a Toolchain from scratch: A JavaScript build toolchain typically
   consists of a package manager, a bundler, and a compiler. So I manually installed
   `npm`, `webpack`, `Babel`, and `typescript` [using this tutorial](https://dev.to/deadwing7x/setup-a-react-app-using-webpack-babel-and-typescript-5927). It was a bit
   difficult at first, but once I got the hang of it I think it's the best solution for us. Some other useful links related to this:
     - https://chriscourses.com/blog/loading-fonts-webpack
     - https://stackoverflow.com/questions/40443806/webpack-resolve-alias-does-not-work-with-typescript
     - https://webpack.js.org/configuration/


 ## TypeScript

 Adding TypeScript to the project was relatively simple. The only issue is that
 we have to always make sure to modify `tsconfig.json` to be aligned with our
 webpack config. For example if we're defining an alias in webpack, we have to
 do the same in TypeScript.

 Adding TypeScript allows us to define interfaces for the props. Or in case of redux
 it will allow us to use more predicable wrappers. Although, at the same time
 TypeScript will cause some overheads as we have to make sure everything is properly
 Typed or properly used. For instance, in [here](https://github.com/RFSH/chaise-react/blob/master/src/apps/recordset/index.tsx#L25) you can see that the `reference` will never
 be null in runtime (there's a guard at the start of the function and also this function will never run before populating reference.) But compiler still complains about possibility of `null` and therefore I had to add a comment to let compiler know
 that it should ignore it.

 I've also used `any` a lot which is not ideal. Ideally we want everything to have
 proper types. But since most of the objects (reference, page) comes from ERMrsetJS
 I wasn't sure how I should type them. After migrating to the new technology, I think
 we should do the same with ERMrestJS and then we can use proper types for them in
 Chaise as well.

 ## Using ERMrestJS

 Using ERMrestJS was simpler in React by using axios in place of AngularJS's $http, and
 including the Q library. Although it still needed a small change in ERMrestJS since
 the `headers` API in axios is an object where as in $http it's a function.

 ## Communication between components

The communication between parent and children is very straightforward. Parents pass
"props" to children, and children can call a passed prop from the parent in order
to communicate with parents. Although this can cause issues if we have multi layer
of components. In that case we can use redux. With redux every component talk with
a single source of truth.

## HTML content (iframe)

For HTML contents we can use `dangerouslySetInnerHTML`:

```javascript
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

source: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

## Bootstrap

I used [react-bootstrap](https://react-bootstrap.github.io/) to inject Bootstrap
elements in my react app. It supports all versions of Bootstrap:

- [v2.0](https://react-bootstrap.netlify.app/migrating/) has not been fully released yet but it will support Bootstrap 5.
- [v1.6.0](https://react-bootstrap.github.io/) Is the latest stable version and is based on Bootstrap 4.6.
- [v0.33.1](https://react-bootstrap-v3.netlify.app/) supports Bootstrap 3 but hasn't been updated in a while and is not supported anymore.
