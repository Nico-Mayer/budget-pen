import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

type Axis = 'width' | 'height';
export function getViewportPercentage(targetPixels: number, axis: Axis = 'width') {
	if (typeof targetPixels !== 'number' || targetPixels < 0) {
		throw new Error('targetPixels must be a non-negative number');
	}

	const viewportSize = axis === 'height' ? window.innerHeight : window.innerWidth;

	const percentage = (targetPixels / viewportSize) * 100;
	return percentage;
}
