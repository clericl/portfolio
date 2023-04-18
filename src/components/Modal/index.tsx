import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  MouseEvent,
  ReactNode,
} from "react";
import { useSpring, animated } from "@react-spring/web";

import './index.scss'

const MODALS: Modals = {
  moethennessy: {
    title: 'Moët-Hennessy Concierge Experience',
    text: [
      <div key={1}>
        <p className="modal-text">
          In a partnership with creative agency Admerasia, ROSE developed an augmented reality experience for Moët-Hennessy's Concierge, a campaign highlighting top-shelf spirits and champagne under the Moët-Hennessy umbrella. This AR experience placed a virtual beverage expert in the user's environment to engage the user with a series of questions, identifying the bottle best suited to the user's personality type.
        </p>
        <p className="modal-text">
          Try it <a href="https://www.8thwall.com/rosedigital/moethennessy-concierge" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </div>
    ]
  },
  kennethcole: {
    title: 'Kenneth Cole Instagram Filter',
    text: [
      <div key={1}>
        <p className="modal-text">
          As part of a multi-pronged augmented reality strategy, I led the AR engineering team at ROSE to develop both web and social media app-based experiences to support the opening of Kenneth Cole's newest real-world store in SoHo, New York City.
        </p>
      </div>
    ]
  },
  rosewrapped: {
    title: 'ROSE Wrapped 2022',
    text: [
      <div key={1}>
        <p className="modal-text">
          To cap off another successful year at ROSE, I worked with our creative team to put together a highlight reel that featured our work for Bloomingdale's, Selfridges, Miami Design District, Mastercard, BET+, and more.
        </p>
        <p className="modal-text">
          Check it out <a href="https://wrapped.builtbyrose.co/" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </div>
    ]
  },
  arbor: {
    title: 'Arbor',
    text: [
      <div key={1}>
        <p className="modal-text">
          Arbor is an etymology-finding tool that traces the ancestors of a given word and then recursively finds related words that stem from each ancestor. This personal project was inspired by my background in linguistics, my interest in data visualization, and the invaluable community-gathered resources collected in spaces like Wiktionary.
        </p>
        <p className="modal-text">
          Try it <a href="https://clericl.github.io/arbor" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </div>
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

  const contentToDisplay = useMemo(() => MODALS[modalType], [modalType])

  const handleClose = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal()
  }, [closeModal])

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

  return contentToDisplay && (
    <animated.div
      className="modal"
      onClick={handleClose}
      // @ts-ignore
      style={backgroundSprings}
    >
      <animated.div className="modal-contents" style={contentSprings}>
        <h2 className="modal-title">
          {contentToDisplay.title}
        </h2>
        {contentToDisplay.text}
        <div className="close-button" onClick={closeModal}>
          <button>
            <span className="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
      </animated.div>
    </animated.div>
  )
}

export default Modal
