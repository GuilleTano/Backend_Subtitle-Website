import fs from "fs/promises";
import path from "path";

const uploads = "./uploads";
const fileList = await fs.readdir(uploads); // Lee el directorio y devuelve un array con los nombres de los archivos


async function uploadFiles(){

    for (let file of fileList) {

        console.log(file);

        if (path.extname(file) !== ".ass") continue

        const pathFile = path.join(uploads, file);

        const subFile = await fs.readFile(pathFile, "utf-8");

        console.log(subFile);

        break
    }


}

uploadFiles();