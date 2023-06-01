enum Medias {
    TwitterEU = 'Twitter (280 characters)',
    TwitterUS = 'Twitter (4000 characters)',
    LinkedIn = 'LinkedIn (3000 characters)',
    Facebook = 'Facebook (4000 characters)',
}

export enum MediaChars {
    TwitterEU = 280,
    TwitterUS = 4000,
    LinkedIn = 3000,
    Facebook = 4000,
}

export const MEDIAS_OPTIONS = Object.values(Medias).map((media) => ({
    label: media,
    value: media,
}));

export default Medias;
