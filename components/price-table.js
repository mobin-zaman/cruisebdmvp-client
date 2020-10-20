import {Icon, Label, Menu, Table } from 'semantic-ui-react';

export default function PricingTable({data}) {
    console.log("Data in the pricing table: ", data);
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Ticket</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        </Table>
    )
}