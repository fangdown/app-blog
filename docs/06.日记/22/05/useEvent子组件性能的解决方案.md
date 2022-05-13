---
title: useEvent子组件性能的解决方案
date: 2022-05-13 15:06:36
permalink: /pages/bc2a85/
categories:
  - 日记
tags:
  - 
---

# useEvent子组件性能的解决方案

## 背景

大多数人都有过表单的开发经验， 在现在的组件结构中往往是这样的

- 表单父组件
    - 表单项组件
    - 表单项组件
    - 表单项组件
    - 表单项组件
    - 表单项组件
    - 表单项组件

1. 在父组件中设定表单初始值```formData```, 并负责回调函数的相关处理
2. 往子组件传需要的表单值和回调方法 

> 那么经常会遇到更改了某一个表单项，会触发整个表单的的所有组件、子组件的渲染，特别影响性能！！！

```js
const High = React.memo((props: any) => {
    const { onClick1, high } = props;
    console.log('render high');
    return (
        <>
            身高： {high}
            <Button onClick={onClick1}>身高+1</Button>
        </>
    );
});
const Age = React.memo((props: any) => {
    const { onClick2, age } = props;
    console.log('render age');
    return (
        <>
            年龄： {age}
            <Button onClick={onClick2}>年龄+1</Button>
        </>
    );
});
const Chat = () => {
    const [formData, setFormData] = useState({
        high: 0,
        age: 0,
    });
    const onClick1 = useCallback(() => {
        setFormData({ ...formData, high: formData.high + 1 });
    }, [formData]);
    const onClick2 = useCallback(() => {
        setFormData({ ...formData, age: formData.age + 1 });
    }, [formData]);
    return (
        <div>
            <High onClick1={onClick1} high={formData.high} />
            <Age onClick2={onClick2} age={formData.age} />
        </div>
    );
};
```
- 点击high或者age组件都会引起对方的重新渲染

## 分析
- 示例代码中使用了React.memo包装了子组件，可以避免依赖值变化引起的渲染
- 子组件中一旦有了回调事件，React.memo 就不生效了
- 点击事件用了useCallback 进行了封装， 但是需要依赖值，依赖值变化了，又会使回调事件变成新的回调事件，进一步造成子组件重新渲染
- 痛点：使用了公共的对象进行存储数据，但是有时候又不得不这么做


## 解决 使用useEvent


```js
const useEvent = (handler) => {
    const handlerRef = useRef(null);
    useLayoutEffect(() => {
        handlerRef.current = handler;
    });
    return useCallback((...args) => {
        const fn = handlerRef.current;
        return fn(...args);
    }, []);
};
const High = React.memo((props: any) => {
    const { onClick1, high } = props;
    console.log('render high');

    return (
        <>
            身高： {high}
            <Button onClick={onClick1}>身高+1</Button>
        </>
    );
});
const Age = React.memo((props: any) => {
    const { onClick2, age } = props;
    console.log('render age');
    return (
        <>
            年龄： {age}
            <Button onClick={onClick2}>年龄+1</Button>
        </>
    );
});
const Chat = () => {
    const [formData, setFormData] = useState({
        high: 0,
        age: 0,
    });

    const onClick1 = useEvent(() => {
        setFormData({ ...formData, high: formData.high + 1 });
    });
    const onClick2 = useEvent(() => {
        setFormData({ ...formData, age: formData.age + 1 });
    });
    return (
        <div>
            <High onClick1={onClick1} high={formData.high} />
            <Age onClick2={onClick2} age={formData.age} />
        </div>
    );
};
```
## 总结
- useLayoutEffect 在render之前同步执行
- useEffect 在render之后异步执行
- useCallback 依赖为空，说明函数不会更新
- handlerRef.current 保存了函数，在useCallback中拿出来用，每次执行的时候能拿到最新的参数

![](https://api.git123.cn/proxy/image?url=https://mmbiz.qpic.cn/mmbiz/pfCCZhlbMQRic8iaqic0nAhxHTxO0U1sPDlnYTEgt9kSHW9XBZGnLibeBOpuulTBMguUeVyF2C3relaibkBNniakoG4Q/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)