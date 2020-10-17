// import {DropDown} from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react'
// import ShipDropDown from '../components/ship-dropdown'
import getShipData from '../api-service/ship-data';
import Step from '../components/steps';


export default function BookingPage({data}) {
    return (
        <>
        <div>Ship</div>
        <Step/>

            </>
        
    )
}


export async function getServerSideProps() {
    console.log("Being called: getServerSideProps: ");

    const data = await getShipData(); 

    console.log("data: ", data);


  // Pass data to the page via props
  return { props: { data } }
}