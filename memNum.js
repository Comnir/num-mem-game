angular.module('myApp')
  .controller('MemNumController', function($scope, $interval) {
    var memNum = this;
    
    memNum.stage = 'intro';
    
    memNum.correctAnswers = 0;
    memNum.wrongAnswers = 0;
    memNum.numLen = 1; // number length
    var time = 5000
	var countdown; // holds promise returned by interval
	
    memNum.selectNextNum = function () {
		cancelCountdown();
		memNum.inputNum = '';
		var tmp = (Math.floor(Math.random() * 9) + 1).toString(); // [1..9]
		for (var i=1; i<memNum.numLen; i++)
		  tmp += Math.floor(Math.random() * 10); // [0..9]
		memNum.num = tmp;
		
		memNum.stage = 'displayNumber';
		countdown =  $interval(memNum.waitForInput, time, 1);
	}
	
	memNum.waitForInput = function () {
		memNum.stage = 'waitForInput';
	}
	
	memNum.showResult = function () {
		if (memNum.inputNum == memNum.num) {
			memNum.numLen++;
		    memNum.correctAnswers++;
		    memNum.stage = 'showResultCorrect';
	    }
		else {
		    memNum.wrongAnswers++;
		    memNum.stage = 'showResultWrong';
	    }
	}
	
	memNum.endGame = function () {
		cancelCountdown();
		memNum.stage = 'summary';
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
