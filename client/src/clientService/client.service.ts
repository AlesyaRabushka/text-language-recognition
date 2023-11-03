import $host from "../http/http";


export default class ClientService{
    // static async uploadFiles(){
    //     try {
    //         const response = await $host.post('/upload', {});

    //         // ?
    //         return response;
    //     } catch (error) {
    //         console.log('[Client Service] error', error);

    //         throw error;
    //     }
    // } 


    static async startProcessing(files:Array<File>) {
        try {
            const filesData = new FormData();
            for (let i = 0; i < files.length; i++){
                filesData.append(`file${i}`, files[i]);
            }
            console.log('file data',files)

            const response = await $host.post('/file-processing', files);

            return response.data;
        } catch (error) {
            console.log('[Client Service] startProcessing error', error);

            throw error;
        }
    }

    static async generatePdfData(resultData: Array<any>){
        try {
            const result = await $host.post('/generate-pdf-data', resultData);

            return result.data;
        } catch (error) {
            console.log('[Client Service] generatePdfData error', error);

            throw error;
        }
    }
}