import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CirclePicker } from 'react-color';
import url from '../../config/url';

const OptionComponents = ({ rightSideHandlerClose, calendars }) => {
    const authSlice = useSelector((state) => state.authSlice);
    const [colorBoxState, setColorBoxState] = useState(false);
    const [listColorBoxState, setListColorBoxState] = useState(false);
    const [color, setColor] = useState('#03bd9e');
    const [target, setTarget] = useState();

    const handleChangeComplete = color => {
        setColor(color.hex);
        setColorBoxState(false);
        console.log(color.hex);
    }

    const colorBoxHandler = () => {
        setColorBoxState(true);
    }

    const handleListChangeComplete = (color, e) => {
        
        console.log(color.hex);
        calendars.map((calendar) => {
            if(calendar.id === target){
                const updateCalendar = {
                    ...calendar,
                    ['backgroundColor']: color.hex,
                };
                console.log(updateCalendar);
            }
        });
        console.log(calendars);
        setListColorBoxState(false);
    }

    const listColorBoxHandler = (e) =>{
        setTarget(e.target.value);
        setListColorBoxState(true);
    }

    useEffect(() => {
        const timeoutId2 = setTimeout(() => {
            const colorBox = document.getElementsByClassName("circle-picker")[0];
            if (colorBox) {
                colorBox.style.transform += 'translateX(-100%)';
                colorBox.style.transition = 'transform 0.5s ease';
            }
        }, 1);

        // Cleanup function to clear the timeout if the component unmounts
        return () => {
            clearTimeout(timeoutId2);
        }
    }, [colorBoxHandler]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const optionBox = document.getElementsByClassName("optionBox")[0];
            if (optionBox) {
                optionBox.style.transform += 'translateX(-100%)';
                optionBox.style.transition = 'transform 0.5s ease';
            }
        }, 1);

        // Cleanup function to clear the timeout if the component unmounts
        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    return (
        <div className='optionBox' onClick={rightSideHandlerClose}>

            <div className='optionContent'>
                <div className='insertForm'>
                    <h2>캘린더 관리</h2>
                    <div className='setCalendar'>
                        <input type='text' name='calName' placeholder='name' />
                        <button className='colorBtn' onClick={colorBoxHandler} style={{ width: '25px', height: '25px', backgroundColor: color }}>&nbsp;</button>
                    </div>
                </div>
                <div className='calendarList'>
                    {calendars.map((calendar) => {
                        return(
                            <div>
                                <input type='text' value={calendar.name}/>
                                <button value={calendar.id} className='colorBtn' onClick={listColorBoxHandler} style={{ width: '25px', height: '25px', backgroundColor: calendar.backgroundColor }}>&nbsp;</button>
                            </div>
                        )
                    })}
                </div>


                {colorBoxState && <CirclePicker onChangeComplete={handleChangeComplete} />}
                {listColorBoxState && <CirclePicker onChangeComplete={handleListChangeComplete} />}

            </div>
        </div>
    )
}

export default OptionComponents