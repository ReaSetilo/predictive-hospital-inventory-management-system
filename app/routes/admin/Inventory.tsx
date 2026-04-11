import Header from 'components/Header'
import React from 'react'
import * as Grids from '@syncfusion/ej2-react-grids'
import { inventoryItems } from '~/constants'
import { useState, useEffect } from 'react'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { showLowStockAlert, showExpiryAlert } from '~/lib/notifications'

const Inventory = () => {
  const checkForAlerts = () => {
    // Simulate checking inventory for alerts
    const lowStockThreshold = 50;
    const expiryThresholdDays = 30;

    inventoryItems.forEach(item => {
      // Check low stock
      if (item.quantity < lowStockThreshold) {
        showLowStockAlert(item.name, item.quantity, lowStockThreshold);
      }

      // Check expiry (simplified - in real app, calculate days until expiry)
      if (item.expiryDate) {
        const expiryDate = new Date(item.expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntilExpiry <= expiryThresholdDays && daysUntilExpiry > 0) {
          showExpiryAlert(item.name, daysUntilExpiry);
        }
      }
    });
  };

  return (
    <main className='dashboard wrapper'>
        <Header
        title="Inventory Management"
        description="View and manage all inventory items in the system"
        ctaText="Add inventory"
        ctaUrl="/inventory/add"
      />

      <div className="mb-4">
        <ButtonComponent
          cssClass="e-primary"
          onClick={checkForAlerts}
        >
          Check for Alerts
        </ButtonComponent>
      </div>

      

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