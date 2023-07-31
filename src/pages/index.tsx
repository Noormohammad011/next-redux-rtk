import Image from 'next/image'
import Link from 'next/link'
import { wrapper } from '@/redux/app/store'
import {
  getPhotos,
  getRunningQueriesThunk,
  useGetPhotosQuery,
} from '@/redux/features/photos/photosApi'

export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export default function Home() {
  const { data } = useGetPhotosQuery(undefined)

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 content-center gap-2 container mx-auto'>
      {data?.map((photo: Photo) => (
        <Link href={`/photos/${photo.id}`} key={photo.id}>
          <div
            key={photo.id}
            className='flex flex-col items-center justify-center'
          >
            <Image
              src={photo.thumbnailUrl}
              alt={photo.title}
              width={100}
              height={100}
            />
            <p className='text-center'>{photo.title}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     await store.dispatch(getPhotos.initiate(undefined))
//     await Promise.all(store.dispatch(getRunningQueriesThunk()))
//     return {
//       props: {},
//     }
//   }
// )



export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => { 
    await store.dispatch(getPhotos.initiate(undefined))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    return {
      props: {},
    }
  }
)