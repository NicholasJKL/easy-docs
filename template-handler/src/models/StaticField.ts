type Types = "date" | "dated" | "datem" | "datey" | "datef" | "datey2" | "datemf" | "tableValue" | "alpha";

type StaticField = {
    marker: string;
    type: Types;
    dependsOn: string;
    tableName?: string;
}

export default StaticField;