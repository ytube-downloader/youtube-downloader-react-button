import { CloseIcon } from "../../../svgs/icons/close"
import {Link} from '@/i18n/routing';


type HeaderNavProps = {
  onClose?: VoidFunction
}

const links = [
  {
    label: "Youtube Video Downloader",
    link: "/"
  },
  {
    label: "4k Video Downloader",
    link: "/4k-video-downloader"
  },
  {
    label: "Youtube to MP3",
    link: "/youtube-to-mp3"
  },
  {
    label: "Youtube Playlist Downloader",
    link: "/youtube-playlist-downloader"
  },
  {
    label: "Youtube to WAV",
    link: "/youtube-to-wav"
  },
  {
    label: "Youtube 1080p Downloader",
    link: "/youtube-1080p-downloader"
  }
]

export const HeaderNav = ({ onClose }: HeaderNavProps) =>{

  const renderLinks = () =>{
    const mappedLinks = links.map(link => (
      <li
        key={ link.link }
        className="mb-8 lg:mb-0">
        <Link href={link.link}>
          { link.label }
        </Link>
      </li>
    ))

    return mappedLinks
  }

  return (
    <nav className="w-screen bg-header_bg dark:bg-transparent p-4 lg:min-h-min lg:w-auto lg:p-0">
      <button
        className="block ml-auto lg:hidden" 
        onClick={ onClose? onClose : () =>{} }>
        <div>
          <CloseIcon />
        </div>
      </button>
      <ul className="font-light pt-2 text-center lg:flex lg:items-center lg:font-medium lg:gap-x-6 border-b-2 lg:border-none pb-8 lg:pb-0 mb-10 lg:mb-0 border-b-gray-200 dark:border-b-gray-800">
        { renderLinks() }
        <li
          className="mb-8 lg:hidden">
          <Link href={"/contact"}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}