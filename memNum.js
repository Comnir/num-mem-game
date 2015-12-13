angular.module('myApp')
  .controller('MemNumController', function($scope, $interval) {
    var memNum = this;
    memNum.correctAnswers = 0;
    memNum.wrongAnswers = 0;
    var time = 5000
	var countdown; // holds promise returned by interval
	
	memNum.hideCurNum = function () {
		//memNum.numText = ''
		memNum.showNum = false
	}
	
    memNum.selectNextNum = function (length) {
		cancelCountdown();
		var tmp = Math.floor(Math.random() * 10)
		if (tmp == 0)
		  tmp = '5'
		for (var i=0; i<length; i++)
		  tmp += Math.floor(Math.random() * 10)
		memNum.numText = tmp
		memNum.num = memNum.numText
		memNum.showNum = true
		countdown =  $interval(memNum.hideCurNum, time, 1);
	}
	
	memNum.checkGuess = function () {
		if (memNum.guessedNum == memNum.num) 
		  memNum.correctAnswers++;
		else
		  memNum.wrongAnswers++;
	    
		memNum.guessedNum = "";
	}
    
    $scope.$on('$destroy', function() {
        alert("Destroying scope!");
		cancelCountdown();
	});
	
	cancelCountdown = function() {
		if (angular.isDefined(countdown)) {
            $interval.cancel(countdown);
            countdown = undefined;
        }
	}
    
  });
