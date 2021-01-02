import bookSeat from "../../api-service/book-seat";import nookies from 'nookies';
import { Button } from 'semantic-ui-react'
import Router from 'next/router';
import {BASE_URL} from '../../api-service/base-url'

function GetTicketPage({ data }) {


    const downloadTicketHandler = () => {
        Router.push(`${BASE_URL}/ticket/${data.ticketId}/pdf`);
    }
    
    console.log("Data: ", data);
    return (
        <div>
            Your ticket is ready
             <Button positive onClick={downloadTicketHandler}>Download Ticket</Button>
        </div>
    )
}



export async function getServerSideProps(ctx) {

    //first let's get all the data from the query parameters
    // const {query} = ctx;

    // console.log("Get ticket getServerSideProps: query: ",query);

    // console.log("query in getServerSideProps: ", query);


    // const { departureDate, routeId, seatCategoryId,  pricingTableData, passengerName, mobileNumber } = query;

    // *the JSON.parse was returning string, but we needed the object
    // *ref: https://stackoverflow.com/questions/42494823/json-parse-returns-string-instead-of-object
    // const parsedPricingTableData = JSON.parse(JSON.parse(pricingTableData));

    // console.log("ParsedPricingTableData: ", parsedPricingTableData);
    // console.log("Type of: ", typeof(parsedPricingTableData));

    // const selectedSeatIds = parsedPricingTableData.reduce((total, element) => {
        // total.push(element.seatId);

        // return total;
    // }, []);

    // console.log("SelectedSeatIds: ", selectedSeatIds);

    //now let's get the bearer token

    const cookies = nookies.get(ctx);

    const {selectedRoute,selectedDate, selectedSeatCategory, pricingTableData, passengerName, mobileNumber } = cookies;

    const parsedPricingTableData = JSON.parse(pricingTableData);

    // console.log("ParsedPricingTableData: ", parsedPricingTableData);
    // console.log("Type of: ", typeof(parsedPricingTableData));

    const selectedSeatIds = parsedPricingTableData.reduce((total, element) => {
        total.push(element.seatId);

        return total;
    }, []);


    let data = await bookSeat(selectedRoute, selectedSeatCategory, selectedDate, selectedSeatIds, passengerName, mobileNumber, cookies.token);

    console.log("data: ", data);




    // Pass data to the page via props
    return {
        props: {
            data,
            // pricingTableData
        }
    }
}


export default GetTicketPage;