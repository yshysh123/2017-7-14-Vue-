//存取localstorage中的数据 当刷新页面的时候或者关闭页面再打开的时候，页面不会有改变
var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

//var list = [
//	{
//		title:'吃饭打豆豆',
//		isChecked:false  //未选中   任务未完成
//	},
//	{
//		title:'吃饭打豆豆',
//		isChecked:true   //选中   任务完成了
//	}
//]

//取出所有的值，用hash把需要的拿出来
var list = store.fetch("ysh-0713");

var vm = new Vue({
	el:'.main',//设置main为挂载点
	data:{
		list:list,
		//数据驱动视图，当data的todo改变的时候，v-model获取 然后改变lis
		todo:"",
		edtorTodos:'',  //记录正在编辑的数据
		beforeTitle:'',//记录正在编辑数据的title
		visibility:'all'  //通过这个属性值的变化，对数据进行筛选
	},
	watch:{
		//监控list这个属性，当这个属性值发生变化的时候，执行之后的函数，浅监控，只有当list改变的时候会触发后面的值
//		list:function(){
//			store.save("ysh-0713",this.list);
//		}
		//深度监控，当list里面的任何值改变的时候，都会触发后面的函数
		list:{
			handler:function(){
				store.save("ysh-0713",this.list);
			},
			deep:true
		}
	},
	computed:{
		//计算属性
		noCheckedLength:function(){
			return this.list.filter(function(item){
    			return !item.isChecked
    		}).length
		},
		filteredList:function(){
			//过滤的时候有3种情况，all finished unfinished
			var filter = {
				all:function(list){
					return list
				},
				finished:function(list){
					return list.filter(function(item){
						return item.isChecked
					})
				},
				unfinished:function(list){
					return list.filter(function(item){
						return !item.isChecked
					})
				},
			}
			//
			return filter[this.visibility] ? filter[this.visibility](list) : list;
		}
	},
	methods:{
		//ES6提供的函数，不需要写function 直接函数名+括号
		addTodo(ev){ //添加任务
			//向list中添加一条数据 任务的格式就是一个对象
			/*
			 	{
			 		title:
			 	}
			 * */
			//事件处理函数中的this指向的是当前跟实例Vue
			//push其实不是数组的方法，是Vue内部的方法，只不过名字用的和数组方法一样，所以会触发视图更新
			this.list.push({
				//初始名字是input里面输入的名字，双向绑定
				title:this.todo,
				//初始状态是未选中
				isChecked:false
			});
			
			title:this.todo = '';
		},
		deleteTodo(todo){//删除任务  
			var index = this.list.indexOf(todo);
			//splice其实不是数组的方法，是Vue内部的方法，只不过名字用的和数组方法一样，所以会触发视图更新
			this.list.splice(index,1);
		},
		edtorTodo(todo){//编辑任务
			this.beforeTitle = todo.title;
			//编辑任务的时候，要记录一下编辑这条任务的title，方便在取消编辑的时候重新赋给item
			this.edtorTodos = todo;
		},
		edtorTodoed(todo){
			//编辑成功
			//把edtorTodos清空，就没有一个Li满足条件 所以class名自动被清除掉
			this.edtorTodos = '';
		},
		cancelTodo(todo){
			//编辑任务时，取消编辑，返回以前标题
			todo.title = this.beforeTitle;
			this.edtorTodos = '';
			this.beforeTitle = '';
		}
	},
	//自定义事件
	directives:{
		'foucs':{
			//update 被绑定的元素所在模板更新时调用，而不论绑定值是否变化，通过比较更新前后的值，可以忽略不必要的模板更新。
			update(el,binding){
				if(binding.value){
					//原生获取焦点
					el.focus();
				}
			}
		}
	}
})
function watchHashchange(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
}
watchHashchange();
window.addEventListener("hashchange",watchHashchange)
