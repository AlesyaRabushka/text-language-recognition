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


    static async startProcessing() {
        try {
            const response = await $host.post('/get-results', {});

            // response.data?
            return response;
        } catch (error) {
            console.log('[Client Service] getResult error', error);

            throw error;
        }
    }
}