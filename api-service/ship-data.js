import * as axios from "axios";

const BASE_URL = "http://192.168.0.100:4000";

export default async function getShipData() {
    
    console.log("Is it executing:?");

    const shipDataEndpoint = `${BASE_URL}/booking/ships`;

    try{
    const response = await axios.get(shipDataEndpoint);
    // console.log("response: ", response.data);

    return response.data;

    } catch(e) {
        console.log("error: getShipData(): ", e);
    }

}