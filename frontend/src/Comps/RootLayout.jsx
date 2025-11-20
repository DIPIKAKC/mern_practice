import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'

export default function RootLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
