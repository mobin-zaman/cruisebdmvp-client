import { useRouter } from 'next/router'
import { Form, Grid, Input } from 'semantic-ui-react';
import { useState } from 'react';
import PricingTable from '../../components/price-table';


export default function Confirm({ data }) {
    const router = useRouter();

    const { selectedSeatIds, departureDate, routeId, seatCategoryId, } = router.query;
    const pricingTableData = JSON.parse(router.query.pricingTableData);
    const [error, setError] = useState({})

    const [passengerName, setPassengerName] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);


    const validatePassengerInfo = () => {
        if (!passengerName) {
            setError({
                passengerName: "Enter passenger name"
            })
            return false;
        }

        //!TODO proper mobile number validation needs to be given

        if (!mobileNumber) {
            setError({
                mobileNumber: "Enter proper mobile number"
            })
            return false;
        }

        return true;
        
    }

    const confirmTickets = () => {
        if(validatePassengerInfo()) {
            setError({})
        } else {
            return;
        }
        console.log('Pricing table data: ', pricingTableData); 

        router.push({
            pathname: '/booking/get-ticket/',
            query: {
              routeId: routeId,
              departureDate: departureDate,
              seatCategoryId: seatCategoryId,
              pricingTableData: JSON.stringify(router.query.pricingTableData),
              passengerName: passengerName,
              mobileNumber: mobileNumber
            }
          })



    }

    return (
        <>
            {/* <div>pricingTableData: {pricingTableData.}</div> */}
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form>
                            <Form.Field
                                id="passanger_name"
                                control={Input}
                                label="Passenger Name"
                                placheholder="Passenger Name"
                                onChange={(e) => setPassengerName(e.target.value)}
                                error={error.passengerName ? ({
                                        content: error.passengerName
                                    }) : null
                                }
                            />
                            <Form.Field
                                id="phone_number"
                                control={Input}
                                label="Mobile Number"
                                placheholder="01XXXXXXXXX"
                                error={error.mobileNumber ? ({
                                    content: error.mobileNumber
                                }) : null}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <PricingTable data={pricingTableData} navigate={confirmTickets} buttonText="Confirm Ticket" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}