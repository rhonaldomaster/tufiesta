var tuFiesta = (function () {
  var config = {
    backend1: 'http://localhost/tufiesta/backendfiesta1',
    backend2: 'http://localhost:8888',
    $document: $(document)
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
  var fillMonthSelect = function (id) {
    var str = '';
    for (var i = 1; i <= 12; i++) {
      str += '<option value="'+i+'">'+i+'</option>';
    }
    $(id).html(str);
  };

  var fillYearSelect = function (id) {
    var fd = new Date();
    var miny = fd.getFullYear();
    var maxy = miny + 30;
    var str = '';
    for (var i = miny; i < maxy; i++) {
      str += '<option value="'+i+'">'+i+'</option>';
    }
    $(id).html(str);
  };

  return {
    fillMonthSelect: fillMonthSelect,
    fillYearSelect: fillYearSelect
  };
})();

tuFiesta.events = (function () {
  var init = function () {
    //
  };

  var viewEventDetail = function (ev) {
    ev.preventDefault();
    var element = ev.currentTarget;
    var id = element.dataset.id;
    var containerSelector = element.dataset.container;
    var ajx = $.ajax({
      url: tuFiesta.config.backend2 + '/eventDetails',
      type: 'GET',
      dataType: 'json',
      data: {id: id}
    });
    ajx.done(function (data) {
      var $container = $(containerSelector);
      var json = data;
      if (json.notice) {
        $container.html(json.notice)
      }
      else {
        var source = $("#viewEventDetail").html();
        var template = Handlebars.compile(source);
        var html = template(json);
        $container.html(html);
      }
    })
    .fail(function (err) {
      console.log(err);
    });
  };

  return {
    viewEventDetail: viewEventDetail
  };
})();

tuFiesta.uiEvents = (function () {
  var init = function () {
    tuFiesta.config.$document.on('click','.js-view-event-details',tuFiesta.events.viewEventDetail);
  };

  return {
    init: init
  };
})();

tuFiesta.init();
