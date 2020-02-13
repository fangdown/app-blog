## react长列表渲染优化


### 现状
渲染一个数组列表， 东西比较多， 涉及到动画，渲染的时候， 感觉卡顿，经常有闪的效果

### 分析

经过定位分析，限制渲染数量，这种情况就不会发生，应该是一次渲染的东西太多，造成了页面卡顿。
需从这方面解决

### 解决方案

经过分析与搜索，react-virtualized插件能帮助我们解决问题，于是引入使用
```js

import {
  List as VList,
  ListRowProps,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from 'react-virtualized';

render(){
  // ....
  // data.cmps 数组数量较大，同时渲染会卡顿
  const renderItem = (props: ListRowProps) => {
    const cmp = data.cmps[props.index];
    return (
      <CellMeasurer
        cache={this.measureCache}
        columnIndex={0}
        key={props.key}
        parent={props.parent}
        rowIndex={props.index}>
        <Cmp
          key={props.index}
          data={cmp}
          pageId={data.id}
          pageIndex={pageIndex}
          inLongPage={isLongPage}
          fixedStyle={fixedStyles[cmp.id]}
          fixedStyles={fixedStyles}
          setEditStatus={setEditStatus}
          switchPage={switchPage}
          cmps={data.cmps}
          updateCmps={updateCmps}
          current={className}
        />
      </CellMeasurer>
    );
  };
  return (
    <div className="page-content" style={contentStyle}>
      <AutoSizer>
        {({ width, height }) => (
          <VList
            ref={ref => (this.VList = ref)}
            width={width}
            height={height}
            overscanRowCount={10}
            rowCount={data.cmps.length}
            rowRenderer={renderItem}
            deferredMeasurementCache={this.measureCache}
            rowHeight={this.measureCache.rowHeight}
          />
        )}
      </AutoSizer>
    </div>
  )
}
```

### 原理
react-virtualized将我们的滚动场景区分为了viewport内的局部滚动, 和基于viewport的滚动, 前者相当于在页面中开辟了一个独立的滚动区域，属于内部滚动, 这跟和iscroll的滚动很类似, 而后者则把滚动作为了window滚动的一部分(对于移动端而言，这种更为常见). 基于此计算出当前所需要显示的组件.

解决以上问题的核心思想就是: 只加载可见区域的组件


[参考：react长列表优化方案: react-virtualized](https://juejin.im/post/5af03345f265da0b7964cf50)