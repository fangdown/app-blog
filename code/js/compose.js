function afn(a){
  return a*2;
}
function bfn(b){
  return b*3;
}
const compose = (a,b)=>{
  console.log(c)
  return c=>a(b(c));
}
let myfn =  compose(afn,bfn);
console.log( myfn(2));