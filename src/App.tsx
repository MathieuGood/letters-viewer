import { useState } from "react"
import LeftPanel from "./components/LeftPanel"
import letters from "./data/letters.json"
import LetterImage from "./components/LetterImage"
import LetterText from "./components/LetterText"
import HomeContent from "./components/HomeContent"

const App: React.FC = () => {
	const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null)
	const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(false)
	// const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
	const [selectedImageType, setSelectedImageType] = useState<string>("enveloppeRecto")
	const [isTextVisisible, setIsTextVisible] = useState<boolean>(false)
	const selectedLetter = selectedLetterIndex !== null ? letters[selectedLetterIndex] : null

	const handleShowListButtonClick = () => {
		if (!isLeftPanelVisible) {
			setIsLeftPanelVisible(true)
		} else {
			setIsLeftPanelVisible(false)
		}
	}

	return (
		<div className="w-screen h-screen flex p-5 font-typerwriter pl-20">
			{/* Background image */}
			<img
				src="images/backgroundLight.png"
				className="absolute inset-0 w-full h-full object-cover -z-10"
			/>

			{selectedLetter === null && <HomeContent />}

			{/* Menu icon */}
			<div className="menu-icon absolute top-4 left-4">
				<img
					src="images/books.png"
					className="w-full h-24 cursor-pointer hover:-rotate-12"
					onClick={() => handleShowListButtonClick()}
				/>
			</div>

			<LeftPanel
				isLeftPanelVisible={isLeftPanelVisible}
				selectedLetterIndex={selectedLetterIndex}
				setSelectedLetterIndex={setSelectedLetterIndex}
				setIsLeftPanelVisible={setIsLeftPanelVisible}
				setIsTextVisible={setIsTextVisible}
			/>

			<LetterImage
				selectedLetter={selectedLetter}
				selectedImageType={selectedImageType}
				setSelectedImageType={setSelectedImageType}
				isTextVisible={isTextVisisible}
				setIsTextVisible={setIsTextVisible}
			/>

			<LetterText isTextVisible={isTextVisisible} selectedLetter={selectedLetter} />
		</div>
	)
}

export default App
