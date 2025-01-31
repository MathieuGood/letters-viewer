import { useState } from "react"
import ReactCardFlip from "react-card-flip"
import { useSpring, animated } from "@react-spring/web"
import { Letter } from "../interfaces/Letter"
import ImageActionButton from "./ImageActionButton"

interface LetterImageProps {
	selectedLetter: Letter | null
	selectedImageType: string
	setSelectedImageType: React.Dispatch<React.SetStateAction<string>>
	selectedPhotoIndex: number
	setSelectedPhotoIndex: React.Dispatch<React.SetStateAction<number>>
	isTextVisible: boolean
	setIsTextVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const LetterImage: React.FC<LetterImageProps> = ({
	selectedLetter,
	selectedPhotoIndex,
	setSelectedPhotoIndex,
	isTextVisible,
	setIsTextVisible
}) => {
	const [isEnveloppeFlipped, setIsFlippedEnveloppe] = useState(false)

	const getSelectedLetterImageUrl = (selectedPhotoIndex: number) => {
		if (
			selectedLetter?.images &&
			selectedLetter.images?.length > 0 &&
			selectedLetter.images[selectedPhotoIndex].type
		) {
			const selectedLetterDate = selectedLetter.date.toString()
			const imageType = selectedLetter.images[selectedPhotoIndex].type
			return `images/letters/${selectedLetterDate}_${imageType}.png`
		} else {
			return ""
		}
	}

	const handleFlipButtonClick = () => {
		if (selectedPhotoIndex === 0 || selectedPhotoIndex === 1) {
			setIsFlippedEnveloppe(!isEnveloppeFlipped)
		}
	}

	const handleImageClick = () => {
		if (selectedPhotoIndex === 0) {
			setSelectedPhotoIndex(2)
		} else if (selectedPhotoIndex === 2) {
			setSelectedPhotoIndex(3)
		}
	}

	const fallDownAnimationProps = useSpring({
		from: { transform: "translateY(-100vh)" },
		to: { transform: "translateY(0)" },
		config: { tension: 300, friction: 90 }
	})

	const handleTextVisibleButtonClick = () => {
		if (isTextVisible) {
			setIsTextVisible(false)
		} else {
			setIsTextVisible(true)
		}
	}

	const handleZoomButtonClick = () => {
		console.log("Click on zoom button")
	}

	const handlePrevPhotoClick = () => {
		if (selectedPhotoIndex > 3) {
			setSelectedPhotoIndex(selectedPhotoIndex - 1)
		}
	}

	const handleNextPhotoClick = () => {
		if (
			selectedLetter?.images &&
			selectedPhotoIndex < selectedLetter.images.length - 1 &&
			selectedPhotoIndex > 2
		) {
			setSelectedPhotoIndex(selectedPhotoIndex + 1)
		}
	}

	return selectedLetter ? (
		<div className="flex flex-col justify-end w-2/3">
			<div className=" flex items-end justify-center">
				<ReactCardFlip
					isFlipped={isEnveloppeFlipped}
					flipDirection="horizontal"
					containerClassName=" max-h-screen cursor-pointer">
					<animated.div style={fallDownAnimationProps}>
						<img
							className=" max-h-[calc(100vh-10rem)]"
							src={getSelectedLetterImageUrl(selectedPhotoIndex)}
							onClick={() => {
								handleImageClick()
							}}
						/>
					</animated.div>

					<div>
						<img
							className=" max-h-[calc(100vh-10rem)]"
							src={getSelectedLetterImageUrl(1)}
						/>
					</div>
				</ReactCardFlip>
			</div>

			<div className=" flex justify-center gap-3 mt-4">
				<ImageActionButton
					label="Retourner"
					imageUrl="vectors/flip.svg"
					onClick={() => handleFlipButtonClick()}
				/>
				<ImageActionButton
					label="Zoom"
					imageUrl="vectors/zoom.svg"
					onClick={() => handleZoomButtonClick()}
				/>
				<ImageActionButton
					label="Transcription"
					imageUrl="vectors/text.svg"
					onClick={() => handleTextVisibleButtonClick()}
				/>
				<ImageActionButton label="<<" onClick={() => handlePrevPhotoClick()} />
				<ImageActionButton label=">>" onClick={() => handleNextPhotoClick()} />
			</div>
		</div>
	) : null
}

export default LetterImage
