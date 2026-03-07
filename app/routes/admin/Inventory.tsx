import Header from 'components/Header'
import React from 'react'
import * as Grids from '@syncfusion/ej2-react-grids'
import { inventoryItems } from '~/constants'
import { useState, useEffect } from 'react'

const Inventory = () => {
  return (
    <main className='dashboard wrapper'>
        <Header
        title="Inventory Management"
        description="View and manage all inventory items in the system"
        ctaText="Create a trip"
        ctaUrl="/inventory/order"
      />

      

        <Grids.GridComponent
          dataSource={inventoryItems}
          allowPaging={true}
          allowSorting={true}
          allowFiltering={true}
          pageSettings={{ pageSize: 10, pageSizes: [10, 25, 50, 100] }}
          filterSettings={{ type: 'Excel' }}
          width="100%"
        >
  <Grids.ColumnsDirective>
    <Grids.ColumnDirective
      field="$id"
      headerText="ID"
      width="120"
      isPrimaryKey={true}
      textAlign="Center"
    />

    <Grids.ColumnDirective
      field="name"
      headerText="Item Name"
      width="220"
    />

    <Grids.ColumnDirective
      field="category"
      headerText="Category"
      width="140"
      textAlign="Center"
    />

    <Grids.ColumnDirective
      field="quantity"
      headerText="Quantity"
      width="120"
      textAlign="Center"
    />

    <Grids.ColumnDirective
      field="expiryDate"
      headerText="Expiry Date"
      width="150"
      format="yMd"
      type="date"
      textAlign="Center"
    />

    <Grids.ColumnDirective
      field="$createdAt"
      headerText="Created At"
      width="150"
      format="yMd"
      type="date"
      textAlign="Center"
    />
  </Grids.ColumnsDirective>

      <Grids.Inject services={[Grids.Page, Grids.Sort, Grids.Filter]} />
    </Grids.GridComponent>
    </main>
  )
}

export default Inventory