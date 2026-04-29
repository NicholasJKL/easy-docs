import * as fs from "fs";
import { patchDocument, PatchType, TextRun, type IPatch } from "docx";


const LoadTemplate = (templateId: number): Buffer => {
    return fs.readFileSync(templateId + ".docx");
}

const CreatePatchesObject = (fieldsWithValuesObject: object): Record<string, IPatch> => {

    const fieldsWithValues = Object.entries(fieldsWithValuesObject);
    const patchesObject: Record<string, IPatch> = {};

    fieldsWithValues.forEach(([key, value]) => {
        patchesObject[key] = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(value.toString())]
        };
    });

    return patchesObject;
}

export const FillTemplate = (templateId: number, formData: object): void => {

    const template = LoadTemplate(templateId);
    const patchesObject: Record<string, IPatch> = CreatePatchesObject(formData);

    patchDocument({
        outputType: "nodebuffer",
        data: template,
        patches: patchesObject
    }).then((doc) => {
        fs.writeFileSync("My Document.docx", doc);
    });
}