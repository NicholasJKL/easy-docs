type Template = {
    id: number;
    author_id?: number | null;
    name: string;
    description: string | null;
    fields: string;
    static_data: string;
    validation_schema: string;
    file: Buffer;
}

export default Template;