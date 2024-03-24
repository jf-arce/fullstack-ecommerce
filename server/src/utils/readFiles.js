import fs from 'fs';
import path from 'path';

export function readJson(filePath) {
    const filePathResolved = path.resolve(filePath);
    const fileContent = fs.readFileSync(filePathResolved, 'utf-8');
    const data = JSON.parse(fileContent);
    return data;
}