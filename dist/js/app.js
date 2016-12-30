var tuFiesta = (function () {
  var config = {
    backend1: 'http://localhost/backendfiesta1',
    backend2: 'http://localhost/backendfiesta2'
  };

  var init = function () {
    tuFiesta.uiEvents.init();
  };

  return {
    init: init,
    config: config
  };
})();

tuFiesta.utils = (function () {
  var fillMonthSelect = function (selector) {
    var str = '';
    for (var i = 1; i <= 12; i++) {
      str += '<option value="'+i+'">'+i+'</option>';
    }
    document.querySelector(selector).innerHTML = str;
  }

  var fillYearSelect = function (selector) {
    var fd = new Date();
    var miny = fd.getFullYear();
    var maxy = miny + 30;
    var str = '';
    for (var i = miny; i < maxy; i++) {
      str += '<option value="'+i+'">'+i+'</option>';
    }
    document.querySelector(selector).innerHTML = str;
  }

  var validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return {
    fillMonthSelect: fillMonthSelect,
    fillYearSelect: fillYearSelect,
    validateEmail: validateEmail
  };
})();

tuFiesta.events = (function () {
  var init = function () {
    //
  };

  return {
    init: init
  };
})();

tuFiesta.uiEvents = (function () {
  var init = function () {
    //
  };

  return {
    init: init
  }
})();

tuFiesta.countdown = (function () {
  var timeinterval, endtime;
  var clock, daysSpan, hoursSpan, minutesSpan, secondsSpan;

  var getTimeRemaining = function (endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  var updateClock = function () {
    var t = getTimeRemaining(endtime);
    if (daysSpan) daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  };

  var initializeClock = function (divSelector, deadline) {
    clock = document.querySelector(divSelector);
    endtime = deadline;
    if (clock) {
      daysSpan = clock.querySelector('.js-days');
      hoursSpan = clock.querySelector('.js-hours');
      minutesSpan = clock.querySelector('.js-minutes');
      secondsSpan = clock.querySelector('.js-seconds');
      updateClock();
      timeinterval = setInterval(updateClock, 1000);
    }
  };

  var init = function (deadlineStr) {
    var deadline = new Date(deadlineStr);
    initializeClock('.js-clockdiv', deadline);
  };

  return {
    init: init
  };
})();

tuFiesta.init();
