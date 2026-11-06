export function formatMinutes(minutes: number) {
	return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
}
