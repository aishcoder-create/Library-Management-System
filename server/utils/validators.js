exports.isEmail = (s) => typeof s === 'string' && /\S+@\S+\.\S+/.test(s);
exports.required = (v) => v !== undefined && v !== null && (`${v}`).length > 0;
