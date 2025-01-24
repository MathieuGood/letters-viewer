import letters from "../data/letters.json"
import { Letter } from "../interfaces/Letter"
import { animated, useSpring } from "@react-spring/web"
import { formatDateToFrench } from "../utils/dateUtils"

interface LeftPanelProps {
	isLeftPanelVisible: boolean
	selectedLetterIndex: number | null
	setSelectedLetterIndex: React.Dispatch<React.SetStateAction<number | null>>
	setIsLeftPanelVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const LeftPanel: React.FC<LeftPanelProps> = ({
	isLeftPanelVisible,
	setSelectedLetterIndex,
	setIsLeftPanelVisible
}) => {
	const handleDateClick = (index: number) => {
		setSelectedLetterIndex(index)
		setIsLeftPanelVisible(false)
		// Set imageType to enveloppeRecto
	}

	const fallAnimationProps = useSpring({
		from: { transform: "translateY(-100vh)" },
		to: { transform: "translateY(0)" },
		config: { tension: 300, friction: 35 }
	})

	const dateListEntries = (letters: Letter[]) => {
		let lastYear: string | null = null
		return letters.map((letter, index) => {
			const year = new Date(letter.date).getFullYear().toString()
			const yearTitle =
				year !== lastYear || index === 0 ? (
					<li key={`year-${year}`} className="font-typewriterblack text-xl mt-4 mb-1">
						{year}
					</li>
				) : null
			if (year !== lastYear || index === 0) {
				lastYear = year
			}

			return (
				<>
					{yearTitle}
					<li
						className="cursor-pointer ml-2 hover:font-typewriterblack hover:text-neutral-700"
						key={index}
						onClick={() => handleDateClick(index)}>
						{formatDateToFrench(letter.date.toString())}
					</li>
				</>
			)
		})
	}

	return isLeftPanelVisible ? (
		<animated.div
			className="bg-[rgba(255,255,255,0.5)] rounded-xl min-w-28 w-52 px-4 z-50 absolute top-32 left-6 animate-fade-in max-h-[calc(100%-10rem)] overflow-y-scroll"
			style={fallAnimationProps}>
			<ul>{dateListEntries(letters)}</ul>
		</animated.div>
	) : null
}

export default LeftPanel
