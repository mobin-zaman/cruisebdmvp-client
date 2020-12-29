import nookies from 'nookies';

export default function TicketHistoryPage({data, statusCode}){
    if(statusCode === 500) {
        return (
            <>
            <Error statusCode={statusCode}/>
            </>
        )
    }
} 

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);

        // const data = await 


    } catch(eer) {
        console.log("Error in ticketing page: ")
    }
}