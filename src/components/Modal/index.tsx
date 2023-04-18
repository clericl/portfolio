import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useSpring, animated, config } from "@react-spring/web";

import './index.scss'

const MODALS: Modals = {
  moethennessy: {
    title: 'Moët-Hennessy Concierge Experience',
    text: [
      <>
        <span key={1}>
          In a partnership with creative agency Admerasia, ROSE created an augmented reality experience as a part of Moët-Hennessy's Concierge campaign to highlight top-shelf bottles of both spirits and champagne under the Moët-Hennessy brand umbrella. This AR experience placed a virtual beverage expert in the user's environment, who then engaged the user with a series of questions to identify the bottle best suited to the user's personality type.
        </span>
        <span key={2}>
          Try it <a href="https://www.8thwall.com/rosedigital/moethennessy-concierge" target="_blank" rel="noopener noreferrer">here</a>.
        </span>
      </>
    ]
  }
}

type Modals = {
  [key: string]: {
    title: ReactNode,
    text: ReactNode,
  }
}

export const ModalContext = createContext({
  modalOpen: false,
  modalType: '',
  openModal: (key: string) => {},
  closeModal: () => {},
})

export function ModalController({ children }: ModalControllerProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = useCallback((key: string) => {
    setModalOpen(true)
    setModalType(key)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setModalType('')
  }, [])

  const value = useMemo(() => ({
    modalOpen,
    modalType,
    openModal,
    closeModal,
  }), [
    modalOpen,
    modalType,
    openModal,
    closeModal
  ])

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

interface ModalControllerProps {
  children: ReactNode
}

function Modal() {
  const {
    closeModal,
    modalOpen,
    modalType,
  } = useContext(ModalContext)
  const [backgroundSprings, backgroundApi] = useSpring(() => ({
    opacity: 0,
    pointerEvents: 'none',
  }))
  const [contentSprings, contentApi] = useSpring(() => ({
    opacity: 0,
  }))

  const contentToDisplay = useMemo(() => MODALS[modalType] || MODALS['moethennessy'], [modalType])

  useEffect(() => {
    backgroundApi.start({
      opacity: modalOpen ? 1 : 0,
      pointerEvents: modalOpen ? 'all' : 'none',
      delay: modalOpen ? 0 : 200,
      config: {
        tension: 240,
        friction: 19,
      },
    })

    contentApi.start({
      opacity: modalOpen ? 1 : 0,
      delay: modalOpen ? 200 : 0,
    })
  }, [backgroundApi, contentApi, modalOpen])

  return (
    <animated.div
      className="modal"
      onClick={closeModal}
      // @ts-ignore
      style={backgroundSprings}
    >
      <animated.div className="modal-contents" style={contentSprings}>
        <h2 className="modal-title">
          {contentToDisplay.title}
        </h2>
        <p className="modal-text">
          {contentToDisplay.text}
        </p>
      </animated.div>
    </animated.div>
  )
}

export default Modal
