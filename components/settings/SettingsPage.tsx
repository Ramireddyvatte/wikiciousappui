import AnimationSettings from './AnimationSettings'
import DisplaySettings from './DisplaySettings'
import PreferredExplorerSettings from './PreferredExplorerSettings'
import SoundSettings from './SoundSettings'

const SettingsPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 border-b border-th-bkg-3 lg:col-span-8 lg:col-start-3">
        <DisplaySettings />
      </div>
      <div className="col-span-12 border-b border-th-bkg-3 pt-8 lg:col-span-8 lg:col-start-3">
        <AnimationSettings />
      </div>
      <div className="col-span-12 border-b border-th-bkg-3 pt-8 lg:col-span-8 lg:col-start-3">
        <SoundSettings />
      </div>
      <div className="col-span-12 pt-8 lg:col-span-8 lg:col-start-3">
        <PreferredExplorerSettings />
      </div>
    </div>
  )
}

export default SettingsPage
