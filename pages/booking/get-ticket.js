

function GetTicketPage({data}) {
    return(
        <>
        </>
    )
}



export async function getServerSideProps({ query }) {
    console.log("Being called: getServerSideProps for seatCategoryInfo: ");
  
    // const data = await getSeatInfo();
  
    // console.log("query in getServerSideProps: ", query);
  
    const { selectedSeatIds, departureDate, routeId, seatCategoryId } = query;
  
  
    let data = await getSeatInfo(routeId, departureDate);
  
    console.log("data: ", data);
  
  
    // Pass data to the page via props
    return {
      props: {
        data,
        routeId: routeId,
        departureDate: departureDate
      }
    }
  }
  
  }