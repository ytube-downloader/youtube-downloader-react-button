"use client"
import { DownloadIcon } from "@/app/_client/components/svgs/icons/download"
import { QualitySelectionIcon } from "@/app/_client/components/svgs/icons/qualitySelect"
import { useExpansion } from "@/app/_client/libs/hooks/useExpansion"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { audios, videos } from "./data"
import { toast } from "react-toastify"
import { ADS_URL } from "@/app/_client/configs"


type Selection = {
  label: string
  value: string
}

type YoutubeJson = {
  author_name: string
  author_url: string
  height: number
  html: string
  provider_name: string
  provider_url: string
  thumbnail_height: number
  thumbnail_url: string
  thumbnail_width: number
  title: string
  type: string
  version: string
}

type SelectedFormat = {
  label: string
  value: string
  type: "video" | "audio"
}

type Downloadable = {
  format: SelectedFormat
  youtube: YoutubeJson
  url: string
}

type FormatType = "audio" | "video"

export const Download = () =>{
  const translate = useTranslations("general")
  const { isExpanded, handleExpansion } = useExpansion()
  const [ selectedFormat, setSelectedFormat ] = useState<SelectedFormat>({
    label: "MP4 (720p)",
    value: "mp4_720",
    type: "video"
  })
  const [ youtubeUrl, setYoutubeUrl ] = useState("")
  const [ downloadables, setDownloadables ] = useState<Downloadable[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleChangeFormat = (newFormat: Selection, type: FormatType) => () =>{
    setSelectedFormat({
      ...newFormat,
      type
    })
    handleExpansion()
  }

  const renderSelections = (selections: Selection[], formatType: FormatType) =>{
    const mappedSelections = selections.map(selection => (
      <button
        className={`block font-light text-xs mb-3 text-gray-500 ${ selection.value===selectedFormat.value && "text-purple_main font-semibold" }`}
        key={selection.value}
        onClick={ handleChangeFormat(selection, formatType) }>
        { selection.label }
      </button>
    ))

    return mappedSelections
  }

  const handleFetchUrl = async() =>{
    if ( !youtubeUrl ) return

    const baseUrl = "https://www.youtube.com/oembed";
    const encodedUrl = encodeURIComponent(youtubeUrl);
    const url = `${baseUrl}?url=${encodedUrl}&format=json`;

    const result = await fetch(url)

    if ( !result.ok ) {
      return toast.error("Something went wrong. Try to use other youtube url")
    } 

    const json: YoutubeJson = await result.json()

    setDownloadables(prev => prev.concat({
      format: selectedFormat,
      youtube: json,
      url: youtubeUrl
    }))

    setSelectedFormat({
      label: "MP4 (720p)",
      value: "mp4_720",
      type: "video"
    })
    setYoutubeUrl("")

    setTimeout(() =>{
      scrollRef.current?.scrollIntoView()
    }, 100)
  }

  const renderDownloadables = () =>{
    const mappedDownloadables = downloadables.map((downloadable, index) => (
      <div 
        key={`downloadable-${ index }-${downloadable.youtube.html}`}
        className="mb-10 lg:flex lg:items-start lg:gap-x-6">
        <div className="rounded-2xl overflow-hidden max-w-[480px] lg:h-[270px] mb-4 lg:mb-0 lg:basis-1/2">
          <img 
            className="max-h-full object-cover w-full"
            src={downloadable.youtube.thumbnail_url} 
            alt="" />
        </div>
        <div className="lg:basis-1/2">
          <div className="flex mb-4 lg:mb-2 items-center font-light text-purple_main capitalize text-sm gap-x-4">
            <p className="border border-purple_main rounded-full py-3 px-5 hover:bg-purple_main hover:text-white">{ downloadable.format.type }</p>
            <p className="border border-purple_main rounded-full py-3 px-5 hover:bg-purple_main hover:text-white">{ downloadable.format.label }</p>
          </div>
          <h4 className="text-heading_main font-bold text-xl lg:text-3xl">{ downloadable.youtube.title }</h4>
          <div className="mb-3">
            <a 
              href={ downloadable.url }
              className="text-sm">
              <span className="text-purple_main font-medium">URL: </span>
              <span className="text-gray-700 break word-break-word">{ downloadable.url }</span>
            </a>
          </div>
          <iframe style={{width: "100%", border: "none", maxWidth: "564px", height: "60px", overflow: "hidden"}} src={`https://loader.to/api/button2/?url=${ downloadable.url }&f=${ downloadable.format.value }${ ADS_URL? `&adUrl=${ ADS_URL }`: "" }`}></iframe>
        </div>
      </div>
    ))

    return mappedDownloadables
  }

  return (
    <>
      <div className="lg:flex lg:bg-white lg:dark:bg-dark_heading lg:items-center lg:shadow-md lg:rounded-3xl lg:py-4 lg:pr-4 mb-20">
        <div className="mb-4 lg:mb-0 lg:w-full">
          <input
            className="font-light px-6 h-16 rounded-3xl bg-white dark:bg-dark_heading shadow-md lg:shadow-none w-full block outline-none"
            placeholder="Paste your url"
            value={youtubeUrl}
            onChange={(event) => setYoutubeUrl(event.target.value)} />
        </div>
        <div className="relative flex items-center rounded-3xl before:absolute lg:min-w-[306px] lg:max-w-[306px]
          before:w-[1px] before:h-[70%] before:bg-gray-300 before:top-3 before:left-1/2 before:bg-opacity-60">
          <button 
            className="text-white font-bold bg-purple_main basis-1/2 flex justify-center items-center h-16 rounded-l-2xl gap-x-2 hover:bg-opacity-80"
            onClick={ handleExpansion }
            aria-expanded={ isExpanded }>
            {selectedFormat.label}
            <div className={`w-6 h-6 transition-transform ${ isExpanded && "rotate-180" }`}>
              <QualitySelectionIcon />
            </div>
          </button>
          <button 
            className="text-white font-bold bg-purple_main basis-1/2 flex justify-center items-center h-16 rounded-r-2xl gap-x-2 hover:bg-opacity-80"
            onClick={ handleFetchUrl }>
            <div className="w-6 h-7">
              <DownloadIcon />
            </div>
            { translate("download") }
          </button>
          <div className={`transition-all absolute top-full left-0 bg-white rounded-lg shadow p-6 flex items-start gap-x-10 opacity-0 invisible ${ isExpanded && "!opacity-100 !visible" }`}>
            <div>
              <h4 className="text-sm font-bold text-heading_main mb-4">{ translate("audio") }</h4>
              <div>
                { renderSelections(audios, "audio") }
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-heading_main mb-4">{ translate("video") }</h4>
              <div>
                { renderSelections(videos, "video") }
              </div>
            </div>
          </div>
        </div>
      
      </div>
      { downloadables.length>0 && (
        <div 
          ref={scrollRef} 
          className="lg:px-20 mb-8">
          <div className="bg-white rounded-2xl py-6 lg:py-16 px-5 lg:px-16">
            { renderDownloadables() }
          </div>
        </div>
      ) }
    </>
  )
}