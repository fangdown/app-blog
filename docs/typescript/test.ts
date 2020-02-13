type globalData = {
  x?: boolean;
  xx?: number;
  xxx?: Record<string, any>;
  xxxx?: string;
}
const globalData: globalData = {
  
}

interface globalData1 {
  x?: boolean;
  xx?: number;
  xxx?: Record<string, any>;
  xxxx?: string;
}
const globalData1: globalData1 = {
  xx: 10
}

let node = document.getElementById('node') 

const list:Array<Record<string, any>> = [{
  name: 'fang'
}];
const list2: Record<string, any>[] = [{
  name: 'fang'
}]