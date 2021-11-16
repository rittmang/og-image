export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    title:string;
    coverimage: string[];
    agerating:string;
    language:string;
    year:string;
    description:string;
}
