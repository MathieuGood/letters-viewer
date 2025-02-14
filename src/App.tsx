import { useState } from "react"
import LeftPanel from "./components/LeftPanel"
import letters from "./data/letters.json"
import LetterImage from "./components/LetterImage"
import LetterText from "./components/LetterText"
import HomeContent from "./components/HomeContent"

const App: React.FC = () => {
	// selectedPhotoIndex = 0: enveloppeRecto
	// selectedPhotoIndex = 1: enveloppeVerso
	// selectedPhotoIndex = 2: enveloppeOuverte
	// selectedPhotoIndex = 3: lettreRecto
	// selectedPhotoIndex = 4: lettreOuverte
	// selectedPhotoIndex = 5: lettreVerso

	const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null)
	const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(false)
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0)
	const [selectedImageType, setSelectedImageType] = useState<string>("enveloppeRecto")
	const [isTranscriptVisible, setIsTranscriptVisible] = useState<boolean>(false)
	const selectedLetter = selectedLetterIndex !== null ? letters[selectedLetterIndex] : null
	const [isMenuIconVisible, setIsMenuIconVisible] = useState(false)

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

			<HomeContent
				setIsMenuIconVisible={setIsMenuIconVisible}
				setIsLeftPanelVisible={setIsLeftPanelVisible}
			/>

			{/* Menu icon */}
			{isMenuIconVisible && (
				<div className="menu-icon absolute top-4 left-6">
					<img
						src="images/folder/folder_open.png"
						className="w-full h-28 cursor-pointer hover:-rotate-3 animate-fade-in-5s"
						onClick={() => handleShowListButtonClick()}
					/>
				</div>
			)}

			<LeftPanel
				isLeftPanelVisible={isLeftPanelVisible}
				selectedLetterIndex={selectedLetterIndex}
				setSelectedLetterIndex={setSelectedLetterIndex}
				setIsLeftPanelVisible={setIsLeftPanelVisible}
				setIsTextVisible={setIsTranscriptVisible}
				setSelectedPhotoIndex={setSelectedPhotoIndex}
			/>

			<LetterImage
				selectedLetter={selectedLetter}
				selectedImageType={selectedImageType}
				setSelectedImageType={setSelectedImageType}
				selectedPhotoIndex={selectedPhotoIndex}
				setSelectedPhotoIndex={setSelectedPhotoIndex}
				isTranscript={isTranscriptVisible}
				setIsTranscriptVisible={setIsTranscriptVisible}
			/>

			<LetterText isTextVisible={isTranscriptVisible} selectedLetter={selectedLetter} />
		</div>
	)
}

export default App
