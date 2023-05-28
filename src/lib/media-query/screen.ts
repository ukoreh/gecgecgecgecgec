import { resolveBreakpointForType, SmallScreen, type Breakpoint } from './breakpoint';

export function onMobileBreakpoint(): boolean {
	const breakpoint = currentBreakpoint();

	console.log(breakpoint);

	return breakpoint == undefined || breakpoint == SmallScreen;
}

export function currentBreakpoint(): Breakpoint | undefined {
	const screenResolvers = window.document.getElementsByClassName('screen-resolver');

	if (screenResolvers.length > 0) {
		const resolver = screenResolvers[0];
		const type = window.getComputedStyle(resolver).getPropertyValue('--type').trim();

		return resolveBreakpointForType(type);
	}

	return undefined;
}
