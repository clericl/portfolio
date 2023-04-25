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
import { useSpring, animated, easings } from "@react-spring/web";

import moethennessy from '../../assets/projects/moethennessy.mp4'
import rosewrapped from '../../assets/projects/rosewrapped.mp4'
import kennethcole from '../../assets/projects/kennethcole.mp4'
import arbor from '../../assets/projects/arbor.mp4'

import './index.scss'

const MODALS: Modals = {
  moethennessy: {
    title: 'Moët-Hennessy Concierge Experience',
    video: moethennessy,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          In a partnership with creative agency Admerasia, we at ROSE developed an augmented reality experience for Moët-Hennessy's Concierge, a campaign highlighting top-shelf spirits and champagne under the Moët-Hennessy umbrella. This AR experience placed a virtual beverage expert in the user's environment to engage the user with a series of questions, identifying the bottle best suited to the user's personality type.
        </p>
        <p className="modal-text">
          Try it <a href="https://www.8thwall.com/rosedigital/moethennessy-concierge" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </div>
    ]
  },
  kennethcole: {
    title: 'Kenneth Cole Instagram Filter',
    video: kennethcole,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          As part of a multi-pronged augmented reality strategy, we at ROSE developed both web and social media app-based experiences to support the opening of Kenneth Cole's newest real-world store in SoHo, New York City. Shown here is the Instagram filter we created to place dynamic campaign slogans in the user's environment.
        </p>
      </div>
    ]
  },
  rosewrapped: {
    title: 'ROSE Wrapped 2022',
    video: rosewrapped,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          To cap off another successful year at ROSE, we assembled campaign footage and statistics from the projects we completed to create a snappy highlight reel. Featured were projects for Bloomingdale's, Selfridges, Miami Design District, Mastercard, BET+, and more.
        </p>
        <p className="modal-text">
          Check it out <a href="https://wrapped.builtbyrose.co/" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </div>
    ]
  },
  arbor: {
    title: 'Arbor',
    video: arbor,
    text: [
      <div key={1} className="body">
        <p className="modal-text">
          Arbor is an etymology-finding tool that traces the ancestors of a given word and then recursively finds related words that stem from each ancestor. This personal project was inspired by my background in linguistics, my interest in data visualization, and the invaluable community-gathered resources collected in spaces like Wiktionary.
        </p>
        <p className="modal-text">
          Try it <a href="https://arbor.ericliang.dev" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </div>
    ]
  }
}

type Modals = {
  [key: string]: {
    title: ReactNode,
    video: string,
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
        duration: 200,
        easing: easings.easeOutQuad,
      },
    })

    contentApi.start({
      opacity: modalOpen ? 1 : 0,
      delay: modalOpen ? 300 : 0,
      config: {
        duration: 200,
        easing: easings.easeOutQuad,
      },
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
        <div className="modal-details">
          <h2 className="modal-title">
            {contentToDisplay.title}
          </h2>
          {contentToDisplay.text}
        </div>
        <div className="modal-media">
          <video src={contentToDisplay.video} muted loop autoPlay playsInline />
        </div>
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
