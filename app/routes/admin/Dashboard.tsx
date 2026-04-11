import Header from 'components/Header'
import RecentOrdersCard from 'components/RecentOrdersCard'
import StatsCard from 'components/StatsCard'
import React from 'react'

const Dashboard = () => {
  const dashboardStats = {
    totalItems: 12450,
    itemsAdded: { currentMonth: 3000, lastMonth: 2780 },
    expiringSoon: 502,
    daysLeft: 30,
    predictedShortages: 45,
    timeLeft: '10 days',
    pendingOrders: 10,
    approvedOrders: 45
  }

  return (
    <main className="dashboard wrapper">
      <Header
        title="Welcome 👋"
        description="Track activity and manage the system"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          <StatsCard
            variant="monthly"
            headerTitle="Total Items"
            total={dashboardStats.totalItems}
            currentMonthCount={dashboardStats.itemsAdded.currentMonth}
            lastMonthCount={dashboardStats.itemsAdded.lastMonth}
          />

          <StatsCard
            variant="daysLeft"
            headerTitle="Expiring Soon"
            total={dashboardStats.expiringSoon}
            daysLeft={dashboardStats.daysLeft}
          />

          <StatsCard
            variant="timeLeft"
            headerTitle="Predicted Shortages"
            total={dashboardStats.predictedShortages}
            timeLeft={dashboardStats.timeLeft}
          />

          <StatsCard
            variant="approved"
            headerTitle="Pending Orders"
            total={dashboardStats.pendingOrders}
            approved={dashboardStats.approvedOrders}
          />
        </div>
      </section>
      <section>
        <div>
          <RecentOrdersCard/>
        </div>
      </section>
    </main>
  )
}

export default Dashboard