import React from 'react'
import { Outlet, redirect } from 'react-router'
import * as Navs from '@syncfusion/ej2-react-navigations'
import NavItems from 'components/NavItems'
import MobileSidebar from 'components/MobileSidebar'
import { account } from '~/appwrite/client'
import { getExistingUser, storeUserData } from '~/appwrite/auth'
export async function clientLoader() {
    try {
        const user = await account.get();

        if(!user.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);

        if(existingUser?.status === 'user') {
            return redirect('/');
        }

        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (e) {
        console.log('Error in clientLoader', e)
        return redirect('/sign-in')
    }
}

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
