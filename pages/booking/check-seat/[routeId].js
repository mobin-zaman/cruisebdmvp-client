import { useRouter } from 'next/router'
import getSeatInfo from '../../../api-service/seat-info';
import { Dropdown, Image } from "semantic-ui-react";
import { useState } from 'react';

function CheckSeatPage({ data }) {
  const router = useRouter()
  const { routeId, departureDate } = router.query

  const [selectedSeatCategory, setSelectedSeatCategory] = useState(null);

  // console.log("Data: ", data);

  const seatCategoryOption = data.map(element => (
    {
      key: element.seatCategoryId,
      value: element.seatCategoryId,
      text: element.seatCategoryName

    }
  ));

  const getSeatCategory = (event, data) => {
    console.log("selectedSeatCategory: ", data.value);
    setSelectedSeatCategory(data.value);
  }

  const getSeatLayoutImageUrl = (seatCategoryId) => {
    if (seatCategoryId === null) return null;

    const seatCategory = data.find(x => x.seatCategoryId === seatCategoryId);

    // console.log("sealected seat category: ", seatCategory);
    return seatCategory.seatLayoutUrl;

  }

  const getAvailableSeats = (seatCategoryId) => {
    if (seatCategoryId === null) return null;
    const seatCategory = data.find(x => x.seatCategoryId === seatCategoryId);

    console.log("available seats: ", seatCategory.availableSeats);

    const availableSeats  =  seatCategory.availableSeats.map(element => (
      {
        key: element.seatId,
        value: element.seatId,
        text: element.seatName
      }
    ));

    return availableSeats;

  }


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
          onChange={getSeatCategory}
        />
      </div>

      {selectedSeatCategory ? (
        <>
          {getAvailableSeats(selectedSeatCategory)}
          <div> Seat Layout</div>
          <div>
            <Image src={getSeatLayoutImageUrl(selectedSeatCategory)} />
          </div>
          <div>Available seats for purchase</div>
          <div>
            <Dropdown
              placeholder=' Select seats'
              search
              fluid
              selection
              multiple
              options={getAvailableSeats(selectedSeatCategory)}
              button
            // onChange={g}
            />
          </div>
        </>
      ) : null
      }
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
