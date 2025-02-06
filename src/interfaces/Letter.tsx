export interface Letter {
	index?: number
	date: Date | string
	sp: string
	paragraphs: string[]
	images?: {
		type: string | null
		url: string | null
	}[]
}
