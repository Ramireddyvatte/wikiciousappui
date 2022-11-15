import { PerpMarket } from '@blockworks-foundation/mango-v4'
import ButtonGroup from '@components/forms/ButtonGroup'
import mangoStore from '@store/mangoStore'
import { useCallback, useMemo, useState } from 'react'
import { notify } from 'utils/notifications'

const PerpButtonGroup = () => {
  const side = mangoStore((s) => s.tradeForm.side)
  const selectedMarket = mangoStore((s) => s.selectedMarket.current)
  const mangoAccount = mangoStore((s) => s.mangoAccount.current)
  const tradeForm = mangoStore((s) => s.tradeForm)
  const [sizePercentage, setSizePercentage] = useState('')

  const leverageMax = useMemo(() => {
    const group = mangoStore.getState().group
    if (!mangoAccount || !group || !selectedMarket) return 100
    if (!(selectedMarket instanceof PerpMarket)) return 100

    try {
      if (side === 'buy') {
        return mangoAccount.getMaxQuoteForPerpBidUi(
          group,
          selectedMarket.perpMarketIndex
        )
      } else {
        return mangoAccount.getMaxBaseForPerpAskUi(
          group,
          selectedMarket.perpMarketIndex
        )
      }
    } catch (e) {
      console.error('PerpSlider: ', e)
      notify({
        type: 'error',
        title: 'Error calculating max leverage.',
      })
      return 0
    }
  }, [side, selectedMarket, mangoAccount])

  const handleSizePercentage = useCallback(
    (percentage: string) => {
      const set = mangoStore.getState().set
      setSizePercentage(percentage)
      const size = leverageMax * (Number(percentage) / 100)

      set((s) => {
        if (s.tradeForm.side === 'buy') {
          s.tradeForm.quoteSize = size.toString()

          if (Number(s.tradeForm.price)) {
            s.tradeForm.baseSize = (
              size / parseFloat(s.tradeForm.price)
            ).toString()
          } else {
            s.tradeForm.baseSize = ''
          }
        } else if (s.tradeForm.side === 'sell') {
          s.tradeForm.baseSize = size.toString()

          if (Number(s.tradeForm.price)) {
            s.tradeForm.quoteSize = (
              size * parseFloat(s.tradeForm.price)
            ).toString()
          }
        }
      })
    },
    [side, selectedMarket, mangoAccount]
  )

  return (
    <div className="w-full px-4">
      <ButtonGroup
        activeValue={sizePercentage}
        onChange={(p) => handleSizePercentage(p)}
        values={['25', '50', '75', '100']}
        unit="%"
      />
    </div>
  )
}

export default PerpButtonGroup