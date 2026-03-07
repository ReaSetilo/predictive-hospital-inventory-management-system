import React from 'react'
import { calculateTrendPercentage, cn } from '~/lib/utils'

const StatsCard = ({ headerTitle, total, ...props }: StatsCard) => {
  const renderCardMeta = () => {
    switch (props.variant) {
      case 'monthly': {
        const { trend, percentage } = calculateTrendPercentage(
          props.currentMonthCount,
          props.lastMonthCount
        )

        const isDecrement = trend === 'decrement'

        return (
          <>
            <div className="flex items-center gap-2">
              <figure className="flex items-center gap-1">
                <img
                  src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`}
                  className="size-5"
                  alt="arrow"
                />
                <figcaption
                  className={cn(
                    'text-sm font-medium',
                    isDecrement ? 'text-red-500' : 'text-success-700'
                  )}
                >
                  {Math.round(percentage)}%
                </figcaption>
              </figure>
              <p className="text-sm font-medium text-gray-100 truncate">
                vs last month
              </p>
            </div>

            <img 
  src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg'}`} 
  className="w-full h-auto max-h-20 md:max-h-32 xl:w-32 xl:h-full xl:max-h-full" 
  alt="trend graph" 
/>
          </>
        )
      }

      case 'daysLeft':
        return (
          <p className="text-sm font-medium text-gray-100">
            {props.daysLeft} days left
          </p>
        )

      case 'timeLeft':
        return (
          <p className="text-sm font-medium text-gray-100">
            {props.timeLeft} left
          </p>
        )

      case 'approved':
        return (
          <p className="text-sm font-medium text-gray-100">
            {props.approved} approved
          </p>
        )

      default:
        return null
    }
  }

  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>

      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>
          {renderCardMeta()}
        </div>
      </div>
    </article>
  )
}

export default StatsCard