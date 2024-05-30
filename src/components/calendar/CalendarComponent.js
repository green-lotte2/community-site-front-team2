import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css'; // Calendar 스타일
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Calendar from '@toast-ui/calendar';
import moment from 'moment/moment';
import SideBar from './SideBar';
import axios from 'axios';
import url from '../../config/url';

function CalendarComponent() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState(0);
  const [date, setDate] = useState('');
  const [targetEvent, setTargetEvent] = useState([]);
  const [rightSideBar, setRightSideBar] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState({
    "scheduleTitle": "bb",
    "scheduleId": "aa",
    "start": '2024-05-07T09:00:00',
    "end": '2024-05-07T10:00:00',
  });

  const event = [];
  const calendarObj = useRef(null);
  const authSlice = useSelector((state) => state.authSlice);


  const rightSideHandler = () => {
    return setRightSideBar(true);
  }
  const rightSideHandlerClose = (event) => {
    const scheduleBox = document.getElementsByClassName("scheduleBox")[0];
    if (event.target === scheduleBox) {
      return setRightSideBar(false);

    }
  }

  function settingDate(calendar) {
    setDate(moment(calendar.getDate().toDate()).format('YYYY-MM'));
  }

  function remotePrevDate() {
    calendarObj.current.prev();
    settingDate(calendarObj.current);
  }

  function remoteNextDate() {
    calendarObj.current.next();
    settingDate(calendarObj.current);
  }

  function btnToday() {
    calendarObj.current.today();
    settingDate(calendarObj.current);
  }

  const changeMonthHandler = (event) => {
    calendarObj.current.setDate(event.target.value);
    settingDate(calendarObj.current);
  }
  /** 선택한 날짜 이벤트 조회 */
  function getValue(start, end) {
    let eventList = [];
    for (let i = 0; i < event.length; i++) {
      const eventStart = event[i]['start'];
      const eventEnd = event[i]['end'];
      if (start == end) {
        end = moment(end).add(1, "d").format();
        end = moment(end).add(-1, "s").format();
      }
      if (end >= eventStart && start < eventEnd) {
        console.log(event[i]['title']);
        eventList.push(event[i]);
      }
    }
    return eventList;
  }

  useEffect(() => {
    /** 초기값 설정(evets값 변경 감지, 사이드바 제거) */
    setEvents(0);
    setRightSideBar(false);

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
    /** 스케줄 목록 조회 */
    axios.get(url.backendUrl + '/calendar')
      .then((Response) => {
        Response.data.forEach(element => {
          const type = {
            id: element.id.toString(),
            calendarId: element.calendarId,
            title: element.title,
            start: element.start,
            end: element.end,
          }
          event.push(type);
        });
        calendar.createEvents(event);
      }).catch((Error) => {
        console.log(Error);
      });
    settingDate(calendar);

    calendar.on('selectDateTime', (event) => {
      const { start, end, isAllDay } = event;
      let defaultEnd
      defaultEnd = moment(end).add(1, "d").format();
      defaultEnd = moment(defaultEnd).add(-1, "s").format();
      setScheduleInfo({
        "scheduleTitle": "bb",
        "scheduleId": "aa",
        "start": start.toString(),
        "end": defaultEnd.toString(),
      });

      setTargetEvent(getValue(moment(start).format(), moment(end).format()));

      setRightSideBar(true);
      calendar.clearGridSelections();
    });

    calendar.on('beforeUpdateEvent', ({ event, changes }) => {
      
      calendar.updateEvent(event.id, event.calendarId, changes);
      const keys = Object.keys(changes);
      console.log(event);
      keys.forEach((key)=>{

        event[key] = changes[key];


        console.log(key);
        console.log(changes[key]);
      });
      const schedule = {
        uid: authSlice.username,
        id: event.id,
        calendarId: event.calendarId,
        title: event.title,
        start: event.start.toDate(),
        end: event.end.toDate(),
      };
      /*
        axios.post(url.backendUrl + '/calendar/insert', )
        .then((Response) => {
          console.log(Response.data);
          calendarObj(1);
        }).catch((Error) => {
          console.log(Error);
        });

*/
      console.log(schedule);
      console.log(changes)
      
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
  }, [events]);

  return (
    <div className='calendar'>
      <button onClick={remotePrevDate}>&lt;</button>
      <input type='month' onChange={changeMonthHandler} value={date} />
      <button onClick={remoteNextDate}> &gt;</button>
      <button onClick={btnToday}>오늘</button>
      <div ref={calendarRef} style={{ width: '100%', height: '600px' }}>
      </div>
      {rightSideBar && <SideBar rightSideHandlerClose={rightSideHandlerClose} calendarObj={setEvents} targetEvent={targetEvent} scheduleInfo={scheduleInfo}></SideBar>}

    </div>
  );
}
export default CalendarComponent;