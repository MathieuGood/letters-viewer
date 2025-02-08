import letters from "../data/letters.json"
import { Letter } from "../interfaces/Letter"
import { animated, useSpring } from "@react-spring/web"
import FullYearDatesList from "./FullYearDatesList"
import { useMemo } from "react"
import { lettersByYear } from "../utils/letterUtils"

interface LeftPanelProps {
	isLeftPanelVisible: boolean
	selectedLetterIndex: number | null
	setSelectedLetterIndex: React.Dispatch<React.SetStateAction<number | null>>
	setIsLeftPanelVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsTextVisible: React.Dispatch<React.SetStateAction<boolean>>
	setSelectedPhotoIndex: React.Dispatch<React.SetStateAction<number>>
}

const LeftPanel: React.FC<LeftPanelProps> = ({
	isLeftPanelVisible,
	setSelectedLetterIndex,
	setIsLeftPanelVisible,
	setIsTextVisible,
	setSelectedPhotoIndex
}) => {
	const handleDateClick = (index: number) => {
		setSelectedLetterIndex(index)
		setSelectedPhotoIndex(0)
		setIsLeftPanelVisible(false)
		setIsTextVisible(false)
	}

	const fallAnimationProps = useSpring({
		from: { transform: "translateY(-100vh)" },
		to: { transform: "translateY(0)" },
		config: { tension: 300, friction: 35 }
	})

	const groupedLettersByYear = useMemo(() => lettersByYear(letters), [])

	return isLeftPanelVisible ? (
		<animated.div
			className="bg-[rgba(255,255,255,0.5)] rounded-xl min-w-28 w-52 px-4 z-50 absolute top-36 left-6 animate-fade-in max-h-[calc(100%-10rem)] overflow-y-scroll scrollbar-hidden"
			style={fallAnimationProps}>
			<ul>
				{groupedLettersByYear.map((yearLetters: Letter[], index: number) => (
					<FullYearDatesList
						key={`year-${index}`}
						letters={yearLetters}
						handleDateClick={handleDateClick}
					/>
				))}
				{letters.map((letter, index) => {
					console.log(index, letter)

					return null
				})}
			</ul>
		</animated.div>
	) : null
}

export default LeftPanel
