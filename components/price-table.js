import { Icon, Label, Menu, Table } from 'semantic-ui-react';

export default function PricingTable({ data }) {
    console.log("Data in the pricing table: ", data);
    if (!data) return null;

    const createRowAndCell = (data) => {
        console.log("data: ", data)

        return data.map(element => {
            const { seatName, seatFare, seatTypeTitle } = element;
            return (
                <Table.Row>

                    <Table.Cell>
                        {seatName}
                    </Table.Cell>

                    <Table.Cell>
                        {seatFare}
                    </Table.Cell>

                    <Table.Cell>
                        {seatTypeTitle}
                    </Table.Cell>

                </Table.Row>
            )
        })
    }




return (
    <Table celled>

        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Ticket</Table.HeaderCell>
                <Table.HeaderCell>Fare</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                createRowAndCell(data)
            }
        </Table.Body>
    </Table>
)
}