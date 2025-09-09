import { Download } from "@/app/_client/components/shared/download";
import { FAQs } from "@/app/_client/components/shared/faqs";
import { Features } from "@/app/_client/components/shared/features";
import { Hero } from "@/app/_client/components/shared/hero";
import { Partners } from "@/app/_client/components/shared/partners";


type PageProps = {
  params: Promise<{ vda: string }>
}

const mapper: Mapper = {
  "4k-video-downloader": "4kd",
  "youtube-to-mp3": "ytmp3",
  "youtube-playlist-downloader": "ypd",
  "youtube-to-wav": "ytwav",
  "youtube-1080p-downloader": "y1080d",
}

type Mapper = {
  [key: string]: string
}
 
const Page = async({ params }: PageProps) => {
  const vda = (await params).vda
 
  return (
    <main className='px-5 lg:px-0'>
      <Hero vda={ mapper[vda] } />
      <Download />
      <Partners />
      <FAQs vda={ mapper[vda] } />
      <Features vda={mapper[vda]} />
    </main>
  );
}


export default Page