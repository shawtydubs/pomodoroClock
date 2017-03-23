var pomApp = angular.module('pomTimer', []);

pomApp.controller('timeController', function ($scope, $timeout) {
    $scope.sessionTime = 25;
    $scope.breakTime = 5;
    $scope.sessionToggle = true;
    $scope.timerRunning = false;

    setInitialTimer();
    setClock($scope.secondsRemaining);

    function setInitialTimer() {
        $scope.secondsRemaining = $scope.sessionToggle ? $scope.sessionTime * 60 : $scope.breakTime * 60;
        console.log('Setting initial timer to ' + $scope.secondsRemaining + ' seconds');
    }

    function setClock(timer) {
        $scope.minutes = parseInt(timer / 60) < 10 ? '0' + parseInt(timer / 60) : parseInt(timer / 60);
        $scope.seconds = parseInt(timer % 60) < 10 ? '0' + parseInt(timer % 60) : parseInt(timer % 60);
    }

    $scope.timeUp = function(timer) {
        timer == 'session' ? $scope.sessionTime++ : $scope.breakTime++;
    }

    $scope.timeDown = function(timer) {
        timer == 'session' ? $scope.sessionTime-- : $scope.breakTime--;
    }

    $scope.stopTimer = function() {
        $timeout.cancel(countdown);
        $scope.secondsRemaining = -1;
        $scope.timerRunning = false;
    }

    $scope.startTimer = function() {
        $scope.timerRunning = true;
        setInitialTimer();
        setClock($scope.secondsRemaining);
        countdown();

        console.log('Setting clock to ' + $scope.minutes + ':' + $scope.seconds);
        console.log('Starting countdown');
    }

    var countdown = function() {
        if ($scope.secondsRemaining == -1) {
            $timeout.cancel(countdown);
        } else if ($scope.secondsRemaining <= 0) {
            $timeout.cancel(countdown);
            $scope.sessionToggle = $scope.sessionToggle ? false : true;
            $scope.startTimer();

            console.log('Timer is complete');
            console.log('Session timer toggle now set to ' + $scope.sessionToggle);
        } else {
            $scope.secondsRemaining--;
            setClock($scope.secondsRemaining);
            $timeout(countdown, 1000);
        }
    }
});
