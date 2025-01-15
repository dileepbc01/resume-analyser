import { ApplicationRoutes } from "@/types/routes/application.route"
import { api } from "../axios"

export const applicationApi = {
    uploadResumeFiles:async({form,upload_id}:{upload_id:string,form:FormData})=>{
        const {data}=await api.post<ApplicationRoutes['/application/upload']>('/application/upload',form,{
            headers:{
                "upload-id":upload_id
            }
        });
        return data
    }
}