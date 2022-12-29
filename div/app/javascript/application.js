
import "core"
import "interaction"
import "day"
import "time"
import "list"
import "common"

import * as bootstrap from "bootstrap"


// $(function(){

//     $.ajax({
//         type: 'GET',
//         url: '/calendar/get',
//       }).done(function (res) {

//         console.log(res);
//     }).fail(function (result) {
//         console.log('エラーが発生しました。運営に問い合わせてください。');
//       });
// })




    var calendarEl = document.getElementById('calendar');
    var date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      defaultDate: `${year}-${month}-${day}`,
      navLinks: true, // can click day/week names to navigate views
      businessHours: true, // display business hours
      editable: true,
      events: [
        {
          title: 'Business Lunch',
          start: '2019-08-03T13:00:00',
          constraint: 'businessHours'
        },
        {
          title: 'Meeting',
          start: '2019-08-13T11:00:00',
          constraint: 'availableForMeeting', // defined below
          color: '#257e4a'
        },
        {
          title: 'Conference',
          start: '2022-12-18',
          end: '2022-12-20'
        },
        {
          title: 'Party',
          start: '2019-08-29T20:00:00'
        },

        // areas where "Meeting" must be dropped
        {
          groupId: 'availableForMeeting',
          start: '2019-08-11T10:00:00',
          end: '2019-08-11T16:00:00',
          rendering: 'background'
        },
        {
          title: 'Birthday',
          start: '2022-12-13T10:00:00',
          end: '2022-12-13T16:00:00',
          color: '#ff9f89',
          rendering: 'background'

        },

        // red areas where no events can be dropped
        {
          start: '2019-08-24',
          end: '2019-08-28',
          overlap: false,
          rendering: 'background',
          color: '#ff9f89'
        },
        {
          start: '2019-08-06',
          end: '2019-08-08',
          overlap: false,
          rendering: 'background',
          color: '#ff9f89'
        }
      ]
    });

    calendar.render();


  $(function(){

  })
