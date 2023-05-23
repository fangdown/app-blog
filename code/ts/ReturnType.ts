function greet(name: string): string {
  return `Hello, ${name}!`;
}

type GreetReturnType = ReturnType<typeof greet>;
// GreetReturnType 的类型为 string


// 这个函数接收一个字符串类型的参数name，并返回一个字符串类型的问候语。ReturnType 是 TypeScript 内置的一个泛型类型，
// 可以通过传入一个函数类型来获取该函数的返回类型。在这里，我们使用 typeof greet 获取函数 greet 的类型，
// 然后再通过 ReturnType<typeof greet> 获取 greet 函数返回值的类型为 string。


type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;


type Partial<T> = {
  [P in keyof T]?: T[P];
};