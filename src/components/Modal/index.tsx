import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useSpring, animated } from "@react-spring/web";

import './index.scss'

export const ModalContext = createContext({
  modalOpen: false,
  modalType: '',
  openModal: (key: 'string') => {},
  closeModal: () => {},
})

export function ModalController({ children }: ModalControllerProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = useCallback((key: 'string') => {
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

  useEffect(() => {
    backgroundApi.start({
      opacity: modalOpen ? 1 : 0,
      pointerEvents: modalOpen ? 'all' : 'none',
    })
  }, [backgroundApi, modalOpen])

  return (
    <animated.div
      className="modal"
      onClick={closeModal}
      // @ts-ignore
      style={backgroundSprings}
    >
      <div className="modal-contents">
        this is a modal!!!
      </div>
    </animated.div>
  )
}

export default Modal
