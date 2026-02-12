interface ComplexTextProps {
    name: string,
    value?: string,
    tip?: string, // Описание формата ввода с ограничениями
    restraints: RegExp
}


export default ComplexTextProps;