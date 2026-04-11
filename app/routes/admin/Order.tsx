import React, { useState } from 'react'
import Header from 'components/Header'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { mockOrders } from '~/constants'


const statusColor: Record<string, string> = {
  Confirmed: 'bg-blue-600 text-white',
  Pending: 'bg-yellow-500 text-white',
  Cancelled: 'bg-red-500 text-white',
}

const Order = () => {
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0])

  const filtered = mockOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.supplier.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="dashboard wrapper">
      <Header
        title="Purchase Order Management"
        description="View and manage all orders"
        ctaText="Place Order"
        ctaUrl="/inventory/order"
      />

      <section className="flex gap-6 mt-6 flex-col lg:flex-row">
        {/* Left Panel — Search & List */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
          {/* Search Box */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <TextBoxComponent
              placeholder="Search order #"
              cssClass="e-outline"
              input={(e: { value: string }) => setSearch(e.value ?? '')}
              value={search}
              htmlAttributes={{ style: 'padding-left: 2rem;' }}
            />
          </div>

          {/* Order List */}
          <div className="flex flex-col gap-2">
            {filtered.length === 0 && (
              <p className="text-gray-400 text-sm px-1">No orders found.</p>
            )}
            {filtered.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`text-left rounded-xl border p-4 transition-all cursor-pointer ${
                  selectedOrder?.id === order.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-red-500 font-semibold text-sm">{order.id}</span>
                  <span className="text-gray-700 font-medium text-sm">{order.amount}</span>
                </div>
                <div className="text-gray-500 text-xs mb-2 flex justify-between">
                  <span>{order.supplier}</span>
                  <span>{order.date}</span>
                </div>
                <span className={`text-xs font-semibold px-3 py-0.5 rounded-full ${statusColor[order.status] ?? 'bg-gray-200'}`}>
                  {order.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel — Order Detail */}
        {selectedOrder && (
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-6">
            {/* Detail Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedOrder.id}</h2>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColor[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {selectedOrder.supplier} • {selectedOrder.date}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <ButtonComponent cssClass="e-outline e-primary !h-10 !px-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Invoice
                </ButtonComponent>
                <ButtonComponent cssClass="e-outline !h-10 !px-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Invoice
                </ButtonComponent>
              </div>
            </div>

            <div className="bg-gray-100 h-px w-full" />

            {/* Two-column detail cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Supplier Details */}
              <div className="rounded-xl border border-l-4 border-l-blue-500 border-gray-200 p-5 flex flex-col gap-3">
                <h3 className="text-blue-600 font-semibold flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Supplier Details
                </h3>
                <p className="font-semibold text-gray-800">{selectedOrder.details.supplier}</p>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {selectedOrder.details.supplierAddress}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {selectedOrder.details.supplierPhone}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {selectedOrder.details.supplierEmail}
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="rounded-xl border border-l-4 border-l-purple-500 border-gray-200 p-5 flex flex-col gap-3">
                <h3 className="text-purple-600 font-semibold flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Details
                </h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span><span className="text-gray-400">Order Date:</span> {selectedOrder.details.orderDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span><span className="text-gray-400">Location:</span> {selectedOrder.details.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span><span className="text-gray-400">Payment Method:</span> {selectedOrder.details.paymentMethod}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span><span className="text-gray-400">Created By:</span> {selectedOrder.details.createdBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                    </svg>
                    <span><span className="text-gray-400">Item:</span> {selectedOrder.details.itemName} ({selectedOrder.details.category})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <span><span className="text-gray-400">Quantity:</span> {selectedOrder.details.quantity} units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Order