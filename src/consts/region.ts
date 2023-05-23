enum Regions {
  EU = 'EU',
  USA = 'USA',
  UK = 'UK',
}

export const REGIONS_OPTIONS = Object.values(Regions).map((media) => ({
  label: media,
  value: media,
}));

export default Regions;
