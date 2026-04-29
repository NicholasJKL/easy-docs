import { FillTemplate } from "./TemplateService.js";


const testData = {
    "имя": "Александр",
    "возраст": "28 лет",
    "город": "Москва",
    "должность": "Разработчик"
};

const data: string = JSON.stringify(testData);

FillTemplate(1, data);