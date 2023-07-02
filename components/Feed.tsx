import { ChevronDoubleDownIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import TextInput from './TextInput'
import { onSnapshot, collection, query, orderBy } from '@firebase/firestore'
import { db } from '../firebase'
import Post from './Post'
import { useSession } from 'next-auth/react'
import { Lora } from 'next/font/google'

const lora = Lora({ subsets: ['latin'] })

function Feed() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
        setPosts(snapshot.docs)
      }),
    [db]
  )

  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#443ce5] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-700">
        <h2 className={`${lora.className} text-lg sm:text-xl font-bold`}>Flow</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <ChevronDoubleDownIcon className="h-5 " />
        </div>
      </div>

      <TextInput />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
        -- end of line --
      </div>
    </div>
  )
}

export default Feed
