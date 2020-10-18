import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { routeId, departureDate } = router.query

  return(
    <>
  <p>Post: {routeId}</p>
          <p>Selectecd Date: {departureDate}</p>
          </>
  );
}

export default Post
