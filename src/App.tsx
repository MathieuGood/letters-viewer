import { useState } from "react"
import LeftPanel from "./components/LeftPanel"
import MainContent from "./components/MainContent"
import letters from "./data/letters.json"

const App: React.FC = () => {
	const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null)
	const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(false)
	const lettersJSON = letters

	const handleShowListButtonClick = () => {
		if (!isLeftPanelVisible) {
			setIsLeftPanelVisible(true)
		} else {
			setIsLeftPanelVisible(false)
		}
	}

	return (
		<div className="w-screen h-screen flex p-4 gap-4 font-typerwriter">
			{/* Background image */}
			<img
				src="images/backgroundLight.png"
				className="absolute inset-0 w-full h-full object-cover -z-10"
			/>
      {/* Folder image */}
			<div className="">
				<img
					src="images/books.png"
					className="w-full h-24 cursor-pointer hover:-rotate-12"
					onClick={() => handleShowListButtonClick()}
				/>
			</div>
			{isLeftPanelVisible && (
				<LeftPanel
					selectedLetterIndex={selectedLetterIndex}
					setSelectedLetterIndex={setSelectedLetterIndex}
					setIsLeftPanelVisible={setIsLeftPanelVisible}
				/>
			)}
			<MainContent selectedLetterIndex={selectedLetterIndex} letters={lettersJSON} />
		</div>
	)
}

export default App
