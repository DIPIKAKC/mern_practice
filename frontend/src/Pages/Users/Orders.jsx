import React from 'react'
import OrderList from '../../Comps/usercomponents/OrderList'
import { useSelector } from 'react-redux'

export default function Orders() {
    const { user } = useSelector((state) => state.userSlice)
    return (
        <div>
            <OrderList user={user} />
        </div>
    )
}
