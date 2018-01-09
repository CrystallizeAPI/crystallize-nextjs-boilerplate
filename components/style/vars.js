// Screen sizes
export const screenXs = 500;
export const screenSm = 768;
export const screenMd = 1024;
export const screenLg = 1600;

export const screenXsMin = screenXs;
export const screenXsMax = screenSm - 1;

export const screenSmMin = screenSm;
export const screenSmMax = screenMd - 1;

export const screenMdMin = screenMd;
export const screenMdMax = screenLg - 1;

export const screenLgMin = screenLg;
export const screenLgMax = 1599;

// Ready made media queries
export const mediaXs = `@media (max-width: ${screenXsMax}px)`;
export const mediaSm = `@media (min-width: ${screenSmMin}px) and (max-width: ${screenSmMax}px)`;
export const mediaMd = `@media (min-width: ${screenMdMin}px) and (max-width: ${screenMdMax}px)`;
export const mediaLg = `@media (min-width: ${screenLgMin}px)`;

// Colors
export const colorPrice = '#f47f98';
