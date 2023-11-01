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
            const fd = new FormData();
            for (let i = 0; i < files.length; i++){
                fd.append(`file${i}`, files[i]);
            }
            console.log(fd)

            // const response = await $host.post('/file-processing', {fd});

            // return response.data;

            const arr = [
                {name:"file.pdf", result:"такой-то язык такое-то сходство"},
                {name:"file2.pdf", result:"такой-то язык такое-то сходство"}
            ]

            return arr;
        } catch (error) {
            console.log('[Client Service] getResult error', error);

            throw error;
        }
    }
}