import * as axios from "axios";
import {bearerTokenCreator} from "./util";

import {BASE_URL} from "./base-url";

export default async function getSeatInfo(routeId, departureDate, bearerToken) {
    

    const seatInfoEndPoint = `${BASE_URL}/booking/seat-status`;

    const param = {
        routeId, 
        departureDate
    }

    console.log("this is the param: ", param)

    try{

        const authorizationHeader = bearerTokenCreator(bearerToken);
    const response = await axios.post(seatInfoEndPoint,param, {
        headers: {
            authorization: authorizationHeader
        }
    });
    // console.log("response: ", response.data);

    return response.data;

    } catch(e) {
        console.log("error: getShipData(): ", e);
    }

}