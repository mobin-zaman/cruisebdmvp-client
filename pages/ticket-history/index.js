

import nookies from 'nookies';
import getTicketList from '../../api-service/get-ticket-list';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react'
import {useRouter} from 'next/router';
import { BASE_URL } from '../../api-service/base-url';



export default function TicketHistoryPage({ data, statusCode }) {

    const router = useRouter();

   

    const downloadTicketHandler = (ticketId) => {
        router.push(`${BASE_URL}/ticket/${ticketId}/pdf`);
    }
     

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Customer Name</Table.HeaderCell>
                    <Table.HeaderCell>Customer Mobile Number</Table.HeaderCell>
                    <Table.HeaderCell>Departure Date</Table.HeaderCell>
                    <Table.HeaderCell>Purchase Time</Table.HeaderCell>
                    <Table.HeaderCell>Ticket</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {data.map(element => {
                    return (
                        <Table.Row>
                            <Table.Cell>
                                {element.id}
                    </Table.Cell>
                            <Table.Cell>
                                {element.customerName}
										</Table.Cell>
                            <Table.Cell>
                                {element.customerMobileNumber}
										</Table.Cell>
                            <Table.Cell>
                                {element.departureDate}
										</Table.Cell>
                            <Table.Cell>
                                {element.createdAt}
										</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => downloadTicketHandler(element.id)}>Ticket</Button>
                            </Table.Cell>
                        </Table.Row>
                    )
						})
					}


            </Table.Body>
        </Table>
    )
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);

        const data = await getTicketList(cookies.token);

        console.log("data:::", data);
        return {
            props: {
                data
            }
        }

    } catch (e) {
        console.log("Error in ticketing page: ", e);
    }
}
