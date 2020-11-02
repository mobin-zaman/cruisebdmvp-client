import { Icon, Step } from 'semantic-ui-react'

export default function Steps({shipOption, checkSeatOptions, getTicketOptions}) {
    return(
  <Step.Group ordered>
    <Step completed={shipOption}>
      <Step.Content>
        <Step.Title>Ship and Route</Step.Title>
        <Step.Description>Choose Ship and Route</Step.Description>
      </Step.Content>
    </Step>


    <Step completed={checkSeatOptions} >
      <Step.Content>
        <Step.Title>Check Seat</Step.Title>
        <Step.Description>Check the seats and select</Step.Description>
      </Step.Content>
    </Step>

    <Step completed={getTicketOptions}>
      <Step.Content>
        <Step.Title>Get Ticket</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>
    )
}