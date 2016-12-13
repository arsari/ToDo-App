$(document).ready(function() {

// Date and weekday
    var fecha = new Date();
    var day = fecha.getDate();
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fryday', 'Saturday'];
    var weekDay = dayNames[fecha.getDay()];
    var htmlBigDate = '<p>'+ day +'<br><span>'+ weekDay +'</span></p>';
    $('#big-date').append(htmlBigDate);

// Full date
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = monthNames[fecha.getMonth()];
    var year = fecha.getFullYear();
    var htmlFullDate = '<p>'+ day +' '+ month +' '+ year +'</p>';
    $('#full-date').append(htmlFullDate);

// API Tasks processing
    var url = 'http://jsonplaceholder.typicode.com/todos';
    var data = $.ajax({
      url: url,
      method: 'GET'
    }).then(function(response) {
      var tasks = response;

      //tasks list
      var htmlTask = ' ';
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
          htmlTask = '<div class="row"><div class="col-xs-12 task"><div class="checkbox"><label><input class="active" type="checkbox" checked id="'+ tasks[i].id +'">'+ tasks[i].title +'</label></div><span id="status-'+ tasks[i].id +'">Completed</span></div></div>';
          $('#tasks-container').append(htmlTask);
        } else {
          htmlTask = '<div class="row"><div class="col-xs-12 task"><div class="checkbox"><label><input class="" type="checkbox" id="'+ tasks[i].id +'">'+ tasks[i].title +'</label></div><span id="status-'+ tasks[i].id +'">Incomplete</span></div></div>';
          $('#tasks-container').append(htmlTask);
        }
      }

      // task counting
      var done = 0;
      var progress = 0;
      var incomplete = 0;
      for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].completed === true) {
              done += 1;
            } else {
              incomplete += 1;
            }
          };
      var htmlComplete = '<p>'+ done +' of '+ tasks.length +' tasks done</p>';
      $('#task-done').append(htmlComplete);
      var pcn = done / tasks.length * 100;
      var htmlPcn = '<p>'+ pcn.toFixed(1) +'<sup>%</sup><br><span>progress</span></p>';
      $('#progress').append(htmlPcn);

      // event for checked tasks
      $('.task').click(function() {
        var $index = $('input', this).prop('class');
        if ($index == 'active') {
          $('input', this).removeClass('active');
          $('input', this).attr('checked', false);
          $('span', this).text('Incomplete');
          done -= 1 ;
          var htmlComplete = '<p>'+ done +' of '+ tasks.length +' tasks done</p>';
          $('#task-done').html(htmlComplete);
          var pcn = done / tasks.length * 100;
          var htmlPcn = '<p>'+ pcn.toFixed(1) +'<sup>%</sup><br><span>progress</span></p>';
          $('#progress').html(htmlPcn);
        } else {
          $('input', this).addClass('active');
          $('input', this).attr('checked', true);
          $('span', this).text('Completed');
          done += 1 ;
          var htmlComplete = '<p>'+ done +' of '+ tasks.length +' tasks done</p>';
          $('#task-done').html(htmlComplete);
          var pcn = done / tasks.length * 100;
          var htmlPcn = '<p>'+ pcn.toFixed(1) +'<sup>%</sup><br><span>progress</span></p>';
          $('#progress').html(htmlPcn);
        }
      });
      $('.task').on();

    });

});
