import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout';
import EditorComponent from '../../components/page/EditorComponent';
import "../../styles/page.scss";
const Page = () => {



    return (
        <DefaultLayout>
            <div id='page'>
            <EditorComponent/>
            </div>
            
        </DefaultLayout>
    )
}

export default Page