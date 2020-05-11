class Helper{
    static isRequired(param) {
        throw `${param} - parameter is required!`;
    }
}

export {Helper}