import { patchDocument, PatchType, TextRun, type IPatch } from "docx";
import Template from "./models/Template";
import TemplateFillData from "./models/TemplateFillData";
import Field from "./models/Field";
import StaticData from "./models/StaticData";

interface StaticRepository {
    getStaticValue(table: string, key: string): Promise<any>;
}

const createPatchesDocx = (valuesByMarkers: Map<string, string>): Record<string, IPatch> => {

    const patchesObject: Record<string, IPatch> = {};
    for (const [key, value] of valuesByMarkers.entries()) {
        patchesObject[key] = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun(String(value ?? ''))],
        };
    }

    return patchesObject;
}

const buildValues = async (templateData: Template, templateFillData: TemplateFillData, templateRepository: StaticRepository): Promise<Map<string, string>> => {

    const fields: Field[] = JSON.parse(templateData.fields);
    const formData: Record<string, string> = templateFillData.formData;
    const staticData: StaticData = JSON.parse(templateData.static_data);

    const valuesByMarkers = new Map<string, string>(
        fields.map(f => [f.marker, formData[f.marker] ?? (f.defaultValue ?? "")])
    );

    try {
        for (const sd of staticData.staticFieldsData) {
            switch (sd.type) {
                case 'date': {
                    if (!formData[sd.dependsOn]) break;
                    const date = new Date(formData[sd.dependsOn]);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    valuesByMarkers.set(sd.marker, `${day}.${month}.${year}`);
                    break;
                }
                case 'dated': {
                    if (!formData[sd.dependsOn]) break;
                    const date = new Date(formData[sd.dependsOn]);
                    const day = String(date.getDate()).padStart(2, '0');
                    valuesByMarkers.set(sd.marker, day);
                    break;
                }
                case 'datem': {
                    if (!formData[sd.dependsOn]) break;
                    const date = new Date(formData[sd.dependsOn]);
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    valuesByMarkers.set(sd.marker, month);
                    break;
                }
                case 'datey': {
                    if (!formData[sd.dependsOn]) break;
                    const date = new Date(formData[sd.dependsOn]);
                    const year = String(date.getFullYear());
                    valuesByMarkers.set(sd.marker, year);
                    break;
                }
                case 'datey2': {
                    if (!formData[sd.dependsOn]) break;
                    const date = new Date(formData[sd.dependsOn]);
                    const year = String(date.getFullYear());
                    valuesByMarkers.set(sd.marker, year.slice(-2));
                    break;
                }
                case 'datef': {
                    if (!formData[sd.dependsOn]) break;
                    const date = new Date(formData[sd.dependsOn]);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = getMonthName(date.getMonth() + 1);
                    const year = date.getFullYear();
                    valuesByMarkers.set(sd.marker, `${day} ${month} ${year} год`);
                    break;
                }
                case 'datemf': {
                    if (!formData[sd.dependsOn]) break;
                    const date = new Date(formData[sd.dependsOn]);
                    const month = getMonthName(date.getMonth() + 1);
                    valuesByMarkers.set(sd.marker, month);
                    break;
                }
                case 'alpha': {
                    if (!formData[sd.dependsOn]) break;
                    const val = formData[sd.dependsOn];
                    valuesByMarkers.set(sd.marker, val ? val.charAt(0).toUpperCase() : "");
                    break;
                }
                case 'tableValue': {
                    if (!sd.tableName || !formData[sd.dependsOn]) break;
                    const value = await templateRepository.getStaticValue(sd.tableName, formData[sd.dependsOn]);
                    valuesByMarkers.set(sd.marker, value != null ? String(value) : "");
                    break;
                }
                default:
                    valuesByMarkers.set(sd.marker, "");
            }
        }
    } catch (error) {
        console.error(error);
    }

    return valuesByMarkers;
}

const getMonthName = (month: number): string => {
    switch (month) {
        case 1: return 'января';
        case 2: return 'февраля';
        case 3: return 'марта';
        case 4: return 'апреля';
        case 5: return 'мая';
        case 6: return 'июня';
        case 7: return 'июля';
        case 8: return 'августа';
        case 9: return 'сентября';
        case 10: return 'октября';
        case 11: return 'ноября';
        case 12: return 'декабря';
        default: return '';
    }
}

export const fillTemplateDocx = async (templateData: Template, templateFillData: TemplateFillData, templateRepository: StaticRepository): Promise<Buffer> => {

    const valuesByMarkers = await buildValues(templateData, templateFillData, templateRepository);
    const patches = createPatchesDocx(valuesByMarkers);

    try {
        const doc = await patchDocument({
            outputType: "nodebuffer",
            data: templateData.file,
            patches: patches
        });
        return doc;
    } catch (error) {
        console.error(error);
        throw new Error('Ошибка при заполнении шаблона');
    }
}