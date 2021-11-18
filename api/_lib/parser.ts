import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { coverimage, title, agerating, language, year, description } = (query || {});

    if (Array.isArray(title) || title===undefined) {
        throw new Error('Expected a single title');
    }
    if (Array.isArray(agerating) || agerating===undefined) {
        throw new Error('Expected a single agerating');
    }
    if (Array.isArray(language) || language===undefined) {
        throw new Error('Expected a single language');
    }
    if (Array.isArray(year) || year===undefined) {
        throw new Error('Expected a single year');
    }
    if (Array.isArray(description) || description===undefined) {
        throw new Error('Expected a single description');
    }
    // if (Array.isArray(theme)) {
    //     throw new Error('Expected a single theme');
    // }
    
    const arr = (pathname || '/').slice(1).split('.');
    console.log(arr);
    let extension = '';
    extension=arr.pop() as string;
    // if (arr.length === 0) {
    //     text = '';
    // } else if (arr.length === 1) {
    //     text = arr[0];
    // } else {
    //     extension = arr.pop() as string;
    //     text = arr.join('.');
    // }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        title: decodeURIComponent(title),
        agerating:decodeURIComponent(agerating),
        language:decodeURIComponent(language),
        year:decodeURIComponent(year),
        description:decodeURIComponent(description),
        coverimage: getArray(coverimage),
    };
    parsedRequest.coverimage = (parsedRequest.coverimage);//getDefaultImage(parsedRequest.coverimage);
    // console.log(parsedRequest.coverimage);
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}

// function getDefaultImages(images: string[]): string[] {
//     const defaultImage = 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg';

//     if (!images || !images[0]) {
//         return [defaultImage];
//     }
//     if (!images[0].startsWith('https://assets.vercel.com/') && !images[0].startsWith('https://assets.zeit.co/')) {
//         images[0] = defaultImage;
//     }
//     return images;
// }
