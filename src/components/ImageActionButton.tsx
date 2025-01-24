interface ImageActionButtonProps {
	label: string
	imageUrl: string
	onClick: () => void
}

const ImageActionButton: React.FC<ImageActionButtonProps> = ({ label, imageUrl, onClick }) => {
	return (
		<button
			className="bg-[rgba(255,255,255,0.5)] px-3 py-2 h-12 rounded-md flex align items-center gap-2"
			onClick={() => onClick()}>
			<img src={imageUrl} alt="flip" className="w-6 h-6" />
			{label}
		</button>
	)
}

export default ImageActionButton
