class StringProcessor {
    static createHeaderFromFieldName(field_name) {
        return field_name.split("_").map(
            (w) => {
                return w.charAt(0).toUpperCase() + w.slice(1);
            }
        ).join(" ")
    }
}

export default StringProcessor;