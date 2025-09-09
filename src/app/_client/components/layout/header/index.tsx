"use client"
import {Link} from '@/i18n/routing';
import { MenuIcon } from "../../svgs/icons/menu"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { HeaderNav } from "./nav"
import { motion } from "framer-motion"
import { Theming } from './theme';
import { useBetterMediaQuery } from '@/app/_client/libs/hooks/useBetterMediaQuery';


export const Header = () =>{
  const [ isExpanded, setIsExpanded ] = useState(false)
  const matches = useBetterMediaQuery('(min-width: 1024px)')

  useEffect(() =>{
    if ( isExpanded ) {
      window.document.body.classList.add("no-scroll")
    } else {
      window.document.body.classList.remove("no-scroll")
    }
  }, [isExpanded])
  
  return (
    <header className="sticky top-0 z-20 lg:pt-9 lg:px-5 lg:bg-body dark:bg-dark_body">
      <div className="bg-header_bg dark:bg-dark_heading p-5 shadow-sm flex justify-between items-center lg:rounded-3xl lg:px-10">
        <Link
          className="text-purple_main font-bold text-base lg:text-[42px] lg:leading-normal" 
          href="/">
          VDA
        </Link>
        <button 
          className="lg:hidden"
          onClick={ () => setIsExpanded(true) }
          aria-expanded={ isExpanded }>
          <div>
            <MenuIcon />
          </div>
        </button>
        <AnimatePresence>
          { isExpanded && (
            <motion.div
              className="bg-header_bg dark:bg-dark_body lg:hidden fixed top-0 left-0 min-h-screen w-screen"
              initial={{ 
                opacity: 0,
                x: 100
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{opacity: 0}}>
              <HeaderNav onClose={() => setIsExpanded(false)} />
              <div className="max-w-max mx-auto">
                <Theming />
              </div>
            </motion.div>
          ) }
        </AnimatePresence>
        { matches && (
          <div className='flex items-center'>
            <HeaderNav />
            <Theming />
          </div>
        ) }
      </div>
    </header>
  )
}