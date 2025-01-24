import { useState } from "react"
import ReactCardFlip from "react-card-flip"
import { useSpring, animated } from "@react-spring/web"
import { Letter } from "../interfaces/Letter"
import ImageActionButton from "./ImageActionButton"

interface LetterImageProps {
	selectedLetter: Letter | null
	selectedImageType: string
	setSelectedImageType: React.Dispatch<React.SetStateAction<string>>
	isTextVisible: boolean
	setIsTextVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const LetterImage: React.FC<LetterImageProps> = ({
	selectedLetter,
	selectedImageType,
	setSelectedImageType,
	isTextVisible,
	setIsTextVisible
}) => {
	const [isEnveloppeFlipped, setIsFlippedEnveloppe] = useState(false)

	const getLetterImageUrl = (date: string | Date, imageType: string) => {
		return `images/letters/${date.toString()}_${imageType}.png`
	}

	const handleFlipButtonClick = () => {
		if (selectedImageType === "enveloppeOuverte") {
			setSelectedImageType("enveloppeRecto")
		} else if (selectedImageType === "lettreRecto") {
			setSelectedImageType("enveloppeOuverte")
		} else if (selectedImageType === "lettreOuverte") {
			setSelectedImageType("lettreRecto")
		} else if (selectedImageType === "lettreVerso") {
			setSelectedImageType("lettreOuverte")
		} else {
			setIsFlippedEnveloppe(!isEnveloppeFlipped)
		}
	}

	const handleImageClick = (imageType: string) => {
		if (imageType === "enveloppeRecto") {
			setSelectedImageType("enveloppeOuverte")
		} else if (imageType === "enveloppeOuverte") {
			setSelectedImageType("lettreRecto")
		} else if (imageType === "lettreRecto") {
			setSelectedImageType("lettreOuverte")
		} else if (imageType === "lettreOuverte") {
			setSelectedImageType("lettreVerso")
		}

		console.log(`Image type was : ${imageType}`)
		console.log(`Image type is : ${selectedImageType}`)
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
							src={getLetterImageUrl(selectedLetter.date, selectedImageType)}
							onClick={() => {
								handleImageClick(selectedImageType)
							}}
						/>
					</animated.div>

					<div>
						<img
							className=" max-h-[calc(100vh-10rem)]"
							src={getLetterImageUrl(selectedLetter.date, "enveloppeVerso")}
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
			</div>
		</div>
	) : null
}

export default LetterImage
