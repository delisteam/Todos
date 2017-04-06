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
    $scope.text=''
    $scope.todos=[{
      id:Math.random(),
      text:'上班',
      completed:false,
    },{
      id:Math.random(),
      text:'打卡',
      completed:false,
    }, 
    {
      id:Math.random(),
      text:'下班',
      completed:true,
    },]
       $scope.add = function() {
      if (!$scope.text) {
        return;
      }
      $scope.todos.push({
        // 自动增长？
        id: getId(),
        // 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
        text: $scope.text,
        completed: false
      });
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
    $scope.save=function(){
    	$scope.bianji=-1;
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