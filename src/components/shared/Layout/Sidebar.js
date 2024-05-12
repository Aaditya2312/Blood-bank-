import React from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { userMenu } from './Menus/userMenu'
import { useSelector } from 'react-redux'


const Sidebar = () => {
    //GET USER STATE
    const { user } = useSelector(state => state.auth)
    const location = useLocation()
    return (
        <div>
            <div className='sidebar' style={{ height: '100%', '!important': true, overflow: 'hidden' }}>
                <div className='menu'>
                    {user?.role === 'organisation' && (
                        <>
                            <div className={`menu-item ${location.pathname === "/" && "active"}`}>
                                <i className="fa-solid fa-droplet"></i>
                                <Link to="/">Blood Donation and Transfusion</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === "/donar" && "active"}`}>
                                <i className="fa-solid fa-people-group"></i>
                                <Link to="/donar">Donors</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === "/hospital" && "active"}`}>
                                <i className="fa-solid fa-people-group"></i>
                                <Link to="/hospital">Consumers</Link>
                            </div>
                        </>
                    )}
                    {user?.role === 'admin' && (
                        <>
                            <div className={`menu-item ${location.pathname === "/donar-list" && "active"}`}>
                                <i className="fa-solid fa-people-group"></i>
                                <Link to="/donar-list">Donor List</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === "/org-list" && "active"}`}>
                                <i className='fa-solid fa-warehouse'></i>
                                <Link to="/org-list">Organisation List</Link>
                            </div>
                            <div className={`menu-item ${location.pathname === "/hospital-list" && "active"}`}>
                                <i className="fa-solid fa-people-group"></i>
                                <Link to="/hospital-list">Consumers</Link>
                            </div>
                        </>
                    )}

                    {(user?.role === 'donar' || user?.role === 'hospital') && (
                        <div className={`menu-item ${location.pathname === "/organisation" && "active"}`}>
                            <i className='fa-solid fa-warehouse'></i>
                            <Link to="/organisation">Organisation</Link>
                        </div>
                    )}

                    {user?.role === 'hospital' && (
                        <div className={`menu-item ${location.pathname === "/consumer" && "active"}`}>
                            <i className="fa-solid fa-people-group"></i>
                            <Link to="/consumer">Consumer</Link>
                        </div>
                    )}

                    {user?.role === 'donar' && (
                        <div className={`menu-item ${location.pathname === "/donation" && "active"}`}>
                            <i className="fa-solid fa-people-group"></i>
                            <Link to="/donation">Donation</Link>
                        </div>
                    )}

                    {/* {userMenu.map((menu) => {
                        const isActive = location.pathname === menu.path
                        return (
                            <div className={`menu-item ${isActive && 'active'}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        )

                    })} */}
                </div>
            </div>

        </div>
    )
}

export default Sidebar
