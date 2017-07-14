# 2017-7-14-Vue-事件簿

  Vue学习第一天，感觉有点蒙蒙的。从原生JS操作DOM到数据驱动DOM还是没有完全转变过来。
  
  Vue里很少操作DOM，把数据和DOM进行双向绑定，从而达到数据修改自动修改视图的效果。
  
  本例子是一个小型的任务簿
  
  功能如下：
  
    1、在输入框添加任务，按回车，在下部列表区域生成任务。
    
    2、点击任务上面的check按钮，可以实现任务完成\未完成之间的切换。
    
    3、双击任务，可以编辑任务
    
    4、编辑完成按回车、其他区域保存，按ESC取消编辑。
    
    5、完成任务，所有任务，未完成任务切换。
    
  实现的一些思路在注释里面写的应该蛮清楚了。
  
  
下面记录一些Vue的基本用法（每天记录一点点）：

V-if 

基本语法如下：v-if:'expression';

expression是一个返回值为bool值的表达式，表达式是一个bool属性，也可以是一个返回bool值的表达式。

例子：

<！DOCTYPE html>

<html>

  <head>
  
    <meta charset='UTF-8'>
    
    <title></title>
    
  </head>
  
  <body>
  
    <div id='app'>
    
      <h1>Hello,Vue.js</h1>
      
      <h1 v-if='yes'>Yes!</h1>
      
      <h1 v-if='no'>No!</h1>
      
    </div>
    
  </body>
  
  <script scr = 'js/vue.js'></script>
  
  <script>
  
    new Vue({
    
      el:'#app',
      
      data:{
      
        yes:true,
        
        no:false,
        
      }
      
    })
    
  </script>
  
</html>

如例子所示，案例将输出:

Hello,Vue.js

Yes!
