import React from 'react'
import { useSelector } from 'react-redux';
import UpdateUser from '../../Comps/usercomponents/UpdateUser';

export default function UserProfile() {
    const { user } = useSelector((state) => state.userSlice);
    return (
        <div className="grid grid-cols-[1fr_1.5fr]">

            <div>
                <UpdateUser user={user} />
            </div>

        </div>
    )
}
