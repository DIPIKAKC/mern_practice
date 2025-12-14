
import { Button } from '@/components/ui/button'
import { NavLink, useNavigate } from 'react-router'
import DropdownProfile from './DropdownProfile';
import { useSelector } from 'react-redux';

export default function Header() {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice); //userslice ko matra initial state taneko
  return (
    <div className='bg-gray-200 flex px-8 py-2 items-center justify-between'>
      <h1 className='text-2xl font-bold cursor-pointer' onClick={()=>nav('/home')}>Shopal</h1>

      {user ? <DropdownProfile user={user} /> : <div className="space-x-5">
        <NavLink to={'/login'}>
          <Button variant="link" className={'text-[16px]'}>Login</Button>
        </NavLink>
        <NavLink to={'/signup'}>
          <Button>Sign Up</Button>
        </NavLink>

      </div>}
    </div>
  )
}
