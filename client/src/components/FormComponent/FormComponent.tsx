import { useEffect, useRef, useState } from "react";
import "./FormComponent.css"
import userEvent from "@testing-library/user-event";
import { ClockLoader } from "react-spinners";
import fileDownload from "js-file-download";
import ClientServer from "../../clientService/client.service";
import PDF from "../../helpers/pdf";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { title } from "process";


export const FormComponent = () => {
    // DRAG & DROP
    const [drag, setDrag] = useState(false);
    // uploaded file
    const [files, setFiles] = useState<FileList>();
    const [fileDataUrl, setFileDataUrl] = useState<string>('');

    // spinner and processing
    const [pressed, setPressed] = useState(false);
    // show START button and helper text
    const [showText, setShowText] = useState(true);
    // show pspinner
    const [spinner, setSpinner] = useState(false);
    // shown load text
    const [currentText, setCurrentText] = useState('Loading...');

    // results
    const [result, setResult] = useState<string>('');
    // results boolean
    const [ifResults, setIfResults] = useState(true);


    const text = ['Loading...','чтобы', 'не было', 'скучно'];
    let index = 0;

    useEffect(() => {
        const interval = setInterval(() => {
        if (index == text.length){
            index = 0;
        }
          setCurrentText(text[index]);
          index ++;
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);


    document.body.addEventListener('keydown', (event:any) => {
        if (event.key == 'Enter'){
            setPressed(true);
            setShowText(false);
            setSpinner(true);
            handleFileUpload(event);
        }
    })

    const handleFileUpload = async (e: any) => {
        const files = e.target.files;
        setFiles(files);

        // ?
        const result = await ClientServer.uploadFiles();
    }

    // start processing
    const handleStart = async () => {
        setPressed(true);
        setShowText(false);
        setSpinner(true);
        
        const result = await ClientServer.uploadFiles();
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
                            

                            // check for pdf
                            let fileName = files[0].name;
                            const lastDot = fileName.lastIndexOf('.');
                            const ext = fileName.substring(lastDot + 1);
                            if (ext == 'pdf'){
                                setFiles(files);
                            }

                            
                            setDrag(false);
                        }}
                    >
                        Отпустите файл
          
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
                        Перенесите pdf-файлы сюда или нажмите на кнопку
                        <div className="input-box">
                            <label htmlFor="input-file" className="input-file-button">Выбрать файлы</label>
                            <input type="file" name="file" id="input-file" className="input" onChange={handleFileUpload} accept="application/pdf" multiple/>
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
                    <label className="label-button" onClick={handleStart}>START</label>
                    <label className="text-helper">Нажмите на кнопку START или нажмите ENTER</label>
                </div>
            }

            { ifResults ?
                <>
                    <div className="results-box">
                        {result}
                    </div>
                
                    <button type="button" className="input-file-button">
                        <PDFDownloadLink document={<PDF props={{title:'Results', text: `${result}`}} />} fileName="result" style={{textDecoration:"none", color:"white"}}>
                            Сохранить результат
                        </PDFDownloadLink>
                    </button>
                
                </>
            :
                spinner &&
                    <>
                        <div className="spinner">
                            <ClockLoader size={200} color="rgb(96, 11, 129)"/>
                        </div> 
                        <label className="text-helper">{currentText}</label>
                    </>
            }
        </div>
    )
}