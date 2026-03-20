// Deep copy and change all keys to lowercase
<<<<<<< HEAD
type TData = Record<string, any>

export default function ignoreCase(data: TData): TData {
  if (!data) return {}

  const newData = {} as TData

  Object.entries(data).forEach(([key, value]) => {
    newData[key.toLowerCase()] = JSON.parse(JSON.stringify(value))
  })

  return newData
=======
type TData = Record<string, any>;

export default function ignoreCase(data: TData): TData {
  if (!data) return {};

  const newData = {} as TData;

  Object.entries(data).forEach(([key, value]) => {
    newData[key.toLowerCase()] = JSON.parse(JSON.stringify(value));
  });

  return newData;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
