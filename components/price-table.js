import {nanoid} from 'nanoid';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import {useState} from 'react';

export default function PricingTable({ data }) {
    console.log("Data in the pricing table: ", data);
    if(!data) return null;
    if(data.find(element => element===undefined)) return null;

    // const [totalFare, setTotalFare] = useState(0);

    const createRowAndCell = (data) => {
        console.log("data: ", data)
        // if(!data) return null;

        return data.map(element => {
            const { seatName, seatFare, seatTypeTitle } = element;
            //having the sum at the same time to reduce the time
            return (
                <Table.Row key={nanoid()}>

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

    const getTotalFare = (data) => {
        const totalFare = data.reduce((total, element) => {
            return total+=Number(element.seatFare);
        },0)

        console.log("this is the total: ", totalFare);
        return totalFare;
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

         <Table.Footer>
            <Table.Row>
                <Table.Cell>
                    Total Fare
                </Table.Cell>
                <Table.Cell>
                    <div>{getTotalFare(data)}</div>
                </Table.Cell>
                <Table.Cell>
                    
                </Table.Cell>
                
            </Table.Row>
        </Table.Footer> 
    </Table>
)
}