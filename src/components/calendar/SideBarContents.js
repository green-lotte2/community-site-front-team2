import React from 'react'
import moment from 'moment';

const SideBarContents = ({targetEvent}) => {

    if(targetEvent.length == 0) return <div><h4>일정이 없습니다.</h4></div>;
    
    targetEvent.map((event)=>{
        return(
          <div className='event'>
            <h4>{event['title']}</h4>
            <input type='select'>
    
            </input>
            <p className='date'>
              <input type='datetime-local' defaultValue={moment(event['start']).format().split('+')[0]}/>
              <input type='datetime-local' defaultValue={moment(event['end']).format().split('+')[0]}/>
              </p>
          </div>
        )
      })
}

export default SideBarContents