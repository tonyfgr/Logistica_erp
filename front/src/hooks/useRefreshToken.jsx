import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth()

    const refresh = async () => {
        
        const response = await axios.get('api/refresh/', {
            withCredentials: true
        })    

        //"..." operator is for unstructuring our array
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken}
        })

        return response.data.accessToken
        
    }

    return refresh

}

export default useRefreshToken