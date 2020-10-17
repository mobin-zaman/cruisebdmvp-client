// import {DropDown} from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react'
// import ShipDropDown from '../components/ship-dropdown'
import getShipData from '../../api-service/ship-data';
import Step from '../../components/steps';
import { useState } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';


export default function BookingPage({ data }) {

    const [selectedShip, setSelectedShip] = useState(null);

    const [currentDate, setNewDate] = useState(null);
    const onDateChange = (event, data) => {
        // console.log("de value: ", reformatDate(data.value));
        setNewDate(reformatDate(data.value))
    };

    function reformatDate(value) {
        const dateStr =  value.toISOString().substring(0,10);
        let dArr = dateStr.split("-");  // ex input "2010-01-18"
        return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex out: "18/01/10"
        // return dateStr;
    }


    const shipOptions = data.map(element => (
        {
            key: element.id,
            value: element.id,
            text: element.shipName
        }
    ));

    const getRouteOptions = (shipId) => {
        if (shipId === null) return null;
        const ship = data.find(x => x.id === shipId);

        console.log("ship: ", ship);

        return ship.routes.map(route => ({
            key: route.id,
            value: route.id,
            text: route.routeName
        }))
    };

    const getShip = (event, data) => {
        console.log("Get ship: ");
        console.log("event: ", event);
        console.log("data: ", data);
        setSelectedShip(data.value);

        // console.log(bird_name);

    }

    // if (selectedShip) {
    //     setRoutesOption(data.find(x => x.id === selectedShip).routes.map((element) => (
    //         {
    //             key: element.id,
    //             value: element.id,
    //             text: element.routeName

    //         }

    //     )))
    // }

    return (
        <>
            <div>Ship</div>
            <div><Dropdown
                placeholder=' Select Ship'
                search
                fluid
                selection
                options={shipOptions}
                button
                onChange={getShip}
            /></div>

            {/* {shipOptions ? */}
            {/* ( */}
            {/* <> */}
            <div>Routes</div>
            <div><Dropdown
                placeholder=' Select Route'
                search
                fluid
                selection
                options={getRouteOptions(selectedShip)}
            /></div>
            {/* </> */}
            {/* // ) : null */}
            {/* } */}

            <SemanticDatepicker onChange={onDateChange} format='DD-MM-YYYY' />

            <Step />

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