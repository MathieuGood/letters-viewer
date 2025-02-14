import HTMLFlipBook from "react-pageflip"
import { useState } from "react"

const HomeContent: React.FC<{
	setIsMenuIconVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsLeftPanelVisible: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setIsMenuIconVisible, setIsLeftPanelVisible }) => {
	const [isHomeContentVisible, setIsHomeContentVisible] = useState(true)
	const [transition, setTransition] = useState("animate-fade-in")

	const handleOnFlip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		console.log("flipped", e)
		setTimeout(() => {
			setTransition("animate-fade-out")
			setTimeout(() => {
				setIsHomeContentVisible(false)
			}, 3000)
			setIsMenuIconVisible(true)
			setIsLeftPanelVisible(true)
		}, 1000)
	}

	return (
		isHomeContentVisible && (
			<div className={`w-full flex  justify-center items-center text-5xl ${transition}`}>
				<div className="flex flex-col gap-4">
					{/* @ts-expect-error Error regarding missing props for HTMLFlipBook */}
					<HTMLFlipBook
						width={300}
						height={500}
						drawShadow={false}
						// showCover={true}
						onFlip={e => {
							console.log(e)
							if (e.data === 2) handleOnFlip(e)
						}}>
						<div className="flex flex-col  justify-center items-center gap-0 text-2xl">
							<p className="pt-14">Ouvrez-moi</p>
							<img
								src="vectors/arrow-right.svg"
								className="mt-8 ml-9 w-10 animate-bounce"
							/>
						</div>
						<img
							src="images/folder/folder_closed.png"
							className="w-72 object-contain"
						/>
						<img
							src="images/folder/folder_open_page1.png"
							className="w-72 object-contain"
						/>
						<img
							src="images/folder/folder_open_page2.png"
							className="w-72 object-contain"
						/>
					</HTMLFlipBook>

					<p>Lettres d'André à Marthe</p>
					<p>1950 - 1953</p>
				</div>
			</div>
		)
	)
}

export default HomeContent
