import { UserIcon, SettingsIcon, BellIcon, LogOutIcon, CreditCardIcon, ShoppingCart, LayoutDashboard, ListOrderedIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux';
import { removeUser } from '../Authentication/AuthSlice/userSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router';


const userItems = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
  {
    icon: ShoppingCart,
    property: 'Cart'
  },
  {
    icon: ListOrderedIcon,
    property: 'Orders'
  },
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
];

const adminItems = [
  {
    icon: UserIcon,
    property: 'Profile'
  },
  {
    icon: LayoutDashboard,
    property: 'admin-panel'
  },
  {
    icon: LogOutIcon,
    property: 'Sign Out'
  }
];


export default function DropdownProfile({ user }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const listItems = user.role === 'user' ? userItems : adminItems;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon' className='overflow-hidden rounded-full'>
          <img src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuGroup>
          {listItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                switch (item.property) {
                  case 'Sign Out':
                    dispatch(removeUser());
                    nav('/login');
                    break;
                  case 'admin-panel':
                    nav('/admindashboard');
                    break;
                  case 'Cart':
                    nav('/checkout');
                    break;
                  case 'Orders':
                    nav('/orders');
                    break;
                }
              }}
            >
              <item.icon />
              <span className='text-popover-foreground'>{item.property}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

