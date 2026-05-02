import { Request, Response } from 'express';
import { fillTemplate } from './TemplateService';
import { Pool } from 'pg';

import TemplateRepository from './TemplateRepository';
import TemplateFillData from './models/TemplateFillData';
import TemplateSummary from './models/TemplateSummary';
import Template from './models/Template';

class TemplateController {

    private templateRepository: TemplateRepository;

    constructor(pool: Pool) {
        this.templateRepository = new TemplateRepository(pool);
    }

    async generateDocument(req: Request, res: Response): Promise<void> {
        try {
            const templateData: TemplateFillData = req.body;
            const file: Buffer = await fillTemplate(templateData.templateId, templateData.formData);

            res.setHeader('Content-Disposition', 'attachment; filename="document.docx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.status(200).send(file);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка при генерации документа' });
        }
    }

    async getAllTemplates(req: Request, res: Response): Promise<void> {
        try {
            const templates: TemplateSummary[] = await this.templateRepository.getAllTemplates();
            res.status(200).json(templates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка получения списка шаблонов' });
        }
    }

    async createTemplate(req: Request, res: Response): Promise<void> {
        try {
            const template: Template = req.body;
            console.log(template);
            const result = await this.templateRepository.createTemplate(template);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка создания шаблона' });
        }
    }
}

export default TemplateController;