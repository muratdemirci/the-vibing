import Image from 'next/image'
import { HomeIcon } from '@heroicons/react/solid'
import { BellIcon, UserIcon, DotsHorizontalIcon, CogIcon } from '@heroicons/react/outline'
import SidebarLink from './SidebarLink'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { Lora } from 'next/font/google'

const lora = Lora({ subsets: ['latin'] })

function Sidebar() {
  const { data: session } = useSession()
  return (
    <div
      className={`${lora.className} hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 h-full`}
    >
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="/vibing-purple-logo.png" alt="Vibing Logo" width={30} height={30} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24 bg-[#443ce5]">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="Settings" Icon={CogIcon} />
      </div>
      <button
        onClick={() => alert('modal glecek buraya')}
        className="hidden xl:inline ml-auto bg-[#443ce5] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#5953d0]"
      >
        Share
      </button>

      {/* TODO: change this location */}
      <div className="text-[black] flex items-center justify-center hoverAnimation xl:ml-auto xl:mr-5 mt-auto">
        <img
          src={session?.user?.image || 'https://rb.gy/ogau5a'}
          alt="Profile Picture"
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">{session?.user?.name}</h4>
          <p className="text-[red]">@{session?.user.tag}</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
      <button
        onClick={signOut}
        className="hidden xl:inline ml-auto bg-[#443ce5] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#5953d0]"
      >
        Signout
      </button>
    </div>
  )
}

export default Sidebar
