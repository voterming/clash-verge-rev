<<<<<<< HEAD
export default function isAsyncFunction(fn: (...args: any[]) => any): boolean {
  return fn.constructor.name === 'AsyncFunction'
=======
export default function isAsyncFunction(fn: Function): boolean {
  return fn.constructor.name === "AsyncFunction";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
