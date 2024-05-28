import React, { useEffect } from 'react'
import moment from 'moment';

const Test = ({ rightSideHandlerClose, scheduleInfo, targetEvent }) => {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          const testBox = document.getElementsByClassName("scheduleBox")[0];
          if (testBox) {
            testBox.style.transform += 'translateX(-100%)';
            testBox.style.transition = 'transform 0.5s ease';
          }
        }, 1);

        for(let i = 0; i < targetEvent.length; i++){

        }
    
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
      }, []);

  return (
    <div className='scheduleBox' onClick={rightSideHandlerClose}>
        <div className='scheduleContent'>
          <div className='insertForm'>
            <h2>일정 등록</h2>
            <form>
            <p className='date'><input type='datetime-local' value={moment(scheduleInfo.start).format().split('+')[0]}/> <input type='datetime-local' value={moment(scheduleInfo.end).format().split('+')[0]}/></p>
            <p className='text'><input type='text' placeholder='title'/></p>
            <p className='text'><input type='text' placeholder='location'/></p>
            </form>
          </div>
          <div className='eventList'>
            <h2>일정</h2>
            {targetEvent.map((event)=>{
              return(
                <div className='event'>
                  <h4>{event['title']}</h4>
                  <input type='select'>
                    
                  </input>
                  <p className='date'><input type='datetime-local' value={moment(event['start']).format().split('+')[0]}/> <input type='datetime-local' value={moment(event['end']).format().split('+')[0]}/></p>
                </div>
              )
            })}

          </div>
        </div>
    </div>
  )
}

export default Test