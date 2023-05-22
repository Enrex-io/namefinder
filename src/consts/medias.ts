enum Medias {
  TwitterEU = 'Twitter (280 characters)',
  TwitterUS = 'Twitter (4000 characters)',
  LinkedIn = 'LinkedIn',
  FaceBook = 'FaceBook',
}

export enum MediaChars {
  TwitterEU = 280,
  TwitterUS = 4000,
  LinkedIn = 3000,
  FaceBook = 4000,
}

export const MEDIAS_OPTIONS = Object.values(Medias).map((media) => ({
  label: media,
  value: media,
}));

export default Medias;
