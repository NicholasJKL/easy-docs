type Template = {
    id: number;
    author_id: number | null;
    name: string;
    description: string | null;
    fields: any;               // JSONB
    static_data: any;          // JSONB
    validation_scheme: any;    // JSONB
    file: Buffer;              // BYTEA
}

export default Template;