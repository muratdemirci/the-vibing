import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useRef, useState } from 'react'
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore'
import { signOut, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function Input() {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showEmojis, setShowEmojis] = useState(false)

  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })

    setLoading(false)
    setInput('')
    setShowEmojis(false)
  }

  const addEmoji = (e: any) => {
    let sym = e.unified.split('-')
    let codesArray: any = []
    sym.forEach((el: any) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  const clickedOutside = () => {
    console.log('clicked outside')
  }

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${
        loading && 'opacity-60'
      }`}
    >
      {/* <img
        src={session.user.image}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
        onClick={signOut}
      /> */}
      <div className="divide-y divide-gray-700 w-full">
        <div className={`${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows="2"
            className="bg-transparent outline-none text-black text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#443ce5] h-[22px]" />
              </div>

              {showEmojis && (
                <Picker
                  onEmojiSelect={addEmoji}
                  onClickOutside={clickedOutside}
                  data={data}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                  //TODO: make this dynamic
                  theme="auto"
                />
              )}
            </div>
            <button
              className="bg-[#443ce5] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#3229d8] disabled:hover:bg-[#8782de] disabled:opacity-50 disabled:cursor-default"
              disabled={!input}
              onClick={sendPost}
            >
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
