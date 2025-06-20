import { PersistedState } from 'runed';

export const settings = new PersistedState('settings', {
	sidebarOpen: true,
	consoleOpen: false
});
export const htmlValue = new PersistedState('html-value', '');
export const jsValue = new PersistedState('js-value', '');
export const cssValue = new PersistedState('css-value', '');

export function toggleSidebar() {
	settings.current.sidebarOpen = !settings.current.sidebarOpen;
}
export function toggleConsole() {
	settings.current.consoleOpen = !settings.current.consoleOpen;
}
