import { Header } from '@/payload-types'
import { Button } from './ui/button'

const HeaderClient = ({ headerData }: { headerData: Header }) => {
  return (
    <header className="fixed top-0 left-0 right-0  border-2 z-50">
      <nav className="flex justify-between p-3">
        <div className="text-xl font-bold  p-2 cursor-pointer">TrekSoulNepal</div>

        <div className="flex gap-x-3">
          <Button style={{ backgroundColor: headerData.Book_now_button_color }} className="p-3">
            {headerData.Book_now_button_text}
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default HeaderClient
