enum Regions {
  EU = 'EU',
  USA = 'USA',
  AU = 'AU',
  CH = 'CH',
}

export const REGIONS_OPTIONS = Object.values(Regions).map((media) => ({
  label: media,
  value: media,
}));

export default Regions;
