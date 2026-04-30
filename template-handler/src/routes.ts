import { Router } from 'express';
import { TemplateController } from './TemplateController';

const router = Router();
const templateController = new TemplateController();

/**
 * @swagger
 * /api/generatedocument:
 *   post:
 *     summary: Генерация документа на основе шаблона и переданных данных
 *     description: Принимает идентификатор шаблона и объект с данными для заполнения. Возвращает сгенерированный документ (в текущей заглушке – JSON с сообщением).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - templateId
 *               - formData
 *             properties:
 *               templateId:
 *                 type: number
 *                 description: Уникальный идентификатор шаблона документа
 *                 example: "1"
 *               formData:
 *                 type: object
 *                 description: Объект с полями для подстановки в шаблон
 *                 additionalProperties: true
 *                 example:
 *                   имя: "Иван Петров"
 *                   возраст: 30
 *                   город: "Москва"
 *                   должность: "Разработчик"
 *     responses:
 *       200:
 *         description: Успешная генерация документа
 *         content:
 *           application/vnd.openxmlformats-officedocument.wordprocessingml.document:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Неверный запрос (отсутствуют обязательные поля)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/generatedocument', templateController.generateDocument);

export default router;