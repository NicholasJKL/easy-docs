import * as fs from "fs";
import { patchDocument, PatchType, TextRun, type IPatch } from "docx";

const loadTemplate = (templateId: number): Buffer => {
    return fs.readFileSync(templateId + ".docx");
}

const createPatchesObject = (fieldsWithValuesObject: object): Record<string, IPatch> => {

    const processed: Record<string, any> = { ...fieldsWithValuesObject };

    for (const [key, value] of Object.entries(processed)) {
        if (key.toLowerCase().includes('date')) {
            try {
                const date = new Date(value);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                processed[key] = `${day}.${month}.${year}`;

            } catch { }
        }
    }

    const patchesObject: Record<string, IPatch> = {};
    for (const [key, value] of Object.entries(processed)) {
        patchesObject[key] = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(String(value ?? ''))],
        };
    }

    return patchesObject;
}

export const fillTemplate = async (templateId: number, formData: object): Promise<Buffer> => {

    const template = loadTemplate(templateId);
    const patchesObject: Record<string, IPatch> = createPatchesObject(formData);

    try {
        const doc = await patchDocument({
            outputType: "nodebuffer",
            data: template,
            patches: patchesObject
        });
        return doc;
    } catch (error) {
        console.error(error);
        throw new Error('Ошибка при заполнении шаблона');
    }
}