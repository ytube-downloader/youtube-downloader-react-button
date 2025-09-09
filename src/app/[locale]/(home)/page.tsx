import { Hero } from '@/app/_client/components/shared/hero';
import { Download } from '@/app/_client/components/shared/download';
import { Partners } from '@/app/_client/components/shared/partners';
import { FAQs } from '@/app/_client/components/shared/faqs';
import { Features } from '@/app/_client/components/shared/features';
 

const Page = () => {

  return (
    <main className='px-5 lg:px-0'>
      <Hero vda='yvd' />
      <Download />
      <Partners />
      <FAQs vda='yvd' />
      <Features vda='yvd' />
    </main>
  );
}


export default Page