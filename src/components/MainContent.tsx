import { Letter } from "../interfaces/Letter"

import LetterText from "./LetterText"
import LetterImage from "./LetterImage"
import { useEffect, useState } from "react"

interface MainContentProps {
	selectedLetterIndex: number | null
	letters: Letter[]
}

const MainContent: React.FC<MainContentProps> = ({ selectedLetterIndex, letters }) => {
	const selectedLetter = selectedLetterIndex !== null ? letters[selectedLetterIndex] : null
	const [selectedImageType, setSelectedImageType] = useState<string>("enveloppeRecto")
	const [isTextVisisible, setIsTextVisible] = useState<boolean>(false)

	useEffect(() => {
		console.log("useEffect selectedImageType", selectedImageType)
	}, [selectedImageType])

	return (
		<div className="w-full py-5 px-5 flex justify-center gap-4">
			{selectedLetter && (
				<>
					<LetterImage
						selectedLetter={selectedLetter}
						selectedImageType={selectedImageType}
						setSelectedImageType={setSelectedImageType}
						isTextVisible={isTextVisisible}
						setIsTextVisible={setIsTextVisible}
					/>
					{isTextVisisible && <LetterText selectedLetter={selectedLetter} />}
				</>
			)}

			{selectedLetter === null && <p className="bg-white">Aucune lettre sélectionnée</p>}
		</div>
	)
}

export default MainContent
