import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import SideBarContents from './SideBarContents';
import axios from 'axios';
import url from '../../config/url';

const SideBar = ({ rightSideHandlerClose, scheduleInfo, targetEvent, setEvents }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [target, setTarget] = useState(targetEvent);
  const [inputs, setInputs] = useState({
    uid: authSlice.username,
    calendarId: 'cal1',
    title: '',
    location: '',
    start: moment(scheduleInfo.start).format().split('+')[0],
    end: moment(scheduleInfo.end).format().split('+')[0],
  });

  const updateRef = useRef({
    id: 0,
    calendarId: '',
    uid: authSlice.username,
    title: '',
    location: '',
    start: moment(scheduleInfo.start).format().split('+')[0],
    end: moment(scheduleInfo.end).format().split('+')[0],
  });

  const onInputChange = (e) => {
    const { value, name } = e.target;
    console.log(name);
    console.log(value);
    setInputs({
      ...inputs,
      [name]: value,
    });
    
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(url.backendUrl + '/calendar/insert', inputs)
      .then((Response) => {
        console.log(Response.data);
        let event = [];
        event.push(Response.data);
        setEvents(1);
      }).catch((Error) => {
        console.log(Error);
      });

  }

  const onUpdateChange = (e) => {
    const { value, name } = e.target;
    const key = e.target.dataset.name;
    
    target.map((event, index) => {
      if (event.id == key) {
        console.log(event);
        target[index] = {
          ...event,
          [name]: value,
        };
        console.log(event);
      }
      
    });
    setTarget(target);
    console.log(target);
  }

  const updateBtnHandler = (e) => {

    const targetId = e.target.value;
    target.map((event) => {
      if (event.id == targetId) {
        console.log(event);

        updateRef.current = {
          id: event.id,
          calendarId: event.calendarId,
          uid: authSlice.username,
          title: event.title,
          location: event.location,
          start: moment(event.start).format().split('+')[0],
          end: moment(event.end).format().split('+')[0],
        };
      }
    });
    console.log(updateRef.current);
    axios.post(url.backendUrl + '/calendar/insert', updateRef.current)
      .then((Response) => {
        console.log(Response.data);
        setEvents(1);
      }).catch((Error) => {
        console.log(Error);
      });

  }

  const deleteBtnHandler = (e) => {
    const targetId = parseInt(e.target.value);
    console.log(targetId);
    if (window.confirm('삭제 하시겠습니까?')) {
      axios.delete(url.backendUrl + '/calendar/delete?delId=' + targetId)
        .then((Response) => {
          console.log(Response.data);
          setEvents(1);
        }).catch((Error) => {
          console.log(Error);
        });
    }

  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const scheduleBox = document.getElementsByClassName("scheduleBox")[0];
      if (scheduleBox) {
        scheduleBox.style.transform += 'translateX(-100%)';
        scheduleBox.style.transition = 'transform 0.5s ease';
      }
    }, 1);


    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (

    <div className='scheduleBox' onClick={rightSideHandlerClose}>
      <div className='scheduleContent'>
        <div className='insertForm'>
          <h2>일정 등록</h2>
          <form onSubmit={submitHandler}>
            <select name='calendarId' onChange={onInputChange}>
              <option value={'cal1'}>개인</option>
              <option value={'cal2'}>직장</option>
            </select>
            <p className='date'>
              <input name='start' onChange={onInputChange} type='datetime-local' defaultValue={moment(scheduleInfo.start).format().split('+')[0]} />
              <input name='end' onChange={onInputChange} type='datetime-local' defaultValue={moment(scheduleInfo.end).format().split('+')[0]} />
            </p>
            <p className='text'><input name='title' type='text' onChange={onInputChange} placeholder='&#128221;title' /></p>
            <p className='text'><input name='location' type='text' onChange={onInputChange} placeholder='&#128681;location' /></p>
            <input type='submit' value={'save'} />
          </form>
        </div>
        <div className='eventList'>
          <h2>일정</h2>
          <SideBarContents targetEvent={targetEvent} />
          {targetEvent.map((event) => {
            return (
              <div className='event'>
                <input name='title' type='text' data-name={event.id} onChange={onUpdateChange} defaultValue={event['title']} />
                <input name='location' type='text' data-name={event.id} onChange={onUpdateChange} defaultValue={event['location']} />
                <select name='calendarId' data-name={event.id} onChange={onUpdateChange} defaultValue={event.calendarId}>
                  <option value={'cal1'}>개인</option>
                  <option value={'cal2'}>직장</option>
                </select>
                <button value={event.id} onClick={deleteBtnHandler}>삭제</button>
                <button value={event.id} onClick={updateBtnHandler}>수정</button>
                <p className='date'>
                  <input type='datetime-local' data-name={event.id} name='start' onChange={onUpdateChange} defaultValue={moment(event['start']).format().split('+')[0]} />
                  <input type='datetime-local' data-name={event.id} name='end' onChange={onUpdateChange} defaultValue={moment(event['end']).format().split('+')[0]} />
                </p>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default SideBar