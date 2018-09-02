class SuperCalcRowDefinition {
    static __FIELD_TYPE_STRING = "string";
    static __FIELD_TYPE_NUMBER = "number";
    static __FIELD_TYPE_RATIONAL = "rational";
    static inputFields = [
        {
            field_name: "item_name",
            type: SuperCalcRowDefinition.__FIELD_TYPE_STRING
        },
        {
            field_name: "unit_price",
            type: SuperCalcRowDefinition.__FIELD_TYPE_RATIONAL
        },
        {
            field_name: "quantity",
            type: SuperCalcRowDefinition.__FIELD_TYPE_RATIONAL
        },
        {
            field_name: "final_destination_1",
            type: SuperCalcRowDefinition.__FIELD_TYPE_STRING
        },
        {
            field_name: "final_destination_2",
            type: SuperCalcRowDefinition.__FIELD_TYPE_STRING
        }
    ]
    static getFieldDef(field_name) {
        return SuperCalcRowDefinition.inputFields.filter((f) => { return f.field_name === field_name })[0];
    }
}
export default SuperCalcRowDefinition