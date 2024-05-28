import React, { useEffect, useState } from 'react'
import moment from 'moment';
import SideBar from './SideBar';
import axios from 'axios';
import url from '../../config/url';

const Test = ({ rightSideHandlerClose, scheduleInfo, targetEvent }) => {

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('aa');
    console.log(`${url.backendUrl}+???`)
    axios.get(url.backendUrl).then((Response)=>{
      console.log(Response.data);
    }).catch((Error)=>{
      console.log(Error);
    });
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
              <input type='datetime-local' defaultValue={moment(scheduleInfo.start).format().split('+')[0]} />
              <input type='datetime-local' defaultValue={moment(scheduleInfo.end).format().split('+')[0]} />
            </p>
            <p className='text'><input type='text' placeholder='title' /></p>
            <p className='text'><input type='text' placeholder='location' /></p>
            <input type='submit' value={'save'} />
          </form>
        </div>
        <div className='eventList'>
          <h2>일정</h2>
          <SideBar targetEvent={targetEvent} />
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

export default Test