import { MangoAccount } from '@blockworks-foundation/mango-v4'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import mangoStore from '../../store/state'
import DetailedAreaChart from '../shared/DetailedAreaChart'

const AccountChart = ({
  chartToShow,
  data,
  hideChart,
  mangoAccount,
  yKey,
}: {
  chartToShow: string
  data: Array<any>
  hideChart: () => void
  mangoAccount: MangoAccount
  yKey: string
}) => {
  const { t } = useTranslation('common')
  const actions = mangoStore((s) => s.actions)
  const [daysToShow, setDaysToShow] = useState<number>(1)
  const loading = mangoStore((s) => s.mangoAccount.stats.performance.loading)

  const handleDaysToShow = (days: number) => {
    setDaysToShow(days)
    actions.fetchAccountPerformance(mangoAccount.publicKey.toString(), days)
  }

  return (
    <DetailedAreaChart
      data={data}
      daysToShow={daysToShow}
      hideChart={hideChart}
      loading={loading}
      setDaysToShow={handleDaysToShow}
      tickFormat={(x) => `$${x.toFixed(2)}`}
      title={t(chartToShow)}
      xKey="time"
      yKey={yKey}
    />
  )
}

export default AccountChart