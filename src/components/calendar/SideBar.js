import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import SideBarContents from './SideBarContents';
import axios from 'axios';
import url from '../../config/url';

const SideBar = ({ rightSideHandlerClose, scheduleInfo, targetEvent, calendarObj }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [inputs, setInputs] = useState({
    uid: authSlice.username,
    title: '',
    location: '',
    start: moment(scheduleInfo.start).format().split('+')[0],
    end: moment(scheduleInfo.end).format().split('+')[0],
  })

  const submitHandler = (e) => {
    e.preventDefault();
    
    axios.post(url.backendUrl+'/calendar/insert', inputs)
    .then((Response)=>{
      console.log(Response.data);
      let event = [];
      event.push(Response.data);
      calendarObj(1);
    }).catch((Error)=>{
      console.log(Error);
    });
  }

  const onInputChange = (e) => {
    const { value, name } = e.target;
    console.log(name);
    console.log(value);
    setInputs({
      ...inputs,
      [name]:value,
    })
    console.log(inputs);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const testBox = document.getElementsByClassName("scheduleBox")[0];
      if (testBox) {
        testBox.style.transform += 'translateX(-100%)';
        testBox.style.transition = 'transform 0.5s ease';
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
            <p className='date'>
              <input name='start' onChange={onInputChange} type='datetime-local' defaultValue={moment(scheduleInfo.start).format().split('+')[0]} />
              <input name='end' onChange={onInputChange} type='datetime-local' defaultValue={moment(scheduleInfo.end).format().split('+')[0]} />
            </p>
            <p className='text'><input name='title' type='text' onChange={onInputChange} placeholder='title' /></p>
            <p className='text'><input name='location' type='text' onChange={onInputChange} placeholder='location' /></p>
            <input type='submit' value={'save'} />
          </form>
        </div>
        <div className='eventList'>
          <h2>일정</h2>
          <SideBarContents targetEvent={targetEvent} />
          {targetEvent.map((event) => {
            return (
              <div className='event'>
                <h4>{event['title']}</h4>
                <input type='select'>

                </input>
                <p className='date'>
                  <input type='datetime-local' defaultValue={moment(event['start']).format().split('+')[0]} />
                  <input type='datetime-local' defaultValue={moment(event['end']).format().split('+')[0]} />
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