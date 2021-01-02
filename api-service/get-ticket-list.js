import * as axios from  'axios';

import {BASE_URL} from "./base-url";
import {bearerTokenCreator} from "./util";

export default async function getTicketList(bearerToken) {

    const requestUrl = `${BASE_URL}/ticket/`;

    try{

    const authorizationHeader = bearerTokenCreator(bearerToken);

    const response = await axios.get(requestUrl, {
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

