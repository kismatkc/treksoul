'use client'

import { useState, useEffect, useRef, InputHTMLAttributes, CSSProperties, FormEvent } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

import type { BookingSheet, Trek } from '@/payload-types'
import { Phone, MessageCircle, Mail, X } from 'lucide-react'
import clsx from 'clsx'

/* ------------------------------------------------------------ */
type ContactMethod = 'call' | 'whatsapp' | 'email'
type MinimalTrek = Pick<Trek, 'id' | 'name'>
/* ------------------------------------------------------------ */

export default function BookNowSheet({ bookData }: { bookData: BookingSheet }) {
  /* Payload values */
  const phone = bookData.contact?.phone_number ?? ''
  const waNum = bookData.contact?.whatsapp_number || phone
  const ownerEmail = bookData.contact?.email_address ?? ''
  const treks: MinimalTrek[] = Array.isArray(bookData.treks) ? (bookData.treks as any) : []

  /* state */
  const [open, setOpen] = useState(false)
  const [isTouch, setIsTouch] = useState(true)
  const [method, setMethod] = useState<ContactMethod>('call')
  const [trekName, setTrekName] = useState<string | undefined>()
  const firstFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') setIsTouch(matchMedia('(pointer:coarse)').matches)
  }, [])
  useEffect(() => {
    if (open && firstFocus.current) firstFocus.current.focus()
  }, [open])

  /* message template */
  const bodyText = trekName ? `I want to book the ${trekName} trek` : 'I want to book a trek'

  /* WhatsApp + Gmail URLs */
  const waURL =
    waNum && `https://wa.me/${waNum.replace(/[^\d]/g, '')}?text=${encodeURIComponent(bodyText)}`

  const subject = `Trek booking enquiry${trekName ? ` – ${trekName}` : ''}`
  const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    ownerEmail,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`
  const gmailApp = `googlegmail://co?to=${encodeURIComponent(
    ownerEmail,
  )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`

  const openGmail = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (isMobile) {
      window.location.href = gmailApp
    } else {
      window.open(gmailWeb, '_blank', 'noopener,noreferrer')
    }
  }

  /* submit */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    /* --- optimistic toast: success immediately --- */
    const toastId = toast.success('Enquiry sent! We’ll reply shortly.')

    const ok = await fetch('/api/enquiry', {
      method: 'POST',
      body: new FormData(form),
    }).then((r) => r.ok)

    if (ok) {
      form.reset()
      setTrekName(undefined)
      setOpen(false)
    } else {
      /* update existing toast into an error */
      toast.error('Server error – please try again.', { id: toastId })
    }
  }

  /* jsx */
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          style={{ '--book-now-button-color': bookData.button_color } as CSSProperties}
          className="cursor-pointer px-6 py-5 font-semibold bg-[color:var(--book-now-button-color)]"
        >
          {bookData.button_text}
        </Button>
      </SheetTrigger>

      <SheetContent
        side={isTouch ? 'bottom' : 'right'}
        className="flex h-auto max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-2xl border md:max-w-sm"
        hideXIcon
        overlay
      >
        <SheetTitle />
        <header className="flex items-center justify-between px-6 pt-6">
          <h2 className="text-lg font-bold">Book your trek</h2>
          <Button
            ref={firstFocus}
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setOpen(false)}
          >
            <X className="size-4" />
          </Button>
        </header>

        {/* quick actions */}
        <div className="mx-auto mt-6 flex w-max overflow-hidden rounded-full border">
          <ActionChip
            active={method === 'call'}
            label="Call"
            Icon={Phone}
            onClick={() => {
              setMethod('call')
              if (phone) window.location.href = `tel:${phone}`
            }}
          />
          <ActionChip
            active={method === 'whatsapp'}
            label="WhatsApp"
            Icon={MessageCircle}
            onClick={() => {
              setMethod('whatsapp')
              if (waURL) window.open(waURL, '_blank', 'noopener,noreferrer')
            }}
          />
          <ActionChip
            active={method === 'email'}
            label="Email"
            Icon={Mail}
            onClick={() => {
              setMethod('email')
              openGmail()
            }}
          />
        </div>

        <Divider />

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-8 pt-6 text-sm">
          <Input label="Your name" name="name" required />
          <Input label="Email address" name="email" type="email" required />

          <Select name="trek" value={trekName} onValueChange={setTrekName} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select trek" />
            </SelectTrigger>
            <SelectContent>
              {treks.map(({ id, name }) => (
                <SelectItem key={id} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input label="Preferred date" name="date" type="date" />

          <Button
            type="submit"
            className="w-full bg-emerald-600 font-semibold"
            onClick={() => setOpen(false)}
          >
            Send enquiry
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

/* helpers */
function ActionChip({
  active,
  label,
  Icon,
  onClick,
}: {
  active: boolean
  label: string
  Icon: typeof Phone
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600',
        active ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-50',
      )}
    >
      <Icon className="size-4" /> {label}
    </button>
  )
}
function Divider() {
  return (
    <div className="relative mt-8 px-6">
      <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-2 text-xs text-muted-foreground">
        or send us details
      </span>
      <div className="h-px w-full bg-muted" />
    </div>
  )
}
function Input({
  label,
  className,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = props.id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="relative">
      <input
        id={id}
        {...props}
        placeholder=" "
        className={clsx(
          'peer h-12 w-full rounded-md border border-gray-300 bg-transparent px-3 pt-6 text-sm',
          'placeholder-transparent shadow-inner focus:border-emerald-500 focus:outline-none',
          className,
        )}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-3 origin-[0] -translate-y-2 scale-75 transform text-gray-500 transition-all
                   peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100
                   peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-emerald-500"
      >
        {label}
      </label>
    </div>
  )
}
