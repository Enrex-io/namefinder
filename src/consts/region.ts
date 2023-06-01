enum Regions {
    EU = 'EU',
    USA = 'USA',
    UK = 'UK',
    OTHER = 'OTHER',
}

export const REGIONS_OPTIONS = Object.values(Regions).map((media) => ({
    label: media,
    value: media,
}));

export default Regions;
