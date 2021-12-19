for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 1000);
  })(i);
}

function Person2() {
  var money = 50;
  function makeMoney() {
    return ++money;
  }
  function offer() {
    return --money;
  }
  return {
    makeMoney: makeMoney,
    offer: offer,
  };
}
var person2 = new Person2();
console.log(person2.makeMoney()); // 51
console.log(person2.makeMoney()); // 52
console.log(person2.makeMoney()); // 53
console.log(person2.offer()); // 52
