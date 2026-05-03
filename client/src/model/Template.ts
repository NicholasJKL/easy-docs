export type FieldType = 'Простой текст' | 'Заголовок';

export type FormField = {
    label: string;
    type: FieldType;
}

type Template = {
    id: number;
    author_id: number | null;
    name: string;
    description: string | null;
    fields: FormField[];               // JSONB
    static_data: any;          // JSONB
    validation_scheme: any;    // JSONB
    //file: Buffer;            Не нужен на клиенте
}

export default Template;