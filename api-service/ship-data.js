import * as axios from "axios";
import {BASE_URL} from "./base-url";


export default async function getShipData(bearerToken) {
    

    console.log("Bearer token: ", bearerToken);

    const shipDataEndpoint = `${BASE_URL}/booking/ships`;

    try{

    const authorizationHeader = `Bearer ${bearerToken}`;

    const response = await axios.get(shipDataEndpoint, {
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