import { useEffect, useState } from "react";
import "./FormComponent.css"


export const FormComponent = () => {
    // DRAG & DROP
    const [drag, setDrag] = useState(false);
    // uploaded file
    const [files, setFiles] = useState<FileList>();
    const [fileDataUrl, setFileDataUrl] = useState<string>('');

    // useEffect(() => {
    //     if (files){
    //         const reader = new FileReader();

    //         reader.addEventListener("load", () => {
    //             setFileDataUrl(reader.result as string);
    //         });

    //         reader.readAsDataURL(files);
    //     }
    // }, [files])

    const handleFileUpload = (e: any) => {
        const files = e.target.files;
        setFiles(files);
        console.log(files)
    }

    return(
        <div className="form-conponent">
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
                                <div>
                                    <label>Selected files: {files.length}</label>
                                    <div className="files-name-box">
                                        {Array.from(files).map(item => <label className="file-name">{item.name}</label>)}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}