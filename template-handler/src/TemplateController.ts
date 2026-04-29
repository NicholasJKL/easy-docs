import { Request, Response } from 'express';
import { FillTemplate } from './TemplateService';

interface TemplateData {
    templateId: number;
    formData: object;
}

export class TemplateController {

    async generateDocument(req: Request, res: Response): Promise<void> {
        try {
            const templateData: TemplateData = req.body;
            await FillTemplate(templateData.templateId, templateData.formData);

            res.status(200).json({ message: 'Генерация документа (заглушка)' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка при генерации документа' });
        }
    }
}