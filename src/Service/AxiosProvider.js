import { useEffect } from "react";
import { apiService } from "./Api";

const AxiosProvider=({children})=>{    
    
    useEffect(()=>{
        CreateInterceptor();
    },[])

    const CreateInterceptor=()=>{
        apiService.interceptors.request.use(
            (req) => {
               return req;
            },
            (err) => {
               return Promise.reject(err);
            }
         );
         
         apiService.interceptors.response.use(
            (res) => {
               if (res.status === 200) {
                  console.log('Posted Successfully');
               }
               return res;
            },
            (err) => {
               return Promise.reject(err);
            }
         );
    }

    return children
}
export default AxiosProvider;
