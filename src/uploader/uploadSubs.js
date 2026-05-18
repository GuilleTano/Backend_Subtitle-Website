import fs from "fs/promises";
import path from "path";

const uploads = "./uploads";
const fileList = await fs.readdir(uploads); // Lee el directorio y devuelve un array con los nombres de los archivos


async function uploadFiles() {

    for (let file of fileList) {

        if (path.extname(file) !== ".ass") continue

        const fileName = file;
        const namePart = path.parse(fileName).name.split("_", 2);
        const pathFile = path.join(uploads, fileName);
        const contentFile = await fs.readFile(pathFile, "utf-8");

        const objSub = {
            series: namePart[0],
            episode: namePart[1],
            filename: fileName,
            content: contentFile
        }

        //console.log(objSub);

        break
    }

}

uploadFiles();