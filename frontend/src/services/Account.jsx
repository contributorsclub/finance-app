import axios from "axios";

const URL = "http://localhost:5000/api/account";

export const getAccount = async()=>{
    const response = await axios.get(`${URL}`, {withCredentials: true});
}


