import {useRouter} from 'next/router'
export default function Confirm({data}) {
    const router = useRouter();

    const {selectedSeatIds} = router.query;

    return (
        <div>
            selectedSeat{selectedSeatIds}
        </div>
    )
}