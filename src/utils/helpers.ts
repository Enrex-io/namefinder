import Medias, { MediaChars } from '@/consts/medias';
import { Details } from '@/types';

export const delay = (fn: Function, ms: number, ...args: Array<unknown>) => {
    return setTimeout(fn, ms, ...args);
};

export const parseDetails = (values: Record<string, any>): Details => {
    return {
        media: values?.media,
        region: values?.region,
        description: values?.description,
    };
};

export function getMediaCharByMedia(value: Medias) {
    const index = Object.values(Medias).indexOf(value);
    const key = Object.keys(Medias)[index] as keyof typeof MediaChars;
    return MediaChars[key];
}
