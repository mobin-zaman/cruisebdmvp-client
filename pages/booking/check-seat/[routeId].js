import { useRouter } from 'next/router'
import getSeatInfo from '../../../api-service/seat-info';
import { Dropdown } from "semantic-ui-react";

function CheckSeatPage({ data }) {
  const router = useRouter()
  const { routeId, departureDate } = router.query

  // console.log("Data: ", data);

  const seatCategoryOption = data.map(element => (
    {
      key: element.seatCategoryId,
      value: element.seatCategoryId, 
    text: element.seatCategoryName

    }
  ));

  

  console.log("Seat category options: ", seatCategoryOption);

  return (
    <>

      <div>Class</div>
      <div>
        <Dropdown
          placeholder=' Select class'
          search
          fluid
          selection
          options={seatCategoryOption}
          button

        />
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  console.log("Being called: getServerSideProps for seatCategoryInfo: ");

  // const data = await getSeatInfo();

  // console.log("query in getServerSideProps: ", query);

  const { routeId, departureDate } = query;


  let data = await getSeatInfo(routeId, departureDate);

  console.log("data: ", data);


  // Pass data to the page via props
  return { props: { data } }
}


export default CheckSeatPage
