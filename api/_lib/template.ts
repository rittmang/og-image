
import { readFileSync } from 'fs';
// import marked from 'marked';
// import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
// const twemoji = require('twemoji');
// const twOptions = { folder: 'svg', ext: '.svg' };
// const emojify = (text: string) => twemoji.parse(text, twOptions);

const hnb = readFileSync(`${__dirname}/../_fonts/HelveticaNeueBold.woff`).toString('base64');
const logo = readFileSync(`${__dirname}/../logo.png`).toString('base64');

function getCss(coverimage:string[]) {
    // let background = 'white';
    // let foreground = 'black';
    // let radial = 'lightgray';

    // if (theme === 'dark') {
    //     background = 'black';
    //     foreground = 'white';
    //     radial = 'dimgray';
    // }
    return `
    @font-face {
        font-family: 'Helvetica Neue Bold';
        src: url(data:font/woff;charset=utf-8;base64,${hnb}) format('woff');
    }
    body{
        margin: 0px;
        padding: 0px;
    }
    .container {
        position: absolute;
    }

    .cover {
        opacity: 100%;
        background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('${coverimage}');
        width: 1280px;
        height: 720px;
    }

    .title {
        position: absolute;
        left: 5%;
        top: 20%;
        font-size: 7em;
        text-transform: uppercase;
        color: beige;
        font-family: 'Helvetica Neue Bold';
    }

    .sub {
        position: absolute;
        left: 5.5%;
        top: 47%;
        right: 45%;
        font-size: 1.5em;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: beige;
    }

    .ml-1,
    .mx-1 {
        left: 6%;
    }

    .ml-3,
    .mx-3 {
        left: 12%;
    }

    .ml-4,
    .mx-4 {
        left: 21.5%;
    }

    .badge {
        position: absolute;
        top: 38%;
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 1.5em;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
    }

    .badge-outline {
        color: #fff;
        background-color: transparent;
        outline-style: solid;
        outline-width: 1px;
    }

    .logo {
        background-image: url("data:image/png;base64,${logo}");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        display: block;
        width: 15%;
        height: 25%;

        position: absolute;
        left: 5.5%;
        top: 75%;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    
    const { title, coverimage, agerating, language, year, description } = parsedReq;
    // console.log(coverimage);
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(coverimage)}
    </style>
    <body>
        <div class="container">
            <div class="cover"></div>
            <div class="title">${title}</div>
            <div class="badge badge-outline ml-1">${agerating}</div>
            <div class="badge badge-outline ml-3">${language}</div>
            <div class="badge badge-outline ml-4">${year}</div>
            <div class="sub">${description}</div>
            <div class="logo"></div>
        </div>
    </body>
</html>`;
}

// function getImage(src: string, width ='auto', height = '225') {
//     return `<img
//         class="logo"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//         width="${sanitizeHtml(width)}"
//         height="${sanitizeHtml(height)}"
//     />`
// }

// function getPlusSign(i: number) {
//     return i === 0 ? '' : '<div class="plus">+</div>';
// }
