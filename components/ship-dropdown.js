// import {DropDown} from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react'

//ref: https://stackoverflow.com/questions/48807924/react-es6-get-selected-value-in-dropdown-list-using-semantic-ui


function BookingPage({data}) {
    return (
        <>
        <span>Ship</span>
            <span><Dropdown
            placeholder="Select ship"
            fluid
            search
            selection
            options={countryOptions}
            /></span>
            </>
        
    )
}

export async function getServerSideProps() {
    const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default BookingPage;