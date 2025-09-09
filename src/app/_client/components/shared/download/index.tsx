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

export const Download = () => {
  const translate = useTranslations("general")
  const { isExpanded, handleExpansion } = useExpansion()
  const [selectedFormat, setSelectedFormat] = useState<SelectedFormat>({
    label: "MP4 (720p)",
    value: "mp4_720",
    type: "video"
  })
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [downloadables, setDownloadables] = useState<Downloadable[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // URL validation
  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
    return youtubeRegex.test(url)
  }

  const handleUrlChange = (value: string) => {
    setYoutubeUrl(value)
    if (value.length > 0) {
      setIsValidUrl(validateYouTubeUrl(value))
    } else {
      setIsValidUrl(null)
    }
  }

  const handleChangeFormat = (newFormat: Selection, type: FormatType) => () => {
    setSelectedFormat({
      ...newFormat,
      type
    })
    handleExpansion()
  }

  const renderSelections = (selections: Selection[], formatType: FormatType) => {
    const mappedSelections = selections.map(selection => (
      <button
        className={`block font-medium text-sm mb-3 px-3 py-2 rounded-lg transition-all duration-200 w-full text-left hover:bg-purple_main hover:text-white ${
          selection.value === selectedFormat.value 
            ? "text-purple_main bg-purple_main bg-opacity-10 font-semibold" 
            : "text-gray-600 hover:text-white"
        }`}
        key={selection.value}
        onClick={handleChangeFormat(selection, formatType)}>
        {selection.label}
      </button>
    ))

    return mappedSelections
  }

  const handleFetchUrl = async () => {
    if (!youtubeUrl || !isValidUrl) {
      toast.error("Please enter a valid YouTube URL")
      return
    }

    setIsLoading(true)
    
    try {
      const baseUrl = "https://www.youtube.com/oembed"
      const encodedUrl = encodeURIComponent(youtubeUrl)
      const url = `${baseUrl}?url=${encodedUrl}&format=json`

      const result = await fetch(url)

      if (!result.ok) {
        throw new Error("Failed to fetch video information")
      }

      const data: YoutubeJson = await result.json()

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))

      const downloadable: Downloadable = {
        format: selectedFormat,
        youtube: data,
        url: youtubeUrl
      }

      setDownloadables(prev => [downloadable, ...prev])
      toast.success("Video processed successfully!")
      
      // Scroll to results
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)

    } catch (error) {
      console.error(error)
      toast.error("Failed to process video. Please check the URL and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderDownloadables = () => {
    const mappedDownloadables = downloadables.map((downloadable, index) => (
      <div
        key={`downloadable-${index}`}
        className="bg-gradient-to-r from-purple_main to-purple_main bg-opacity-5 rounded-2xl p-6 mb-6 border border-purple_main border-opacity-20 animate-fadeIn">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-heading_main dark:text-dark_heading_main text-lg mb-2 line-clamp-2">
              {downloadable.youtube.title}
            </h3>
            <p className="text-base_one dark:text-dark_base_one text-sm mb-3">
              Format: <span className="font-semibold text-purple_main">{downloadable.format.label}</span>
            </p>
            <p className="text-base_one dark:text-dark_base_one text-xs">
              Channel: {downloadable.youtube.author_name}
            </p>
          </div>
          <div className="lg:min-w-[400px]">
            <iframe
              className="w-full h-48 lg:h-32 rounded-xl"
              src={`https://loader.fo/api/button/?url=${downloadable.url}&f=${downloadable.format.value}${ADS_URL ? `&adUrl=${ADS_URL}` : ""}`}>
            </iframe>
          </div>
        </div>
      </div>
    ))

    return mappedDownloadables
  }

  return (
    <>
      {/* Enhanced Download Interface */}
      <div className="relative download-component">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple_main to-blue-600 opacity-5 rounded-3xl"></div>
        
        <div className="relative bg-white dark:bg-dark_heading shadow-xl rounded-3xl p-6 lg:p-8 mb-20 border border-gray-100 dark:border-gray-700">
          {/* URL Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-heading_main dark:text-dark_heading_main mb-3">
              Enter YouTube URL
            </label>
            <div className="relative">
              <input
                className={`w-full h-16 md:h-16 lg:h-14 px-6 rounded-2xl font-medium text-heading_main dark:text-dark_heading_main bg-gray-50 dark:bg-dark_body border-2 transition-all duration-300 outline-none placeholder:text-gray-400 ${
                  isValidUrl === false 
                    ? "border-red-400 bg-red-50 dark:bg-red-900 dark:bg-opacity-20" 
                    : isValidUrl === true 
                      ? "border-green-400 bg-green-50 dark:bg-green-900 dark:bg-opacity-20" 
                      : "border-gray-200 dark:border-gray-600 focus:border-purple_main focus:bg-white dark:focus:bg-dark_heading"
                }`}
                placeholder="Paste your YouTube URL here... (e.g., https://youtube.com/watch?v=...)"
                value={youtubeUrl}
                onChange={(event) => handleUrlChange(event.target.value)}
                disabled={isLoading}
              />
              
              {/* URL Status Indicator */}
              {isValidUrl !== null && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {isValidUrl ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* URL Validation Message */}
            {isValidUrl === false && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Please enter a valid YouTube URL
              </p>
            )}
          </div>

          {/* Format Selection and Download Section */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Format Selection */}
            <div className="relative lg:min-w-[200px]">
              <button
                className={`w-full h-14 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-purple_main to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleExpansion}
                aria-expanded={isExpanded}
                disabled={isLoading}>
                <span>{selectedFormat.label}</span>
                <div className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                  <QualitySelectionIcon />
                </div>
              </button>

              {/* Enhanced Format Selection Dropdown */}
              <div className={`absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark_heading rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 z-50 ${
                isExpanded ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
              }`}>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-bold text-heading_main dark:text-dark_heading_main mb-4 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-purple_main" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Audio Formats
                      </h4>
                      <div>{renderSelections(audios, "audio")}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-heading_main dark:text-dark_heading_main mb-4 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-purple_main" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        Video Formats
                      </h4>
                      <div>{renderSelections(videos, "video")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              className={`flex-1 h-14 p-4 rounded-2xl font-bold text-white bg-gradient-to-r transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                isLoading
                  ? "from-gray-400 to-gray-500 cursor-not-allowed"
                  : !youtubeUrl || isValidUrl === false
                    ? "from-gray-300 to-gray-400 cursor-not-allowed"
                    : "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              }`}
              onClick={handleFetchUrl}
              disabled={isLoading || !youtubeUrl || isValidUrl === false}>
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <div className="w-5 h-5">
                    <DownloadIcon />
                  </div>
                  {translate("download")}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Results Section */}
      {downloadables.length > 0 && (
        <div ref={scrollRef} className="lg:px-20 mb-8">
          <div className="bg-white dark:bg-dark_heading rounded-3xl py-8 lg:py-16 px-6 lg:px-16 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-heading_main dark:text-dark_heading_main mb-2">
                Ready to Download
              </h2>
              <p className="text-base_one dark:text-dark_base_one">
                Your videos have been processed and are ready for download
              </p>
            </div>
            {renderDownloadables()}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}