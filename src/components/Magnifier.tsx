import React, { useState, useRef } from "react"

interface MagnifierProps {
	imageSrc: string
	zoom?: number
	magnifierWidth?: number
	magnifierHeight?: number
}

const Magnifier: React.FC<MagnifierProps> = ({
	imageSrc,
	zoom = 2,
	magnifierWidth = 200,
	magnifierHeight = 100
}) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isHovering, setIsHovering] = useState(false)
	const imageRef = useRef<HTMLImageElement>(null)

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!imageRef.current) return
		const { left, top, width, height } = imageRef.current.getBoundingClientRect()
		const x = e.clientX - left
		const y = e.clientY - top

		if (x >= 0 && x <= width && y >= 0 && y <= height) {
			setMousePosition({ x, y })
			setIsHovering(true)
		} else {
			setIsHovering(false)
		}
	}

	return (
		<div
			className="relative inline-block"
			onMouseMove={handleMouseMove}
			onMouseLeave={() => setIsHovering(false)}>
			{/* Original Image */}
			<img ref={imageRef} src={imageSrc} alt="Old Letter" className="w-full block" />

			{/* Magnifier */}
			{isHovering && imageRef.current && (
				<div
					className="absolute border-2 border-black bg-white/50 overflow-hidden pointer-events-none"
					style={{
						width: `${magnifierWidth}px`,
						height: `${magnifierHeight}px`,
						left: `${mousePosition.x - magnifierWidth / 2}px`,
						top: `${mousePosition.y - magnifierHeight / 2}px`
					}}>
					<img
						src={imageSrc}
						alt="Zoomed Old Letter"
						className="absolute"
						style={{
							width: `${imageRef.current.width * zoom}px`,
							height: `${imageRef.current.height * zoom}px`,
							left: `${-mousePosition.x * zoom + magnifierWidth / 2}px`,
							top: `${-mousePosition.y * zoom + magnifierHeight / 2}px`
						}}
					/>
				</div>
			)}
		</div>
	)
}

export default Magnifier
