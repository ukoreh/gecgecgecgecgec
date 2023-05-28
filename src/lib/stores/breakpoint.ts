import { currentBreakpoint, type Breakpoint } from '@media-query';
import { createStore, setSuccess } from './store';

export const BreakpointStore = createBreakpointStore();

function createBreakpointStore() {
	const store = createStore<Breakpoint>();
	const subscribe = store.subscribe;

	let resizeListener: void | undefined;

	return {
		subscribe,
		listen: () => {
			if (!resizeListener) {
				let breakpoint = currentBreakpoint();

				setSuccess(store, breakpoint);

				resizeListener = window.addEventListener('resize', () => {
					const freshBreakpoint = currentBreakpoint();

					if (breakpoint != freshBreakpoint) {
						breakpoint = freshBreakpoint;

						setSuccess(store, breakpoint);
					}
				});
			}
		}
	};
}
