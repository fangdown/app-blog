function Test() {
    return ReactDOM.createPortal(
      <ChildA />,
      //     <h1>我想出现在container中</h1>,
      document.getElementById("container")
    );
  }
  
  function ChildA() {
    return <p>我是childA</p>;
  }