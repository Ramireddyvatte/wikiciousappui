import { Transition } from '@headlessui/react'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, useEffect, useState } from 'react'
import { ModalProps } from '../../types/modal'
import { PROFILE_CATEGORIES } from '../../utils/profile'
import Input from '../forms/Input'
import Label from '../forms/Label'
import Select from '../forms/Select'
import Button, { LinkButton } from '../shared/Button'
import InlineNotification from '../shared/InlineNotification'
import Modal from '../shared/Modal'
import useLocalStorageState from '../../hooks/useLocalStorageState'
import { CheckCircleIcon } from '@heroicons/react/solid'
import WalletSelect from '../wallet/WalletSelect'
import { useWallet } from '@solana/wallet-adapter-react'
import { handleWalletConnect } from '../../utils/wallet'
import mangoStore from '../../store/state'
import { IS_ONBOARDED_KEY } from '../shared/Layout'
import DepositTokenList from '../shared/DepositTokenList'
import { EnterRightExitLeft } from '../shared/Transitions'

const UserSetupModal = ({ isOpen, onClose }: ModalProps) => {
  const { t } = useTranslation()
  const { connected, wallet } = useWallet()
  const mangoAccount = mangoStore((s) => s.mangoAccount)
  const [profileName, setProfileName] = useState('')
  const [accountName, setAccountName] = useState('')
  const [profileCategory, setProfileCategory] = useState('')
  const [showSetupStep, setShowSetupStep] = useState(0)
  // const [acceptRisks, setAcceptRisks] = useState(false)
  const [depositToken, setDepositToken] = useState('')
  const [, setIsOnboarded] = useLocalStorageState(IS_ONBOARDED_KEY)

  const handleNextStep = () => {
    setShowSetupStep(showSetupStep + 1)
  }

  const handleSaveProfile = () => {
    // save profile details to db then:

    setShowSetupStep(3)
  }

  const handleCreateAccount = () => {
    // create account then:

    setShowSetupStep(4)
  }

  const handleDeposit = () => {
    // deposit funds then:

    setIsOnboarded(true)
    onClose()
  }

  const handleEndOnboarding = () => {
    setIsOnboarded(true)
    onClose()
  }

  const connectWallet = () => {
    if (wallet) {
      handleWalletConnect(wallet)
    }
  }

  useEffect(() => {
    if (connected && mangoAccount) {
      onClose()
      setIsOnboarded(true)
    }
    if (connected && !mangoAccount) {
      setShowSetupStep(2)
    }
  }, [mangoAccount, connected, onClose, setIsOnboarded])

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideClose>
      <div className="absolute top-0 left-0 flex h-0.5 w-full flex-grow bg-th-bkg-4">
        <div
          style={{
            width: `${(showSetupStep / 4) * 100}%`,
          }}
          className="default-transition flex rounded bg-th-primary"
        ></div>
      </div>
      <div className="h-[392px]">
        <Transition
          appear={true}
          className="absolute top-0.5 left-0 z-20 h-full w-full bg-th-bkg-1 p-6"
          show={showSetupStep === 0}
          enter="transition-all ease-in duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all ease-out duration-500"
          leaveFrom="transform translate-x-0"
          leaveTo="transform -translate-x-full"
        >
          <h2 className="mb-1">Welcome.</h2>
          <p className="mb-4">
            {
              "You're seconds away from trading the most liquid dex markets on Solana."
            }
          </p>
          <div className="mb-6 space-y-2 border-y border-th-bkg-4 py-4">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-th-green" />
              <p className="text-th-fgd-1">Trusted by 1,000s of DeFi users</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-th-green" />
              <p className="text-th-fgd-1">Deeply liquid markets</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-th-green" />
              <p className="text-th-fgd-1">
                Up to 20x leverage across 100s of tokens
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-th-green" />
              <p className="text-th-fgd-1">Earn interest on your deposits</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-th-green" />
              <p className="text-th-fgd-1">
                Borrow 100s of tokens with many collateral options
              </p>
            </div>
          </div>
          <Button className="w-full" onClick={handleNextStep} size="large">
            {"Let's Go"}
          </Button>
        </Transition>
        <EnterRightExitLeft
          className="absolute top-0.5 left-0 z-20 w-full bg-th-bkg-1 p-6"
          show={showSetupStep === 1}
          style={{ height: 'calc(100% - 12px)' }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <h2 className="mb-4">Choose Wallet</h2>
              <div className="thin-scroll max-h-56 overflow-y-auto">
                <WalletSelect />
              </div>
            </div>
            <Button className="w-full" onClick={connectWallet} size="large">
              Connect
            </Button>
          </div>
        </EnterRightExitLeft>
        <EnterRightExitLeft
          className="absolute top-0.5 left-0 z-20 w-full bg-th-bkg-1 p-6"
          show={showSetupStep === 2}
          style={{ height: 'calc(100% - 12px)' }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="pb-4">
                <h2 className="mb-1">Create Profile</h2>
                <p>Your public facing identity on Mango...</p>
              </div>
              <div className="pb-4">
                <Label text="Profile Name" />
                <Input
                  type="text"
                  value={profileName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setProfileName(e.target.value)
                  }
                />
              </div>
              <div className="pb-6">
                <Label text="Profile Category" />
                <Select
                  value={profileCategory}
                  onChange={(cat: string) => setProfileCategory(cat)}
                  className="w-full"
                >
                  {PROFILE_CATEGORIES.map((cat) => (
                    <Select.Option key={cat} value={cat}>
                      {cat}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Button
                className="mb-4 w-full"
                onClick={handleSaveProfile}
                size="large"
              >
                Save Profile
              </Button>
              <LinkButton onClick={handleNextStep}>Skip for now</LinkButton>
            </div>
          </div>
        </EnterRightExitLeft>
        <EnterRightExitLeft
          className="absolute top-0.5 left-0 z-20 w-full bg-th-bkg-1 p-6"
          show={showSetupStep === 3}
          style={{ height: 'calc(100% - 12px)' }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="pb-4">
                <h2 className="mb-1">Account Setup</h2>
                <p>You need a Mango Account to DeFi on Mango</p>
              </div>
              <div className="pb-4">
                {/* Not sure if we need to name the first account or if every users first account should have the same name "Main Account" or something similar */}

                <Label text="Account Name" optional />
                <Input
                  type="text"
                  value={accountName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAccountName(e.target.value)
                  }
                />
              </div>
              <InlineNotification type="info" desc={t('insufficient-sol')} />
            </div>
            <div className="flex items-center justify-between">
              <Button
                className="w-full"
                onClick={handleCreateAccount}
                size="large"
              >
                Create Account
              </Button>
            </div>
          </div>
        </EnterRightExitLeft>
        <EnterRightExitLeft
          className="absolute top-0.5 left-0 z-20 w-full bg-th-bkg-1 p-6"
          show={showSetupStep === 4}
          style={{ height: 'calc(100% - 12px)' }}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="pb-4">
                <h2 className="mb-1">Fund Your Account</h2>
              </div>
              <DepositTokenList onSelect={setDepositToken} />
            </div>
            <div className="flex flex-col items-center">
              <Button
                onClick={handleDeposit}
                className="mb-4 w-full"
                size="large"
              >
                Deposit
              </Button>
              <LinkButton onClick={handleEndOnboarding}>
                Skip for now
              </LinkButton>
            </div>
          </div>
        </EnterRightExitLeft>
      </div>
    </Modal>
  )
}

export default UserSetupModal