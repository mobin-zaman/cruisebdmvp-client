import * as axios from  'axios';

import {BASE_URL} from "./base-url";
import {bearerTokenCreator} from "./util";

export default async function bookSeat(routeId, seatCategoryId, departureDate, seatIds, customerName,mobileNumber, bearerToken) {
    const requestBody = {
        routeId,
        seatCategoryId,
        departureDate,
        seatIds,
        customerName,
        mobileNumber
    }

    const requestUrl = `${BASE_URL}/booking/seat-book/`;

    try{
        const authorizationHeader = bearerTokenCreator(bearerToken);



    const response = await axios.post(requestUrl, requestBody, {
        headers: {
            authorization: authorizationHeader
        }
    });

    // console.log("Response: ",response);
    return response.data;
    } catch(e) {
        console.log("error: bookSeat(): ", e);
        throw e;
    }
}

