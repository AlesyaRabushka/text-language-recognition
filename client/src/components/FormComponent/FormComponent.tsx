import { useEffect, useRef, useState } from "react";
import "./FormComponent.css"
import { ClockLoader } from "react-spinners";
import ClientService from "../../clientService/client.service";
import PDF from "../../helpers/pdf";

import { PDFDownloadLink, pdf } from "@react-pdf/renderer";


export const FormComponent = () => {
    // DRAG & DROP
    const [drag, setDrag] = useState(false);
    // uploaded file
    const [files, setFiles] = useState<Array<File>>([]);
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
    const [result, setResult] = useState<any>([{}]);
    // for pdf results
    const [pdfResult, setPdfResult] = useState<string>('');
    // results boolean
    const [ifResults, setIfResults] = useState(false);
    // show file text or do not
    const [showFileText, setShowFileText] = useState(false);


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
            handleStart();
        }
    })

    const handleFileUpload = async (e: any) => {
        const files = e.target.files;
        setFiles(files);
    }

    // start processing
    const handleStart = async () => {
        setPressed(true);
        setShowText(false);
        setSpinner(true);

        
        const results = await ClientService.startProcessing(files);
        
        setResult(() => results);
        setIfResults(true);
        setSpinner(false);
        console.log(result);
        
        const pdfResponse = await ClientService.generatePdfData(results);
        setPdfResult(() => pdfResponse);
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
                            
                            const arr: Array<File> = []
                            for (let i = 0; i < files.length; i++){
                                console.log(files[i].type)
                                if (files[i].type == 'application/pdf'){
                                    arr.push(files[i]);
                                }
                            }
                            setFiles(arr);
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
                    {showFileText ? 
                        <label className="show-text-button" onClick={e => setShowFileText(!showFileText)}>Hide files content</label> 
                        : 
                        <label className="show-text-button" onClick={e => setShowFileText(!showFileText)}>Show files content</label>
                    }
                    <div className="results-box">
                        {result.map((item:any) => 
                            <div className="result-item">
                                <label style={{fontSize: "1.5em"}}>{item.name}</label>
                                <label>{item.result}</label>
                                {
                                    showFileText && <label>{item.text}</label>
                                }
                            </div>
                            
                        )}
                    </div>
                
                    <button type="button" className="input-file-button">
                        <PDFDownloadLink document={<PDF props={{title:'Results', result: pdfResult}} />} fileName="text-recognition-result" style={{textDecoration:"none", color:"white"}}>
                            Сохранить результат в PDF
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