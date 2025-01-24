export const formatDateToFrench = (date: string) => {
	return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
}
