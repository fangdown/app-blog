// nodejs 洋葱模型
function compose(middlewares) {
  return (ctx) => {
    const dispatch = (i) => {
      middleware = middlewares[i];
      if (i === middlewares.length) return;
      return middleware(ctx, () => dispatch(i + 1));
    };
    dispatch(0);
  };
}
