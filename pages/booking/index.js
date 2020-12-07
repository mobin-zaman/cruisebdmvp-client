// import {DropDown} from 'semantic-ui-react';
import { Dropdown, Button, Icon, Modal } from 'semantic-ui-react'
// import ShipDropDown from '../components/ship-dropdown'
import nookies from 'nookies';
import getShipData from '../../api-service/ship-data';
import Step from '../../components/steps';
import { useState, useReducer } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { useRouter } from 'next/router';
import Error from "../_error.js";

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




export default function BookingPage({ data, statusCode }) {

    if(statusCode === 500) {
        return (
            <>
            <Error statusCode={statusCode}/>
            </>
        )
    }
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
        console.log("de value: ", data.value);
        if (data.value) setSelectedDate(reformatDate(data.value))
    };

    function reformatDate(value) {

        const date = value.getDate();
        //1 needs to be added in month because getMonth() returns from 0 to 11
        const month = value.getMonth() + 1;
        const year = value.getFullYear();

        const final = `${date}/${month}/${year}`;
        console.log("final: ", final);
        return final;
    }


    const shipOptions = data.map(element => (
        {
            key: element.id,
            value: element.id,
            text: element.shipName
        }
    ));

    const getRouteOptions = (shipId) => {
        if (!shipId) return null;
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

            //nookies.set other example, /src/context/user.context.js
            nookies.set(undefined, 'selectedRoute', selectedRoute);
            nookies.set(undefined, 'selectedDate', selectedDate);
            router.push('/booking/check-seat/');

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



export async function getServerSideProps(ctx) {


    
    try{

        //TODO: add error handling
    const cookies = nookies.get(ctx);


    const data = await getShipData(cookies.token);




    console.log("data: ", data);


    // Pass data to the page via props

    return { props: { data } }
    } catch(eer) {}
}


