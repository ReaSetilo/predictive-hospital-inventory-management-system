import React from 'react'
import { Outlet, redirect } from 'react-router'
import MobileSidebar from 'components/MobileSidebar'
import * as Navs from '@syncfusion/ej2-react-navigations'
import NavItems from 'components/NavItems'


const AdminLayout = () => {
  return (
    <div className='admin-layout'>
        
        <MobileSidebar />

        <aside className='w-full max-w-[270px] hidden lg:block'>
            <Navs.SidebarComponent width={270} enableGestures={false}>
                <NavItems/>
            </Navs.SidebarComponent>
        </aside>

        <aside className='children'>
            <Outlet />
        </aside>
    </div>
  )
}

export default AdminLayout
