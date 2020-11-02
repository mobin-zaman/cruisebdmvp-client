import bookSeat from "../../api-service/book-seat";
import {Image } from 'semantic-ui-react';


function GetTicketPage({ data }) {
    console.log("Data: ", data);
    return (
        <>
        <Image src={data.ticket}/>
        </>
    )
}



export async function getServerSideProps({ query }) {
    console.log("Get ticket getServersideProps: query: ",query);


    console.log("query in getServerSideProps: ", query);


    const { departureDate, routeId, seatCategoryId,  pricingTableData, passangerName, mobileNumber } = query;

    // *the JSON.parse was returning string, but we needed the object
    // *ref: https://stackoverflow.com/questions/42494823/json-parse-returns-string-instead-of-object
    const parsedPricingTableData = JSON.parse(JSON.parse(pricingTableData));

    // console.log("ParsedPricingTableData: ", parsedPricingTableData);
    // console.log("Type of: ", typeof(parsedPricingTableData));

    const selectedSeatIds = parsedPricingTableData.reduce((total, element) => {
        total.push(element.seatId);

        return total;
    }, []);

    console.log("SelectedSeatIds: ", selectedSeatIds);


    let data = await bookSeat(routeId, seatCategoryId, departureDate, selectedSeatIds, passangerName, mobileNumber);

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