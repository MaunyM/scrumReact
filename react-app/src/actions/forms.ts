// Forms
export const changeField = (form: string, field: string, value: string | number) => ({
    type: 'CHANGE_FIELD',
    form,
    value,
    field
});
export const cancelForm = (form: string) => ({type: 'CANCEL_FORM', form});