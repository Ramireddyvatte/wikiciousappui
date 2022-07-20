import ContentBox from '../shared/ContentBox'
import mangoStore from '../../store/state'
import AccountActions from './AccountActions'
import { toUiDecimals, HealthType } from '@blockworks-foundation/mango-v4'
import { formatDecimal } from '../../utils/numbers'

const MangoAccount = () => {
  const mangoAccount = mangoStore((s) => s.mangoAccount)

  return (
    <ContentBox showBackground>
      <div className="flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-th-fgd-4">Account Value</div>
          <div className="text-th-fgd-3">
            $
            {mangoAccount
              ? formatDecimal(
                  toUiDecimals(mangoAccount.getEquity().toNumber()),
                  2
                )
              : (0).toFixed(2)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-th-fgd-4">Free Collateral</div>
          <div className="text-th-fgd-3">
            $
            {mangoAccount
              ? formatDecimal(
                  toUiDecimals(mangoAccount.getCollateralValue().toNumber()),
                  2
                )
              : (0).toFixed(2)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-th-fgd-4">Health</div>
          <div className="text-th-fgd-3">
            {mangoAccount
              ? mangoAccount.getHealthRatio(HealthType.init).toNumber()
              : 100}
            %
          </div>
        </div>
      </div>
      <div className="mt-6">
        <AccountActions />
      </div>
    </ContentBox>
  )
}

export default MangoAccount