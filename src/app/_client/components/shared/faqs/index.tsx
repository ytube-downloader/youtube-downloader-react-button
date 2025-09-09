import { useTranslations } from "next-intl"


type HeroProps = {
  vda: string
}

const vdaLimits = (vda: string) =>{
  switch(vda) {
    case "yvd":
      return {
        intro2: 4,
        brandingIntro: 6,
        brandingList: 8
      }
    case "4kd":
      return {
        intro2: 6,
        brandingIntro: 5,
        brandingList: 6
      }
    case "ytmp3":
      return {
        intro2: 5,
        brandingIntro: 5,
        brandingList: 7
      }
    case "ypd":
      return {
        intro2: 7,
        brandingIntro: 5,
        brandingList: 7
      }
    case "ytwav":
      return {
        intro2: 5,
        brandingIntro: 4,
        brandingList: 5
      }
    case "y1080d":
      return {
        intro2: 6,
        brandingIntro: 5,
        brandingList: 7
      }
  }
}

export const FAQs = ({ vda }: HeroProps) =>{
  const yvdTranslate = useTranslations(`homepage.${ vda }`)
  const faqsTranslate = useTranslations(`homepage.${ vda }.faqs`)

  const renderIntro2 = () =>{
    const mappedIntro2 = Array(vdaLimits(vda)?.intro2)
      .fill("")
      .map((intro, index) => (
        <p
          key={`intro2-${index}`} 
          className="mb-1">{ faqsTranslate(`intro2.${index}`) }</p>
      ))

    return mappedIntro2
  }

  const brandingIntro = () =>{
    const mappedIntro = Array(vdaLimits(vda)?.brandingIntro)
      .fill("")
      .map((intro, index) => (
        <p
          key={`branding-intro-${index}`} 
          className="mb-1">{ faqsTranslate(`branding.intro.${index}`) }</p>
      ))

    return mappedIntro
  }
  
  const brandingList = () =>{
    const mappedList = Array(vdaLimits(vda)?.brandingList)
      .fill("")
      .map((intro, index) => (
        <li
          key={`branding-list-${index}`} 
          className="mb-1">{ faqsTranslate(`branding.list.${index}`) }</li>
      ))

    return mappedList
  }

  return (
    <div className="bg-white dark:bg-dark_heading mb-20 rounded-3xl py-7 lg:py-20 px-4 lg:px-24 shadow-md">
      <div className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one mb-6">
        <p className="mb-1">{ faqsTranslate("intro1.0") }</p>
        <p className="mb-1">{ faqsTranslate("intro1.1") }</p>
        <p className="">{ faqsTranslate("intro1.2") }</p>
      </div>
      <h2 className="font-bold text-heading_main mb-2 dark:text-dark_heading_main">{ faqsTranslate("heading") }</h2>
      <div className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one mb-6">
        { renderIntro2() }
      </div>

      <h3 className="font-bold text-heading_main dark:text-dark_heading_main text-xl mb-6">{yvdTranslate("fullname")}: { faqsTranslate("word") }</h3>
      <div className="mb-6">
        <h3 className="font-bold text-heading_main dark:text-dark_heading_main">{ faqsTranslate("list.0.question") }</h3>
        <p className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one mb-4">{ faqsTranslate("list.0.answer") }</p>
        <h3 className="font-bold text-heading_main dark:text-dark_heading_main">{ faqsTranslate("list.1.question") }</h3>
        <p className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one mb-4">{ faqsTranslate("list.1.answer") }</p>
        <h3 className="font-bold text-heading_main dark:text-dark_heading_main">{ faqsTranslate("list.2.question") }</h3>
        <p className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one">{ faqsTranslate("list.2.answer") }</p>
      </div>

      <h3 className="font-bold text-heading_main dark:text-dark_heading_main text-xl mb-6">{faqsTranslate("branding.title")}</h3>
      <div className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one mb-6">
        { brandingIntro() }
      </div>

      <div className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one mb-6">
        <ul className="list-disc pl-4">
          { brandingList() }
        </ul>
      </div>

      <h3 className="font-bold text-heading_main dark:text-dark_heading_main text-xl mb-6">{faqsTranslate("branding.subtitle")}</h3>
      <div>
        <h3 className="font-bold text-heading_main dark:text-dark_heading_main">{ faqsTranslate("branding.questions.0.question") }</h3>
        <p className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one mb-4">{ faqsTranslate("branding.questions.0.answer") }</p>
        <h3 className="font-bold text-heading_main dark:text-dark_heading_main">{ faqsTranslate("branding.questions.1.question") }</h3>
        <p className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one mb-4">{ faqsTranslate("branding.questions.1.answer") }</p>
        <h3 className="font-bold text-heading_main dark:text-dark_heading_main">{ faqsTranslate("branding.questions.2.question") }</h3>
        <p className="font-light text-sm leading-normal text-base_one dark:text-dark_base_one">{ faqsTranslate("branding.questions.2.answer") }</p>
      </div>
    </div>
  )
}