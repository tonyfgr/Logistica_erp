export const nestJson = (json, fieldName, nestedFields) => {
    return json.reduce((acc, item) => {
        const nestedObj = {};
        const nestedFieldsObj = {};

        nestedFields.forEach((field) => {
            if (item[field]) {
                nestedFieldsObj[field] = item[field];
                delete item[field];
            }
        });

        nestedObj[fieldName] = nestedFieldsObj;

        acc.push({
            ...item,
            ...nestedObj,
        });

        return acc;
    }, []);
}

