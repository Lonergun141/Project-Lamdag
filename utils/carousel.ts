export const truncateText = (text: string, maxLength: number): string => {
	if (!text || text.length <= maxLength) return text || '';
	return `${text.substring(0, maxLength)}...`;
};

export const createInfiniteArray = <T>(items: T[], duplicates = 3): T[] => {
	if (!items.length) return [];
	return Array(duplicates).fill(items).flat();
};

export const getProgressIndex = (currentIndex: number, totalItems: number): number => {
	if (totalItems === 0) return 0;
	return currentIndex % totalItems;
};

export const getInfiniteScrollIndex = (targetIndex: number, totalItems: number): number => {
	return totalItems + targetIndex;
};

export const shouldResetInfiniteScroll = (
	currentIndex: number,
	totalItems: number,
	threshold = 2
): boolean => {
	return totalItems > 0 && currentIndex >= totalItems * threshold;
};

export const CAROUSEL_CONFIG = {
	AUTO_PLAY_INTERVAL: 3000,
	TRANSITION_DURATION: 700,
	CARD_WIDTH: 380,
	DESCRIPTION_MAX_LENGTH: 120,
} as const;
