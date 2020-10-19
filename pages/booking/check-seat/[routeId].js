import { useRouter } from 'next/router'
import getSeatInfo from '../../../api-service/seat-info';

function CheckSeatPage({ data }) {
  const router = useRouter()
  const { routeId, departureDate } = router.query

  console.log("Data: ", data);

  return (
    <p>Post: {routeId}</p>
  );
}

export async function getServerSideProps({ query }) {
  console.log("Being called: getServerSideProps for seatCategoryInfo: ");

  // const data = await getSeatInfo();

  // console.log("query in getServerSideProps: ", query);

  const {routeId, departureDate} = query;


  let data = await getSeatInfo(routeId, departureDate);

  // console.log("data: ", data);

  // data = {
    // sample:"data"
  // }

  // Pass data to the page via props
  return { props: { data } }
}


export default CheckSeatPage
