import React, { useEffect, useRef } from 'react';
import 'tui-date-picker/dist/tui-date-picker.css';
import Calendar from '@toast-ui/calendar';
import 'tui-time-picker/dist/tui-time-picker.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css'; // Calendar 스타일
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

function CalendarComponent() {
  const calendarRef = useRef(null);

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

      ],
    };
    const calendar = new Calendar(container, options);

    calendar.createEvents([
      {
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
        end: '2024-05-10',
        isAllday: true,
        category: 'allday',
      },
    ]);

    calendar.setOptions({
      useFormPopup: true,
      useDetailPopup: true,
    });

    calendar.on('beforeUpdateEvent', ({ event, change }) => {
      calendar.updateEvent(event.id, event.calendarId, change);
    });

    return () => {
      if (calendar) {
        calendar.destroy();
      }
    }

  }, []);

  return <div ref={calendarRef} style={{ width: '100%', height: '100%' }}></div>;
}
export default CalendarComponent;