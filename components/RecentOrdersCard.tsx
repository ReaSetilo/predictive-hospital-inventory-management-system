import React from 'react';
import * as Grids from '@syncfusion/ej2-react-grids';
import { orderItems } from '~/constants';

const RecentOrdersCard = () => {
  return (
    <div className="recent-orders-card">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

      <Grids.GridComponent
        dataSource={orderItems}
        allowPaging={true}
        allowSorting={true}
        allowFiltering={false}  // No filtering as requested
        pageSettings={{ pageSize: 8, pageSizes: [5, 8, 10, 20] }}
        width="100%"
      >
        <Grids.ColumnsDirective>
          <Grids.ColumnDirective
            field="orderNo"
            headerText="Order No."
            width="180"
            isPrimaryKey={true}
            textAlign="Left"
          />

          <Grids.ColumnDirective
            field="Date"
            headerText="Order Date"
            width="140"
            format="yMd"
            type="date"
            textAlign="Center"
          />

          <Grids.ColumnDirective
            field="category"
            headerText="Category"
            width="120"
            textAlign="Center"
          />

          <Grids.ColumnDirective
            field="quantity"
            headerText="Quantity"
            width="110"
            textAlign="Right"
            format="N0"
          />
        </Grids.ColumnsDirective>

        <Grids.Inject services={[Grids.Page, Grids.Sort]} />
      </Grids.GridComponent>
    </div>
  );
};

export default RecentOrdersCard;