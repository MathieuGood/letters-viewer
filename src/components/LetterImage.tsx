import { useState } from "react"
import ReactCardFlip from "react-card-flip"
import { useSpring, animated } from "@react-spring/web"
import { Letter } from "../interfaces/Letter"
import ImageActionButton from "./ImageActionButton"

interface LetterImageProps {
	selectedLetter: Letter
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
	const [selectedBgImageType, setBgSelectedImageType] = useState("")

	const getLetterImageUrl = (date: string | Date, imageType: string) => {
		return `images/letters/${date.toString()}_${imageType}.png`
	}

	const handleFlipButtonClick = () => {
		if (selectedImageType === "enveloppeOuverte") {
			setSelectedImageType("enveloppeRecto")
		} else if (selectedImageType === "lettreRecto") {
			setSelectedImageType("enveloppeOuverte")
			setBgSelectedImageType("enveloppeRecto")
		} else {
			setIsFlippedEnveloppe(!isEnveloppeFlipped)
		}
	}

	const handleImageClick = (imageType: string, bgImageType: string) => {
		if (imageType === "enveloppeRecto") {
			setSelectedImageType("enveloppeOuverte")
		} else if (imageType === "enveloppeOuverte" && bgImageType === "") {
			setSelectedImageType("lettreRecto")
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

	return (
		<div className="flex flex-col justify-center w-2/3">
			<div className=" flex items-end justify-center">
				<ReactCardFlip
					isFlipped={isEnveloppeFlipped}
					flipDirection="horizontal"
					containerClassName="max-w-[600px] max-h-screen cursor-pointer">
					<animated.div style={fallDownAnimationProps}>
						<img
						className="max-w-[500px] h-auto"
							src={getLetterImageUrl(selectedLetter.date, selectedImageType)}
							onClick={() => {
								handleImageClick(selectedImageType, selectedBgImageType)
							}}
						/>
					</animated.div>

					<div>
						<img
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
					label="Ouvrir texte"
					imageUrl="vectors/text.svg"
					onClick={() => handleTextVisibleButtonClick()}
				/>
			</div>
		</div>
	)
}

export default LetterImage
