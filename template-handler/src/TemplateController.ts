import { Request, Response } from 'express';
import { fillTemplate } from './TemplateService';

interface TemplateData {
    templateId: number;
    formData: object;
}

export class TemplateController {

    async generateDocument(req: Request, res: Response): Promise<void> {
        try {
            const templateData: TemplateData = req.body;

            const file: Buffer = await fillTemplate(templateData.templateId, templateData.formData);

            res.setHeader('Content-Disposition', 'attachment; filename="document.docx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.status(200).send(file);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка при генерации документа' });
        }
    }
}