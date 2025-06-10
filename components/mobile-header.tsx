'use client'
import { Button } from '@/components/ui/button'
import { Header } from '@/payload-types'
import Link from 'next/link'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { MenuIcon, XIcon } from 'lucide-react'
import { useSectionObserver } from '@/hooks/useSection'
import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export function MobileMenu({ headerData }: { headerData: Header }) {
  const active = useSectionObserver(
    headerData.navigation_links?.map((link) => link.section_id) || [],
  )

  return (
    <header className="fixed top-0 z-50 w-full">
      <Sheet>
        <div className="flex justify-between p-3 pr-4">
         
          <Link
            href="#home"
            aria-label="Home"
            className="block text-center text-2xl font-black tracking-tight text-emerald-700"
          >
            TrekSoulNepal
          </Link>
          <div className="flex gap-x-3 items-center">
            <Button
              style={{ backgroundColor: headerData.Book_now_button_color }}
              className="p-4 py-5 cursor-pointer font-semibold"
            >
              {headerData.Book_now_button_text}
            </Button>
            <SheetTrigger asChild>
              <MenuIcon className="w-6 h-6 cursor-pointer " strokeWidth={3} />
            </SheetTrigger>
          </div>
        </div>

        <SheetContent side="top" overlay={false} hideXIcon className=" h-[60vh]">
          <SheetTitle />
          <SheetHeader>
            <div className="flex justify-between ">
              <Link
                href="/"
                aria-label="Home"
                className="block text-center text-2xl font-black tracking-tight text-emerald-700"
              >
                TrekSoulNepal
              </Link>

              <div className="flex gap-x-3 items-center">
                <Button
                  style={{ backgroundColor: headerData.Book_now_button_color }}
                  className="p-3 cursor-pointer font-semibold"
                >
                  {headerData.Book_now_button_text}
                </Button>
                <SheetClose asChild>
                  <XIcon className=" cursor-pointer " strokeWidth={3} width={25} height={25} />
                </SheetClose>
              </div>
            </div>
          </SheetHeader>
          <nav>
            <ul>
              {headerData.navigation_links &&
                headerData.navigation_links.map((item) => {
                  return (
                    <li
                      key={item.label}
                      style={
                        {
                          '--nav-hover-active-color': headerData.Navigation_links_hover_color,
                        } as CSSProperties
                      }
                      className={cn('p-2 hover:text-[color:var(--nav-hover-active-color)]', {
                        'text-[color:var(--nav-hover-active-color)]': item.section_id === active,
                      })}
                    >
                      <SheetClose asChild>
                        <a
                          href={`#${item.section_id}`}
                          className="text-2xl font-black"
                          onClick={() => {}}
                        >
                          {item.label}
                        </a>
                      </SheetClose>
                    </li>
                  )
                })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
