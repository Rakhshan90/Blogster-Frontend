import React from 'react'
import PublicNavbar from './Public/PublicNavbar'
import PrivateNavbar from './Private/PrivateNavbar'
import AdminNavbar from './Admin/AdminNavbar'
import { useSelector } from 'react-redux'

const Navbar = () => {
    //get user from store
    const state = useSelector(state => state.users);
    const {userAuth} = state;
    const isAdmin = userAuth?.isAdmin;

    
    return (
        <>
            {isAdmin ? <AdminNavbar isLogin={userAuth} /> : userAuth ? <PrivateNavbar isLogin={userAuth} /> : <PublicNavbar />}
        </>
    )
}

export default Navbar