import validator from 'validator';


export const isPositiveNumber = n => {
    if (!n) {
        return false;
    }
    n += '';
    if (n.indexOf(',') > -1) {
        n = n.replace(',', '.');
    }
    if (!isNaN(parseFloat(n)) && isFinite(n)) {
        return true
    }
    return false;
}

export const isInRange = n => {
    const fn = parseFloat(n);
    return (fn > 0 && fn <= 100) || fn === -1
}

export const isEmail = (val) => {
    return val && validator.isEmail(val);
}

export const checkPass = val => {
    return val && val.length > 5;
}