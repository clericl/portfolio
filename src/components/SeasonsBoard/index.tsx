// @ts-nocheck

import { useMemo } from "react"
import { Color } from "three"
import useNeonMaterial from "../../utils/useNeonMaterial"
import MessageBoard from "../MessageBoard"

const MESSAGE = "I'm Eric, a full stack\nweb developer specializing\nin 3D and augmented reality\nexperiences."

function SeasonsBoard({ open = true, switchSeasons, ...props }: SeasonsBoardProps) {
  const neonMaterial = useNeonMaterial('#021040')

  const [springMat, summerMat, autumnMat, winterMat] = useMemo(() => {
    const spring = neonMaterial.clone()
    const summer = neonMaterial.clone()
    const autumn = neonMaterial.clone()
    const winter = neonMaterial.clone()
    spring.emissive = new Color(2, 1, 1)
    summer.emissive = new Color(0, 2, 0)
    autumn.emissive = new Color(2, 1, 0)
    winter.emissive = new Color(0, 0, 2)

    const text = neonMaterial.clone()
    text.color = new Color(1, 1.25, 1.25)

    return [spring, summer, autumn, winter, text]
  }, [neonMaterial])

  return (
    <MessageBoard
      bulbProps={{
        topLeft: {
          material: springMat,
        },
        topRight: {
          material: summerMat,
        },
        bottomLeft: {
          material: autumnMat,
        },
        bottomRight: {
          material: winterMat,
        },
      }}
      open={open}
      {...props}
    >
      {MESSAGE}
    </MessageBoard>
  )
}

export default SeasonsBoard
