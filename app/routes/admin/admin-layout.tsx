import React from 'react'
import { Outlet } from 'react-router'
import * as Navs from '@syncfusion/ej2-react-navigations'
import NavItems from 'components/NavItems'
import MobileSidebar from 'components/MobileSidebar'

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
