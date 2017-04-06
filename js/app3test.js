(function(angular){
    'use strict';
  var MyApp=angular.module('MyTodoMvc',[])
  MyApp.controller('MainController', ['$scope','$location', function($scope,$location){
    function getId(){
      var id=Math.random();
      for(var i=0;i<$scope.todos.length;i++){
        if($scope.todos[i].id==id){
          id=getId();
          break;
        }
      }
      return id;
    }
    function getTime(){
      var date=new Date();
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var str='';
      return str='('+month+'月'+day+'日 '+hour+':'+minute+':'+second+')'
    }
    //检测是否带T
    function checkT(str1){
      // 如果找不到t则返回否
      if(str1.indexOf('/t')==-1){
        return false;
      }
      return true
    }
    // 去除字符串中的T
    function clearT(str2){
      return str2.substring(0,str2.length-2)
    }
    $scope.text=''
    $scope.todos=[{
      id:Math.random(),
      text:'吃饭',
      completed:false,
    },{
      id:Math.random(),
      text:'睡觉',
      completed:false,
    }, 
    {
      id:Math.random(),
      text:'打豆豆'+getTime(),
      completed:true,
    },]
       $scope.add = function() {
        if (!$scope.text) {
        return;
      }else if($scope.text=='吃屎'){
        alert('吃屎有益身心健康');
         $scope.todos.push({
        id: getId(),
        text: '吃屎',
        completed: false,
      })
      }
       else if($scope.text=='殷晨东'){
        alert('你肯定暗恋我');
         $scope.todos.push({
        id: getId(),
        text: $scope.text,
        completed: false,
      });
      }
      else if(checkT($scope.text)){

        $scope.todos.push({
        id: getId(),
        text: clearT($scope.text)+getTime(),
        completed: false,
      });
      }
      else{
      $scope.todos.push({
        id: getId(),
        text: $scope.text,
        completed: false,
      });}
      // 清空文本框
      $scope.text = '';
    };
    $scope.remove=function(id){

      for (var i = 0; i < $scope.todos.length; i++) {
        if($scope.todos[i].id==id){
          $scope.todos.splice(i,1)
          break;
        }
      }
    }
    $scope.clear=function(){
      var result=[];
      for (var i = 0; i < $scope.todos.length; i++) {
        if(!$scope.todos[i].completed){
          result.push($scope.todos[i])
        }
      }
      $scope.todos=result
    }
    $scope.existCompleted=function(){
      for (var i = 0; i < $scope.todos.length; i++) {
        if($scope.todos[i].completed){
          return true;
        }
      }
      return false
    }
    var now=true;
    $scope.toggle=function(){
    	for (var i = 0; i < $scope.todos.length; i++) {
    		$scope.todos[i].completed=now;
    	}
    	now=!now
    }
    $scope.bianji=-1;
    $scope.editing=function(id){
    	$scope.bianji=id
    }
    $scope.save=function(text){
       if(text){
         $scope.bianji=-1;
       }
    }
    $scope.selector={};
    $scope.$location=$location;
    $scope.$watch('$location.path()',function(now,old){
    	switch(now){
    		case '/active':
    		$scope.selector={completed:false};
    		break;
    		case '/completed':
    		$scope.selector={completed:true};
    		break;
    		default:
    		$scope.selector={};
    		break;
    	}
    })
  }])
})(angular)