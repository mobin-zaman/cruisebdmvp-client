import * as axios from "axios";
import {BASE_URL} from "./base-url";


export default async function getShipData() {
    
    console.log("Is it executing:?");

    const shipDataEndpoint = `${BASE_URL}/booking/ships`;

    try{
    const response = await axios.get(shipDataEndpoint);
    // console.log("response: ", response.data);

    return response.data;

    } catch(e) {
        console.log("error: getShipData(): ", e);
        throw e;
    }

}