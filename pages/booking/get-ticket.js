import bookSeat from "../../api-service/book-seat";import nookies from 'nookies';



function GetTicketPage({ data }) {
    console.log("Data: ", data);
    return (
        <div>
            This is your ticket link: {data.stringify()}
            This is your ticket link: {data.ticketUrl}
        </div>
    )
}etUrljj



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

    const {selectedRoute,selectedDate, selectedSeatCategory, selectedSeatIds, passengerName, mobileNumber } = cookies;


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