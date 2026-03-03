declare interface BaseStatsCard {
  headerTitle: string
  total: number | string
}

declare interface MonthlyStatsCard extends BaseStatsCard {
  variant: 'monthly'
  lastMonthCount: number
  currentMonthCount: number
}

declare interface DaysLeftStatsCard extends BaseStatsCard {
  variant: 'daysLeft'
  daysLeft: number
}

declare interface TimeLeftStatsCard extends BaseStatsCard {
  variant: 'timeLeft'
  timeLeft: string
}

declare interface ApprovedStatsCard extends BaseStatsCard {
  variant: 'approved'
  approved: number | string
}

declare type StatsCard =
  | MonthlyStatsCard
  | DaysLeftStatsCard
  | TimeLeftStatsCard
  | ApprovedStatsCard