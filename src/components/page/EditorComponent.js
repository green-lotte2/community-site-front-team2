import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import axios from 'axios';
import url from '../../config/url';
import moment from 'moment/moment';

const EditorComponent = () => {

    /** yjs객체 생성 */
    const doc = new Y.Doc();
    const provider = useRef(null);
    const [title, setTitle] = useState("제목을 입력하세요");
    const [pageList, setPageList] = useState([]);
    const [pageState, setPageState] = useState(false);
    const [pageKey, setPageKey] = useState(0);
    const authSlice = useSelector((state) => state.authSlice);

    useEffect(() => {
        try {
            if (pageKey == 0) {
                console.log("?");
                setTitle("제목을 입력하세요")
                editor.replaceBlocks(editor.document, [{
                    "id": "initialBlockId",
                    "type": "paragraph",
                    "props": {
                        "textColor": "default",
                        "backgroundColor": "default",
                        "textAlignment": "left"
                    },
                    "content": [{ "type": "text", "text": "", "styles": {} }],
                    "children": []
                }])

                return
            }

            axios.get(url.backendUrl + '/page/contents?id=' + pageKey)
                .then((res) => {
                    console.log(res)
                    setTitle(res.data.title)
                    for (let i = 0; i < 1; i++) {
                        const docView = JSON.parse(res.data.document);
                        editor.replaceBlocks(editor.document, docView)
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }


    }, [pageKey])

    /** 소켓 연결 */
    useEffect(() => {
        setPageState(false)
        axios.get(url.backendUrl + '/page?uid=' + authSlice.username)
            .then((res) => {
                setPageList(res.data)
            })
            .catch((e) => {
                console.log(e);
            })

        // 컴포넌트가 마운트될 때 WebrtcProvider를 생성합니다.
        /** WebrtcProvider(방번호, yjs객체, 소켓주소) */
        let roomId = 'room' + pageKey;
        /*
        if (pageKey == 0) {
            roomId = 'room' + moment(new Date()).format("YYMMDDHHMMSS");
        } else {
            roomId = 'room' + pageKey;
        }
            */
        

        if(provider.current != null){
            provider.current.destroy();
        }

        provider.current = new WebrtcProvider(roomId, doc, { signaling: ['wss://api.illrreumbow.store/community/testaa'] });
        // 컴포넌트가 언마운트될 때 provider를 정리합니다.
        console.log(pageList)
        console.log(provider.current)
        return () => {
            provider.current.destroy();
        };
    }, [pageKey, pageState]);

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

    const saveHandler = () => {
        console.log(editor.document)
        const saveDoc = {
            pdId: pageKey,
            uid: authSlice.username,
            title: title,
            document: JSON.stringify(editor.document),
        }
        axios.post(url.backendUrl + '/page', saveDoc)
            .then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
            setPageState(true)
            console.log(pageState)
    }

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    const pageContentHandler = (e) => {
        setPageKey(e.target.value);
    }

    return (
        <>
            <div className='editorSideBar'>
                <h2>페이지 선택</h2>
                <button
                    onClick={pageContentHandler}
                    className={`pageList ${pageKey == 0 ? 'active' : 'inactive'}`}
                    value={0}>
                    새 페이지
                </button>
                {pageList.map((page) => {
                    return (
                        <button
                            onClick={pageContentHandler}
                            className={`pageList ${pageKey == page.id ? 'active' : 'inactive'}`}
                            value={page.id}>
                            {page.title}
                        </button>
                    )
                })}
            </div>
            <div className='pageMain'>
                <input
                    className='title'
                    value={title}
                    onChange={titleHandler}
                />

                <BlockNoteView
                    editor={editor}
                />
                <button onClick={saveHandler}>임시 저장</button>
            </div>
        </>
    )
}

export default EditorComponent