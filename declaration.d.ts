declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare type PromiseResult<T> = T extends Promise<infer U> ? U : T
