##  Vue双向绑定原理
### 访问器属性
### 极简双向绑定的实现
### 分解任务
### 文档碎片
### 数据初始化绑定
### 响应式的数据绑定
### 订阅/发布模式
### 双向绑定的实现
### 倒推流程
1. 新建vue实例vm
2. 新建Vue构造函数
3. Vue函数里的数据监听方法observe
4. observe将data里属性循环出来，执行监听指令defineReactive
5. defineReactive将监听属性挂载到vm实例上，重写get/set方法
6. definePrototype中get方法，如果存在target，则放入到该属性的dep实例中
7. definePrototype中set方法, 通知该属性实例dep要进行发布notify，循环dep中的subs，并且执行sub（watcher实例）中的update方法
8. update方法又去读取vm中的属性，并赋值给该dom
9. 建立构造函数Dep，其中含有两个方法addSub和notify--该实例为属性
10. 建立构造函数Watcher,其中含有两个方法get和update--该实例对象为订阅者
11. 编译node，对属性进行watcher实例化
12. 将文档插入到dom中。
```html
<div id="app">
		<input type="text" v-model="text">
		{{text}}
	</div>
	<script>
		//##################step6-订阅-观察者模式#######################
		/**
		构造函数
		属性是subs
		原型链上有2个方法 添加和提示
		*/
		function Dep(){
			this.subs = [];
		}
		Dep.prototype = {
			addSub: function(sub){
				this.subs.push(sub);
			},
			notify: function(){
				this.subs.forEach(function(sub){
					sub.update();
				console.log('sub', sub);
				})
			}
		}
		function Wathcher(vm, node, name){
			Dep.target = this;
			this.name = name;
			this.node = node;
			this.vm = vm;	
			this.update();
			Dep.target = null;
		}
		Wathcher.prototype = {
			update: function(){
				this.get();
				this.node.nodeValue = this.value;
			},
			get: function(){
				console.log('get---name', this.name)
				this.value = this.vm[this.name];
			}
		}
		function observe(obj, vm){
			Object.keys(obj).forEach(function(key){ // 循环对象得到key数组，循环执行
				defineReactive(vm, key, obj[key]); // 将属性挂载到vm上而不是data里
			})
		}
		function defineReactive(obj, key, val){ // obj 是vm， 和observe里的obj不一样
			var dep = new Dep(); // 类似于公众号官方， 每一个属性都是一个公众号
			Object.defineProperty(obj, key, {
				get: function (){
					if(Dep.target){
						dep.addSub(Dep.target) // watcher 实例
					}
					return val; // 很重要，不然vm中的该属性没有值
				},
				set: function(newVal){
					if(val === newVal) {return;}
					val = newVal;
					console.log('dep', dep);
					dep.notify();
				}
			});
		}
		function compile(node, vm){
			// console.log('vm-compile', vm);
			var reg = /\{\{(.*)\}\}/; // 括号里为分组
			if(node.nodeType === 1){
				var attr = node.attributes;
				for(var i = 0; i< attr.length; i++){
					if(attr[i].nodeName="v-model"){
						var name = attr[i].nodeValue;
						node.addEventListener('input', function(e){
							vm[name] = e.target.value;
						})
						node.value = vm[name]; // 可输入表单类型 值是value
						node.removeAttribute('v-model')
					}
				}
			}
			if(node.nodeType === 3){
				if(reg.test(node.nodeValue)){
					var name = RegExp.$1; // 第一个分组值
					name = name.trim();
					// node.nodeValue = vm[name]; // 文本类型 值为nodeValue
					new Wathcher(vm, node, name);
				}
			}
		}
		function nodeToFragment(node, vm){
			var flag = document.createDocumentFragment();
			var child;
			while(child = node.firstChild){
				// 经过compile之后 node不包含 v-model 及 {{}}
				compile(child, vm);
				flag.appendChild(child);
			}
			return flag;
		}
		function Vue(options){
			this.data = options.data;
			var id = options.el;
			var data = this.data;
			observe(data, this); // 监听data中的每个属性
			var dom = nodeToFragment(document.getElementById(id), this);
			document.getElementById(id).appendChild(dom);
		}
		var vm = new Vue({
			el: 'app',
			data: {
				text: 'hello defineProperty'
			}
		});
		//##################step5-响应式的数据绑定#######################
		// function observe(obj, vm){
		// 	Object.keys(obj).forEach(function(key){ // 循环对象得到key数组，循环执行
		// 		defineReactive(vm, key, obj[key]);
		// 	})
		// }
		// function defineReactive(obj, key, val){ // obj 是vm， 和observe里的obj不一样
		// 	Object.defineProperty(obj, key, {
		// 		get: function (){
		// 			return val;
		// 		},
		// 		set: function(newVal){
		// 			if(val === newVal) {return;}
		// 			val = newVal;
		// 			console.log(newVal);
		// 			console.log('vm', obj)
		// 		}
		// 	});
		// }
		// function compile(node, vm){
		// 	var reg = /\{\{(.*)\}\}/; // 括号里为分组
		// 	if(node.nodeType === 1){
		// 		var attr = node.attributes;
		// 		for(var i = 0; i< attr.length; i++){
		// 			if(attr[i].nodeName="v-model"){
		// 				var name = attr[i].nodeValue;
		// 				node.addEventListener('input', function(e){
		// 					vm[name] = e.target.value;
		// 				})
		// 				node.value = vm[name]; // 可输入表单类型 值是value
		// 				node.removeAttribute('v-model')
		// 			}
		// 		}
		// 	}
		// 	if(node.nodeType === 3){
		// 		if(reg.test(node.nodeValue)){
		// 			var name = RegExp.$1; // 第一个分组值
		// 			name = name.trim();
		// 			node.nodeValue = vm[name]; // 文本类型 值为nodeValue
		// 		}
		// 	}
		// }
		// function nodeToFragment(node, vm){
		// 	var flag = document.createDocumentFragment();
		// 	var child;
		// 	while(child = node.firstChild){
		// 		// 经过compile之后 node不包含 v-model 及 {{}}
		// 		compile(child, vm);
		// 		flag.appendChild(child);
		// 	}
		// 	return flag;
		// }
		// function Vue(options){
		// 	this.data = options.data;
		// 	var id = options.el;
		// 	var data = this.data;
		// 	observe(data, this); // 监听data中的每个属性
		// 	var dom = nodeToFragment(document.getElementById(id), this);
		// 	document.getElementById(id).appendChild(dom);
		// }
		// var vm = new Vue({
		// 	el: 'app',
		// 	data: {
		// 		text: 'hello defineProperty'
		// 	}
		// });
		//##################step4-数据初始化绑定#######################
		/**
		function compile(node, vm){
			var reg = /\{\{(.*)\}\}/; // 括号里为分组
			if(node.nodeType === 1){
				var attr = node.attributes;
				for(var i = 0; i< attr.length; i++){
					if(attr[i].nodeName="v-model"){
						var name = attr[i].nodeValue;
						node.value = vm.data[name]; // 可输入表单类型 值是value
						node.removeAttribute('v-model')
					}
				}
			}
			if(node.nodeType === 3){
				if(reg.test(node.nodeValue)){
					var name = RegExp.$1; // 第一个分组值
					name = name.trim();
					node.nodeValue = vm.data[name]; // 文本类型 值为nodeValue
				}
			}
		}
		function nodeToFragment(node, vm){
			var flag = document.createDocumentFragment();
			var child;
			while(child = node.firstChild){
				// 经过compile之后 node不包含 v-model 及 {{}}
				compile(child, vm);
				flag.appendChild(child);
			}
			return flag;
		}
		function Vue(options){
			this.data = options.data;
			var id = options.el;
			var dom = nodeToFragment(document.getElementById(id), this);
			document.getElementById(id).appendChild(dom);
		}
		var vm = new Vue({
			el: 'app',
			data: {
				text: 'hello defineProperty'
			}
		});
		*/
		//##################step3-DocumentFragment#######################
		// var dom = nodeToFragment(document.getElementById('app'));
		// console.log(dom);
		// // document-fragment 文档碎片
		// function nodeToFragment(node) {
		// 	var flag = document.createDocumentFragment();
		// 	var child;
		// 	// appendChild后node的第一个元素就被移除了,排在第二个的子元素变成第一个子元素，直到没有子元素了
		// 	while (child = node.firstChild) {
		// 		console.log(child);
		// 		flag.appendChild(child);
		// 	}
		// 	console.log(flag)
		// 	return flag;
		// }
		// document.getElementById('app').appendChild(dom)
		// console.log(document.getElementById('app'));
		//##################step2-极简双向绑定的实现#######################
		// var obj = {};
		// Object.defineProperty(obj, 'hello', {
		//     set: function(val){
		//         document.getElementById('a').value = val;
		//         document.getElementById('b').innerHTML = val;
		//     }
		// });
		// document.addEventListener('keyup', function(e){
		//     obj.hello = e.target.value;
		// }) 
		//##################step1-访问器属性#######################
		// var obj = {
		//     hello: 'welcome'
		// };
		// Object.defineProperty(obj, 'hello', {
		//     get: function(val){
		//         console.log('被读取了', val);
		//     },
		//     set: function(val){
		//         console.log('被重新赋值了', val);
		//     }
		// });
		// obj.hello;
		// obj.hello = 'hello';
	</script>

```