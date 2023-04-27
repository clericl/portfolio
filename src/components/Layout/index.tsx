import { useState } from 'react'
import isIosSafari from '../../utils/isIosSafari'
import Modal, { ModalController } from '../Modal'
import Navigation from '../Navigation'
import SafariMessage from '../SafariMessage'
import Scene from '../Scene'

import './index.scss'

function Layout() {
  const [showSafariMessage, setShowSafariMessage] = useState(true)
  const iosSafari = isIosSafari()

  const dismissSafariMessage = () => {
    setShowSafariMessage(false)
  }

  return (
    <ModalController>
      {iosSafari && showSafariMessage ? (
        <SafariMessage dismiss={dismissSafariMessage} />
      ) : (
        <div className="layout">
          <Navigation />
          <Scene />
          <Modal />
        </div>
      )}
    </ModalController>
  )
}

export default Layout
