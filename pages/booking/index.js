// import {DropDown} from 'semantic-ui-react';
import { Dropdown, Button, Icon, Modal } from 'semantic-ui-react'
// import ShipDropDown from '../components/ship-dropdown'
import getShipData from '../../api-service/ship-data';
import Step from '../../components/steps';
import { useState, useReducer } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { useRouter } from 'next/router';

function exampleReducer(state, action) {
    switch (action.type) {
        case 'close':
            return { open: false }
        case 'open':
            return { open: true, size: action.size }
        default:
            throw new Error('Unsupported action...')
    }
}




export default function BookingPage({ data }) {

    const router = useRouter();

    const [state, dispatch] = useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })

    const { open, size } = state;

    const [selectedShip, setSelectedShip] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedRoute, setSelectedRoute] = useState(null);



    const onDateChange = (event, data) => {
        // console.log("de value: ", reformatDate(data.value));
        if (data.value) setSelectedDate(reformatDate(data.value))
    };

    function reformatDate(value) {
        const dateStr = value.toISOString().substring(0, 10);
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

    const getRoute = (event, data) => {
        console.log("get route: ");
        console.log("event: ", event);
        console.log("data: ", data);
        setSelectedRoute(data.value);
    }

    const buttonClickHandler = () => {
        if (!selectedShip || !selectedRoute || !selectedDate) {
            console.log("selectedShip: ", selectedShip);
            console.log("selectedRoute: ", selectedRoute);
            console.log("selectedDate: ", selectedDate);
            //the below line is for controlling the form data error modal
            dispatch({ type: 'open', size: 'mini' });

        } else {
            //set session storage here
            router.push(`/booking/check-seat/${selectedRoute}?departureDate=${encodeURIComponent(selectedDate)}`);

        }
    }


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
                onChange={getRoute}
            /></div>
            {/* </> */}
            {/* // ) : null */}
            {/* } */}

            <div> Pick Departure Date</div>
            <div>
                <SemanticDatepicker onChange={onDateChange} format='DD-MM-YYYY' />

            </div>

            <Modal
                size={size}
                open={open}
                onClose={() => dispatch({ type: 'close' })}
            >
                <Modal.Header>Please input in the form properly</Modal.Header>
                <Modal.Content>
                    <p> Can you please check again?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={() => dispatch({ type: 'close' })}>
                        Okay
          </Button>
                </Modal.Actions>
            </Modal>

            <Button positive

                onClick={buttonClickHandler}
            > Check! </Button>
            <div>
                <Step />
            </div>

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