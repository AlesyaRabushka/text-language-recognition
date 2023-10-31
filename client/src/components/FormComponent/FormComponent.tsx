import { useEffect, useRef, useState } from "react";
import "./FormComponent.css"
import userEvent from "@testing-library/user-event";
import { ClockLoader } from "react-spinners";


export const FormComponent = () => {
    // DRAG & DROP
    const [drag, setDrag] = useState(false);
    // uploaded file
    const [files, setFiles] = useState<FileList>();
    const [fileDataUrl, setFileDataUrl] = useState<string>('');

    // spinner and proccesing
    const [pressed, setPressed] = useState(false);
    // show START button and helper text
    const [showText, setShowText] = useState(true);
    // show pspinner
    const [spinner, setSpinner] = useState(false);


    // useEffect(() => {
    //     if (files){
    //         const reader = new FileReader();

    //         reader.addEventListener("load", () => {
    //             setFileDataUrl(reader.result as string);
    //         });

    //         reader.readAsDataURL(files);
    //     }
    // }, [files])


    document.body.addEventListener('keydown', (event:any) => {
        if (event.key == 'Enter'){
            setPressed(true);
            setShowText(false);
            setSpinner(true);
            // onSubmit(e);
        }
    })

    const handleFileUpload = (e: any) => {
        const files = e.target.files;
        setFiles(files);
        console.log(files)
    }


    return(
        <div className="form-component">
             {/* ----- DRAG & DROP area */}
             {drag ?
                    <div className="drag-area"
                        onDragStart={e => {
                            e.preventDefault();
                            setDrag(true);
                        }}
                        onDragLeave={e => {
                            e.preventDefault();
                            setDrag(false)
                        }}
                        onDragOver={e => {
                            e.preventDefault();
                            setDrag(true);
                        }}
                        onDrop={e => {
                            e.preventDefault();
                            let files = e.dataTransfer.files;
                            setFiles(files)
                            setDrag(false);
                        }}
                    >
                        Отпустите картинку
          
                    </div>
                : <div className="drag-area"
                        onDragStart={e => {
                            e.preventDefault();
                            setDrag(true);
                        }}
                        onDragLeave={e => {
                            e.preventDefault();
                            setDrag(false)
                        }}
                        onDragOver={e => {
                            e.preventDefault();
                            setDrag(true);
                        }}
                        >
                        Перенесите файлы сюда или нажмите на кнопку
                        <div className="input-box">
                            <label htmlFor="input-file" className="input-file-button">Выбрать файлы</label>
                            <input type="file" name="file" id="input-file" className="input" onChange={handleFileUpload} multiple/>
                            {
                                files && 
                                <div className="files-box">
                                    <label>Selected files: {files.length}</label>
                                    <div className="files-name-box">
                                        {Array.from(files).map(item => <label>{item.name}</label>)}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                 }
            {showText && 
                <div className="helper-labels">
                    <label className="label-button">START</label>
                    <label className="text-helper">Нажмите на кнопку START или нажмите ENTER</label>
                </div>
            }

            {spinner &&
                <div className="spinner">
                    <ClockLoader size={200} color="rgb(96, 11, 129)"/>
                </div> 
            }
        </div>
    )
}