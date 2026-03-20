export default function debounce<T extends (...args: any[]) => void>(
  func: T,
<<<<<<< HEAD
  wait: number,
): T {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func.apply(this, args), wait)
  } as T
=======
  wait: number
): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
