
// import "core";
// import "interaction";
// import "day";
// import "time";
// import "list";
// import "common";
// import "@hotwired/turbo-rails"

const calendarEl = document.getElementById('calendar');

let calendar = new FullCalendar.Calendar(calendarEl, {
	googleCalendarApiKey: "AIzaSyBI7uOdf-Y7VmJzJTs235BF3pxiTlFEPYU",
	events: {
		googleCalendarId: "c0557488530372b24bf09e3a95837753afc104fa9726bdcc05db61bb56020a97@group.calendar.google.com",
	},
   // イベントクリック時に別タブでリンクを開く
   eventClick: function(info) {
    info.jsEvent.preventDefault(); // 既定のクリック動作を無効化

    if (info.event.url) {
      window.open(info.event.url, '_blank'); // 新しいタブでリンクを開く
    }
  },
  header: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          },
          navLinks: true, // can click day/week names to navigate views
          businessHours: true, // display business hours
          editable: true,
          nowIndicator: true,
          locale: "local",
          buttonText: {
            today: "今日",
            month: "月",
            week: "週",
            day: "日",
            list: "一覧",
          },
});
calendar.render();

// var date = new Date();
// const year = date.getFullYear();
// var intMonth = date.getMonth() + 1;
// const month = intMonth.toString().padStart(2, "0");
// const day = date.getDate().toString().padStart(2, "0");

// if (location.protocol === "https:") {
//   var link = location.protocol + "//" + location.hostname + "/item/index";
// } else if (location.protocol === "http:") {
//   var link =
//     location.protocol + "//" + location.hostname + ":3000" + "/item/index";
// }

// if (document.getElementById("calendar") != null) {
//   $(function () {
   

//     function schedule_index() {
//       return $.ajax({
//         type: "GET",
//         url: "/schedule/index",
//         dataType: "json",
//       });
//     }

//     function convertToJsDateFormat(date) {
//       // Dateオブジェクトに変換
//       const schedule_date = new Date(date);

//       // ISO 8601形式の文字列に変換
//       let isoString = schedule_date.toISOString();

//       // 不要な部分を削除
//       isoString = isoString.replace(/\.\d{3}Z$/, "");

//       return isoString; // 期待値: "2024-03-06T17:47:00"
//     }

//     schedule_index()
//       .done(function (schedules) {
//         const scheduleArray = [];
//         schedules.forEach((schedule) => {
//           const newItem = {
//             id: schedule.id,
//             title: schedule.title,
//             start: convertToJsDateFormat(schedule.start_time),
//             end: convertToJsDateFormat(schedule.end_time),
//             constraint: schedule.memo,
//             extendedProps: {
//               date: schedule.schedule_date,
//             },
//           };
//           scheduleArray.push(newItem);
//         });

//         function timeFormat(schedule_date) {
//           var dateTime = new Date(schedule_date);

//           // 時間部分を取得
//           var hours = dateTime.getHours();
//           var minutes = dateTime.getMinutes();

//           // 時間部分のフォーマットを作成（HH:mm形式）
//           var timeString =
//             ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
//           return timeString;
//         }
//         var calendarEl = document.getElementById("calendar");
//         var calendar = new FullCalendar.Calendar(calendarEl, {
//           plugins: ["interaction", "dayGrid", "timeGrid", "list"],
//           googleCalendarApiKey: "AIzaSyBI7uOdf-Y7VmJzJTs235BF3pxiTlFEPYU",
//           events: {
//             googleCalendarId: "c0557488530372b24bf09e3a95837753afc104fa9726bdcc05db61bb56020a97@group.calendar.google.com"
//           },
//           header: {
//             left: "prev,next today",
//             center: "title",
//             right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//           },
//           defaultDate: `${year}-${month}-${day}`,
//           navLinks: true, // can click day/week names to navigate views
//           businessHours: true, // display business hours
//           editable: true,
//           nowIndicator: true,
//           locale: "local",
//           buttonText: {
//             today: "今日",
//             month: "月",
//             week: "週",
//             day: "日",
//             list: "一覧",
//           },
//           dateClick: (e) => {
//             // 日付マスのクリックイベント
//             // $(".date_modal").click();
//             $(".date_modal").trigger("click");
//             $(".date-form").val(e.dateStr);
//           },
//           eventClick: (e) => {
//             // イベントのクリックイベント
//             $(".date_modal_edit").trigger("click");
//             $(".date-form").val(e.event.extendedProps.date);
//             var startTime = timeFormat(e.event.start);
//             var endTime = timeFormat(e.event.end);

//             $("#schedule_id").val(e.event.id);
//             $("#del_schedule_id").val(e.event.id);
//             $(".edit_start_time").val(startTime);
//             $(".edit_end_time").val(endTime);
//             $(".edit_title").val(e.event.title);
//             $(".edit_memo").val(e.event.constraint);
//           },
//           eventDidMount: (e) => {
//             // カレンダーに配置された時のイベント
//             tippy(e.el, {
//               // TippyでTooltipを設定する
//               content: e.event.extendedProps.description,
//             });
//           },
//           events: [
//             ...scheduleArray,
//           ],
//         });
//         calendar.render();
//       })
//       .fail(function (result) {
//         console.log("エラーが発生しました。運営に問い合わせてください。");
//       });
//   });
// }
