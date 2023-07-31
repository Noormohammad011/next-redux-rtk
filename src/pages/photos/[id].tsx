import { wrapper } from '@/redux/app/store'
import {
  getPhoto,
  getRunningQueriesThunk,
  useGetPhotoQuery,
} from '@/redux/features/photos/photosApi'
import { useRouter } from 'next/router'
import Image from 'next/image'


export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

const singelPhoto = () => {
  const router = useRouter()
  const id = router.query.id
  const result = useGetPhotoQuery(typeof id === 'string' ? id : undefined)
  const { isLoading, data } = result

  if (isLoading) return <div>Loading...</div>

   const photo: Photo = data

  return (
    <div>
      <h1>{photo?.title}</h1>
      <Image width={300} height={300} src={photo?.url} alt={photo?.title} />
    </div>
  )
}

export default singelPhoto

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id
    if (typeof id === 'string') {
      store.dispatch(getPhoto.initiate(id))
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
)



