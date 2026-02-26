import Header from 'components/Header'
import React from 'react'

const Inventory = () => {
  return (
    <main className='dashboard wrapper'>
        <Header
            title={`Inventory page`}
            description="Manage inventory"
        />
        All inventory 
    </main>
  )
}

export default Inventory
