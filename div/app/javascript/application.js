
import "core"
import "interaction"
import "day"
import "time"
import "list"
import "common"

var calendarEl = document.getElementById('calendar');
var date = new Date();
const year = date.getFullYear();
const month = date.getMonth().toString() + 1;
const day = date.getDate().toString().padStart(2, "0");

// console.log(year + '-' + month + '-' + day);
if(location.protocol === "https:"){
  var link = location.protocol + "//" + location.hostname + "/item/index";
}else if(location.protocol === "http:"){
  var link = location.protocol + "//" + location.hostname + ":3000" + "/item/index";
}

if(document.getElementById("calendar") != null){
  $(function(){

    var email = $("#calendar").data('email');
    function get_user(email){
      return $.ajax({
          type: 'GET',
          url: '/calendar/get',
          dataType : "json",
          data:{
            email: email
          }
        })
    }

    function item_index(){
      return $.ajax({
          type: 'GET',
          url: '/item/index',
          dataType : "json",
          
        })
    }

  get_user(email).done(function (res) {

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    defaultDate: `${year}-${'02'}-${day}`,
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    dateClick: (e)=>{// 日付マスのクリックイベント
    console.log("dateClick:", e);
    },
    eventClick: (e)=>{// イベントのクリックイベント
      location.replace(link);
      console.log("eventClick:", e.event.title);
    },
    eventDidMount: (e)=>{// カレンダーに配置された時のイベント
      console.log('マウスオーバー');
      tippy(e.el, {// TippyでTooltipを設定する
        content: e.event.extendedProps.description,
      });
    },
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
        title: res.email,
        start: '2023-02-18',
        end: '2023-02-19',
        description: "悪い鬼を追い払い福を招く",// イベントの詳細
        backgroundColor: "red",// 背景色
        borderColor: "red",// 枠線色
        editable: true//
      },
      {
        title: 'Party',
        start: '2019-08-29T20:00:00'
      },

      // areas where "Meeting" must be dropped
      {
        groupId: 'availableForMeeting',
        title: 'Party',
        start: '2023-02-11T10:00:00',
        end: '223-02-11T16:00:00',
        rendering: 'background'
      },
      {
        title: 'Birthday',
        start: '2023-01-28T10:00:00',
        end: '2023-01-28T16:00:00',
        color: '#ff9f89',
        backgroundColor: "green",// 背景色
        borderColor: "#333",// 枠線色
        editable: true//

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
  }).fail(function (result) {
    console.log('エラーが発生しました。運営に問い合わせてください。');
  });

  })
}