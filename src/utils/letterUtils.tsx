import { Letter } from "../interfaces/Letter"

export const lettersByYear = (letters: Letter[]) => {
	const years: Letter[][] = []
	let currentYear: number | null = null
	let currentYearArray: Letter[] = []
	letters.forEach((letter, index) => {
		letter.index = index
		const year = new Date(letter.date).getFullYear()
		if (currentYear === null) {
			currentYear = year
		}
		if (year === currentYear) {
			currentYearArray.push(letter)
		} else {
			years.push(currentYearArray)
			currentYearArray = [letter]
			currentYear = year
		}
	})
	years.push(currentYearArray)
	return years
}
