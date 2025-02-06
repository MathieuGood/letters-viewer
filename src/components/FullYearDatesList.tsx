import React, { useState } from "react"
import { Letter } from "../interfaces/Letter"
import { formatDateToFrench } from "../utils/dateUtils"

interface FullYearDatesProps {
	letters: Letter[]
	handleDateClick: (index: number) => void
}

const FullYearDatesList: React.FC<FullYearDatesProps> = ({ letters, handleDateClick }) => {
	const [isDatesVisible, setIsDatesVisible] = useState<boolean>(false)
	const year = new Date(letters[0].date).getFullYear().toString()

	const handleYearClick = () => {
		setIsDatesVisible(!isDatesVisible)
	}

	return (
		<div>
			<h1
				className="cursor-pointer font-typewriterblack text-xl mt-4 mb-1"
				onClick={() => handleYearClick()}>
				{year}
			</h1>
			{isDatesVisible &&
				letters.map((letter, index) => (
					<div
						key={`letter-index-${index}`}
						className="cursor-pointer ml-2 hover:font-typewriterblack hover:text-neutral-700"
						onClick={() => handleDateClick(letter.index!)}>
						{formatDateToFrench(letter.date.toString())}
					</div>
				))}
		</div>
	)
}

export default FullYearDatesList
