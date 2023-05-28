export default function typewriter(element: HTMLInputElement, text: string) {
	const speed = 1;

	const duration = text.length / (speed * 0.02);

	return {
		duration,
		tick: (t: number) => {
			const i = Math.trunc(text.length * t);
			element.value = text.slice(0, i);
		}
	};
}