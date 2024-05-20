export default function store<T, V>(initVal: T): V {
  let value: T = initVal;
  return {
    get: () => value,
    set: (val: T) => {
      value = val;
    },
  } as V;
}
