import { Divider } from "semantic-ui-react";
import {useRouter} from "next/router"

export default function CheckSeatPage() {
    const router = useRouter();
    const {routeId, departureDate} = router.query;
    return(
        //!NOTE: simply passing the data as props, no params
        <>
        {console.log("Router: ", router)}
        <div>checking query value: {routeId}</div>
        </>
    )
}