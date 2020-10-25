import { useRouter } from 'next/router'
import { Form, Grid, Input } from 'semantic-ui-react';
import { useState } from 'react';
import PricingTable from '../../components/price-table';
export default function Confirm({ data }) {
    const router = useRouter();

    const { selectedSeatIds, departureDate, routeId, seatCategoryId, } = router.query;
    const pricingTableData = JSON.parse(router.query.pricingTableData);
    const [error, setError] = useState({})

    const [passangerName, setPassangerName] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);


    const validatePassangeInfo = () => {
        if (!passangerName) {
            setError({
                passangerName: "Enter passenger name"
            })
        }

        //!TODO proper mobile number validation needs to be given

        if (!mobileNumber) {
            setError({
                mobileNumber: "Enter proper mobile number"
            })
        }
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
                                onChange={(e) => setPassangerName(e.target.value)}
                                error={error.passangerName ? ({
                                        content: error.passangerName
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
                            />
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <PricingTable data={pricingTableData} navigate={null} buttonText="Confirm Ticket" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}