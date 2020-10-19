import * as axios from "axios";

import {BASE_URL} from "./base-url";

export default async function getSeatInfo(routeId, departureDate) {
    

    const seatInfoEndPoint = `${BASE_URL}/booking/seat-status`;

    const param = {
        routeId, 
        departureDate
    }

    console.log("this is the param: ", param)

    try{
    const response = await axios.post(seatInfoEndPoint,param);
    // console.log("response: ", response.data);

    return response.data;

    } catch(e) {
        console.log("error: getShipData(): ", e);
    }

}