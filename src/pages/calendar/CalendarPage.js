import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DefaultLayout from '../../layouts/DefaultLayout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../styles/calendar.scss";


const CalendarPage = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [value, setValue] = useState(new Date());
    const mark = ['24-05-2024', '26-05-2024']

    function getDatesStartToLast(startDate, lastDate) {

        var result = [];
        var curDate = new Date(startDate);
        while(curDate <= new Date(lastDate)) {
            result.push(curDate.toISOString().split("T")[0]);
            console.log(curDate.getDate());
            curDate.setDate(curDate.getDate() + 1);
        }
        return result;
    }

    const clickButton = () =>{

        

        const dateRange = getDatesStartToLast(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('DD-MM-YYYY'));
        alert(dateRange);
        setStartDate("");
        setEndDate("");
        //window.location.reload();
    }

    const changeDate = e => {
        // event를 받아서 yyyy/mm/dd 형식으로 일자를 포맷팅해줌
        // e[0]은 사용자가 여행 일자로 선택한 시작 일자가 들어감
        // e[1]은 사용자가 여행 마치는 일자로 선택한 일자가 들어감 
        const startDateFormat = moment(e[0]).format("YYYY/MM/DD");
        const endDateFormat = moment(e[1]).format("YYYY/MM/DD");
        // 여행 시작일자와 마치는일자의 값이 변할 때마다 값을 다시 세팅해줌
        setStartDate(startDateFormat);
        setEndDate(endDateFormat);
        
    };
    
    return (
        <DefaultLayout>
            <h4 >Test</h4>
            <Calendar
                onChange={changeDate}
                selectRange={true} // 적용된 부분
                
                formatDay={(locale, date) => moment(date).format("DD")}
                tileClassName={({date, view})=>{
                    if(mark.find(x => x === moment(date).format('DD-MM-YYYY'))){
                        return 'highlight'
                    }
                }}
            />
            <div className='textBox'>
                <input
                    type="text"
                    className="w-full p-2 text-sm border-b-2 border-green1 outline-none opacity-70 my-5 bg-transparent"
                    placeholder="시작 날짜를 입력해주세요"
                    value={startDate || ""}
                    disabled
                />
                <br/>
                <input
                    type="text"
                    className="w-full p-2 text-sm border-b-2 border-green1 outline-none opacity-70 bg-transparent"
                    placeholder="종료 날짜를 입력해주세요"
                    value={endDate || ""}
                    disabled
                />
                <br/>
                <input type='text'/>
                <br/>
                <button
                type='submit'
                onClick={clickButton}
                >dd</button>
            </div>

        </DefaultLayout>
    )
}

export default CalendarPage