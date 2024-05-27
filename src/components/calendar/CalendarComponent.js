import React, { useEffect, useRef, useState } from 'react';
import 'tui-date-picker/dist/tui-date-picker.css';
import Calendar from '@toast-ui/calendar';
import 'tui-time-picker/dist/tui-time-picker.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css'; // Calendar 스타일
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

function CalendarComponent() {
  const calendarRef = useRef(null);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  const event = [];
  const calendarObj = useRef(null);

  function settingDate(calendar){
    setYear(calendar.getDate().getFullYear());
    setMonth(calendar.getDate().getMonth() + 1);
  }

  function remotePrevDate(){
    calendarObj.current.prev();
    settingDate(calendarObj.current);
  }

  function remoteNextDate(){
    calendarObj.current.next();
    settingDate(calendarObj.current);
  }

  function btnToday(){
    calendarObj.current.today();
    settingDate(calendarObj.current);
  }

  function getValue(start, end){
    for(let i = 0; i < event.length; i++){
      const eventStart = event[i]['start'];
      const eventEnd = event[i]['end'];

      if(end >= eventStart){
        console.log(event[i]['title']);
      }
    }
  }

  useEffect(() => {

    const container = calendarRef.current;
    const options = {
      defaultView: 'month',
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Seoul',
            displayLabel: 'Seoul',
          },
        ],
      },
      calendars: [
        {
          id: 'cal1',
          name: '개인',
          
          backgroundColor: '#03bd9e',
        },
        {
          id: 'cal2',
          name: '직장',
          backgroundColor: '#00a9ff',
        },
      ],
    };
    const calendar = new Calendar(container, options);
    calendarObj.current = calendar;
    event.push({
      id: 'event1',
      calendarId: 'cal2',
      title: '주간 회의',
      start: '2024-05-07T09:00:00',
      end: '2024-05-07T10:00:00',
    },
      {
        id: 'event2',
        calendarId: 'cal1',
        title: '점심 약속',
        start: '2024-05-08T12:00:00',
        end: '2024-05-08T13:00:00',
      },
      {
        id: 'event3',
        calendarId: 'cal2',
        title: '휴가',
        start: '2024-05-08',
        end: '2024-05-10T13:00:00',
        isAllday: true,
        category: 'allday',
      },)
    calendar.createEvents(event);

    settingDate(calendar);

    calendar.setOptions({
      useFormPopup: true,
      useDetailPopup: true,
    });

    calendar.on('beforeCreateEvent', (eventObj) => {
      event.push({
        title: eventObj.title,
        start: eventObj.start.toDate().toISOString(),
        end: eventObj.end.toDate().toISOString(),
      });
      
      calendar.createEvents([
        {
          ...eventObj
        },
      ]);
    });

    calendar.on('beforeDeleteEvent', (event) => {
      calendar.deleteEvent(event.id, event.calendarId);
    });

    calendar.on('beforeUpdateEvent', ({ event, change }) => {
      
      console.log(change);
      calendar.updateEvent(event.id, event.calendarId, change);
    });

    calendar.on('selectDateTime', (event) => {
      //console.log(event);
      const { start, end, isAllDay } = event;
      // 선택한 날짜에 대한 정보를 이용하여 원하는 작업 수행
      //console.log('선택한 날짜 정보:', start, end, isAllDay);
      getValue(start.toISOString(), end.toISOString());
    });

    const handleWheel = (event) => {
      let wheel = event.wheelDeltaY;
      if (wheel > 0) {
        calendar.prev();
      } else {
        calendar.next();
      }
      settingDate(calendarObj.current);
    };
    window.addEventListener('wheel', handleWheel);

    return () => {
      if (calendar) {
        calendar.destroy();
      }
      window.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div>
      <button onClick={remotePrevDate}>&lt;</button>
      {year}년{month}월
      <button onClick={remoteNextDate}> &gt;</button>
      <button onClick={btnToday}>오늘</button>
      <div ref={calendarRef} style={{ width: '100%', height: '600px' }}>
      </div>
    </div>
    );
}
export default CalendarComponent;