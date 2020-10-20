import { useRouter } from 'next/router'
import getSeatInfo from '../../../api-service/seat-info';
import { Dropdown, Image,Grid } from "semantic-ui-react";
import { useState } from 'react';
import PricingTable from '../../../components/price-table';

function CheckSeatPage({ data }) {
  const router = useRouter()
  const { routeId, departureDate } = router.query

  const [selectedSeatCategory, setSelectedSeatCategory] = useState(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState(null);

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

    const availableSeats = seatCategory.availableSeats.map(element => (
      {
        key: element.seatId,
        value: element.seatId,
        text: element.seatName
      }
    ));
    console.log("available seats: ", availableSeats);

    return availableSeats;

  }

  const getSelectedSeats = ( event, data) => {
    console.log("Get selected seat: ");
    console.log("Event: ", event);
    console.log("data: ", data);
    setSelectedSeatIds(data.value);
  }

  /**
   * * necessary to show the tables 
   * @param {*} seatIds 
   */
  const getSelectedSeatInformation = (seatIds) => {
    if(!seatIds) return null;


    const selectedCategory = data.find(x => x.seatCategoryId === selectedSeatCategory);
    const availableSeats = selectedCategory.availableSeats;

    console.log("get availableSeats: ", availableSeats);

    let selectedSeatInformations = [];

    for (const seatId of seatIds) {
      console.log("Seat id: ", seatId);
      const seatInformation = availableSeats.find(x=> x.seatId === seatId);
      console.log("selected seatInformation: ", seatInformation);
      selectedSeatInformations.push(seatInformation);
    }

    return selectedSeatInformations;
    
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
          <div> Seat Layout</div>
          <div>
            <Image src={getSeatLayoutImageUrl(selectedSeatCategory)} />
          </div>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
          <div>Available seats for purchase</div>
          <div>
            <Dropdown
              placeholder=' Select seats'
              search
          // fluid
              selection
              multiple
              options={getAvailableSeats(selectedSeatCategory)}
              button
            onChange={getSelectedSeats}
            />
          </div>
          </Grid.Column>
          {/* //?the price table componenet */}
          <Grid.Column>
            <PricingTable data={getSelectedSeatInformation(selectedSeatIds)}/>
            </Grid.Column>
          {/* <div>
            <Step />
          </div> */}
          </Grid.Row>
        </Grid>
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
