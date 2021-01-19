/// <reference types="react-scripts" />

declare module 'create-keyframe-animation';

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

