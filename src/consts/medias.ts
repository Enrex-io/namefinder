enum Medias {
    LinkedIn = 'LinkedIn (3000 characters)',
    TwitterEU = 'Twitter (280 characters) (comming soon)',
    TwitterUS = 'Twitter (4000 characters) (comming soon)',
    Facebook = 'Facebook (4000 characters) (comming soon)',
}

export enum MediaChars {
    LinkedIn = 3000,
    TwitterEU = 280,
    TwitterUS = 4000,
    Facebook = 4000,
}

export const MEDIAS_OPTIONS = Object.values(Medias).map((media) => ({
    label: media,
    value: media,
}));

export default Medias;
