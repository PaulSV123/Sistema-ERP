export const validationOnlyNumbers = (value) => {
    let regExp = /^[0-9]+$/;
    return regExp.test(value);
}

