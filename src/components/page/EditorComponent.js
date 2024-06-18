import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import "@blocknote/core/fonts/inter.css";
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import axios from 'axios';
import url from '../../config/url';

const EditorComponent = () => {

    /** yjs객체 생성 */
    const doc = new Y.Doc();
    const provider = useRef(null);
    const [title, setTitle] = useState("제목을 입력하세요");
    const [pageList, setPageList] = useState([]);
    const authSlice = useSelector((state) => state.authSlice);

    useEffect(() => {

    }, []);

    /** 소켓 연결 */
    useEffect(() => {
        // 컴포넌트가 마운트될 때 WebrtcProvider를 생성합니다.
        /** WebrtcProvider(방번호, yjs객체, 소켓주소) */
        provider.current = new WebrtcProvider('test111111', doc, { signaling: ['wss://api.illrreumbow.store/community/testaa'] });
        // 컴포넌트가 언마운트될 때 provider를 정리합니다.

        return () => {
            provider.current.destroy();
        };
    }, []);

    const [blocks, setBlocks] = useState([]);

    /** 에디터 설정 */
    const editor = useCreateBlockNote({
        defaultStyles: true,
        uploadFile: (file) => Promise.resolve(''),
        collaboration: {
            provider: provider.current,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: "My Username",
                color: "#ff0000",
            },
        },
    });


    const click = () => {
        console.log(editor.document)
        const saveDoc = {
            
            uid: authSlice.username,
            title: title,
            document: JSON.stringify(editor.document),
        }
        axios.post(url.backendUrl+'/page', saveDoc)
        .then((res)=>{
            console.log(res)
        }).catch((e)=>{
            console.log(e)
        })
    }

    const titleHandler = (e) =>{
        setTitle(e.target.value);
        console.log(title);
    }

    return (
        <div className='pageMain'>
            <input
            className='title'
            value={title}
            onChange={titleHandler}
            />

            <BlockNoteView
                editor={editor}
            />
            <button onClick={click}>임시 저장</button>
        </div>
    )
}

export default EditorComponent