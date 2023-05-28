export type Breakpoint = string;

export const SmallScreen: Breakpoint = 'sm';
export const MediumScreen: Breakpoint = 'md';
export const LargeScreen: Breakpoint = 'lg';
export const ExtraLargeScreen: Breakpoint = 'xl';
export const ExtraExtraLargeScreen: Breakpoint = '2xl';

const breakpoints = [
	SmallScreen,
	MediumScreen,
	LargeScreen,
	ExtraLargeScreen,
	ExtraExtraLargeScreen
];

export function resolveBreakpointForType(type: string) {
	return breakpoints.find((bp) => type.includes(bp));
}
