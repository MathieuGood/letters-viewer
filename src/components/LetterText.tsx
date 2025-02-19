import { Letter } from "../interfaces/Letter"

interface LetterTextProps {
	isTextVisible: boolean
	selectedLetter: Letter | null
}

const LetterText: React.FC<LetterTextProps> = ({ isTextVisible, selectedLetter }) => {
	return selectedLetter && isTextVisible ? (
		<div className="bg-[rgba(255,255,255,0.5)] w-1/3 fixed overflow-y-scroll p-4 rounded-lg">
			<div className="mb-6">
				{selectedLetter.sp} {selectedLetter.date.toString()}
			</div>
			<div className="mb-4">
				{selectedLetter.paragraphs.map((paragraph, index) => (
					<p key={index} className="mb-3">
						{paragraph}
					</p>
				))}
			</div>
		</div>
	) : null
}

export default LetterText
