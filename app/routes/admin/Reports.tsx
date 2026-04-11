import React from 'react'
import Header from 'components/Header'

// Syncfusion Charts
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Category,
  Legend,
  Tooltip,
  AreaSeries,
  BarSeries,
} from '@syncfusion/ej2-react-charts'

// Syncfusion Grid
import * as Grids from '@syncfusion/ej2-react-grids'
import { consumptionData, demandData, inventoryReport } from '~/constants'

const Reports = () => {
  return (
    <main className="dashboard wrapper">
      <Header
        title="Reports & Analytics"
        description="Monitor demand forecasts, consumption trends, and inventory health"
      />

      {/* ================= DEMAND FORECAST ================= */}
      <section className="card">
        <h3 className="card-title">Demand Forecast — Next 30 Days</h3>

        <ChartComponent
          primaryXAxis={{ valueType: 'Category' }}
          tooltip={{ enable: true }}
          legendSettings={{ visible: true }}
        >
          <Inject services={[LineSeries, AreaSeries, Category, Legend, Tooltip]} />

          <SeriesCollectionDirective>
            {/* Forecast range */}
            <SeriesDirective
              dataSource={demandData}
              xName="day"
              yName="high"
              type="Area"
              opacity={0.2}
              name="Forecast range (high)"
            />

            <SeriesDirective
              dataSource={demandData}
              xName="day"
              yName="low"
              type="Area"
              opacity={0.2}
              name="Forecast range (low)"
            />

            {/* Forecast line */}
            <SeriesDirective
              dataSource={demandData}
              xName="day"
              yName="value"
              type="Line"
              name="Forecast"
              dashArray="5,5"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </section>

      {/* ================= TOP CONSUMPTION ================= */}
      <section className="card">
        <h3 className="card-title">Top Consumption This Week</h3>

        <ChartComponent
          primaryXAxis={{ valueType: 'Category' }}
          primaryYAxis={{ title: 'Usage' }}
          tooltip={{ enable: true }}
        >
          <Inject services={[BarSeries, Category, Tooltip]} />

          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={consumptionData}
              xName="item"
              yName="value"
              type="Bar"
              name="Consumption"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </section>

      {/* ================= INVENTORY REPORT ================= */}
      <section className="card">
        <h3 className="card-title">Inventory Status</h3>

        <Grids.GridComponent
          dataSource={inventoryReport}
          allowPaging
          pageSettings={{ pageSize: 5 }}
        >
          <Grids.ColumnsDirective>
            <Grids.ColumnDirective field="name" headerText="Item" width="220" />
            <Grids.ColumnDirective field="stock" headerText="Stock" width="120" textAlign="Center" />
            <Grids.ColumnDirective field="status" headerText="Status" width="120" textAlign="Center" />
            <Grids.ColumnDirective field="days" headerText="Days Left" width="120" textAlign="Center" />
          </Grids.ColumnsDirective>

          <Grids.Inject services={[Grids.Page]} />
        </Grids.GridComponent>
      </section>
    </main>
  )
}

export default Reports