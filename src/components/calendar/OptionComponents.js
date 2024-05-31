import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CirclePicker } from 'react-color';
import url from '../../config/url';

const OptionComponents = ({ rightSideHandlerClose }) => {
    const authSlice = useSelector((state) => state.authSlice);
    const [colorBoxState, setColorBoxState] = useState(false)
    const [color, setColor] = useState('#000');

    const handleChangeComplete = color => {
        setColor(color.hex);
        setColorBoxState(false);
        console.log(color.hex);
    }

    const colorBoxHandler = () => {
        setColorBoxState(true);
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
                        <input type='text' name='calName' />
                        <button onClick={colorBoxHandler} style={{backgroundColor: color}}>dd</button>
                    </div>
                </div>


                {colorBoxState && <CirclePicker
                    onChangeComplete={handleChangeComplete}
                />}

            </div>
        </div>
    )
}

export default OptionComponents