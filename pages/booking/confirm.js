import { useRouter } from 'next/router'
import { Form, Grid, Input } from 'semantic-ui-react';
import { useState } from 'react';
import PricingTable from '../../components/price-table';
export default function Confirm({ data }) {
    const router = useRouter();

    const { selectedSeatIds, departureDate, routeId, seatCategoryId, } = router.query;
    const pricingTableData = JSON.parse(router.query.pricingTableData);
    const [error, setError] = useState(null)

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
                            />
                            <Form.Field
                                id="phone_number"
                                control={Input}
                                label="Mobile Number"
                                placheholder="01XXXXXXXXX"
                                error={error ? ({
                                    content: "Please enter a valid phone number"
                                }) : null}
                            />
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <PricingTable data={pricingTableData} navigate={null} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}