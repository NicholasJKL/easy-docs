import * as fs from "fs";
import { patchDocument, PatchType, TextRun, type IPatch } from "docx";


const LoadTemplate = (templateId: number): Buffer => {
    return fs.readFileSync(templateId + ".docx");
}

const CreatePatchesObject = (values: string): Record<string, IPatch> => {

    const fillValues: Map<string, string> = new Map(Object.entries(JSON.parse(values)));
    const patchesObject: Record<string, IPatch> = {};

    fillValues.forEach((value: string, key: string) => {
        patchesObject[key] = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(value)]
        };
    });

    return patchesObject;
}

export const FillTemplate = (templateId: number, values: string): void => {

    const template = LoadTemplate(templateId);
    const patchesObject: Record<string, IPatch> = CreatePatchesObject(values);

    patchDocument({
        outputType: "nodebuffer",
        data: template,
        patches: patchesObject
    }).then((doc) => {
        fs.writeFileSync("My Document.docx", doc);
    });
}