import * as axios from  'axios';

import {BASE_URL} from "./base-url";


export default async function bookSeat(routeId, seatCategoryId, departureDate, seatIds, customerName,mobileNumber) {
    const requestBody = {
        routeId,
        seatCategoryId,
        departureDate,
        seatIds,
        customerName,
        mobileNumber
    }

    const requestUrl = `${BASE_URL}/booking/seat-book/`;

    const response = await axios.post(requestUrl, requestBody);

    // console.log("Response: ",response);
    return response.data;
}

