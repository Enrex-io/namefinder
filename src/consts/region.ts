enum Regions {
    EU = 'EU',
    USA = 'USA (comming soon)',
    UK = 'UK (comming soon)',
    OTHER = 'OTHER (comming soon)',
}

export const REGIONS_OPTIONS = Object.values(Regions).map((media) => ({
    label: media,
    value: media,
}));

export default Regions;
