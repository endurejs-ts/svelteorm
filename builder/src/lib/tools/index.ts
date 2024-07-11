export function determineType(value: any): string {
    if (typeof value === "string") {
        return "string";
    } else if (typeof value === "number") {
        return "number";
    } else if (Array.isArray(value)) {
        if (value.length === 0) {
            return "any[]";
        } else {
            const typesSet = new Set(value.map(determineType));
            const typesArray = Array.from(typesSet);
            const typesString = typesArray.length === 1 ? typesArray[0] : "(" + typesArray.join(" | ") + ")";
            return typesString + "[]";
        }
    } else if (typeof value === "object") {
        return "object";
    } else {
        return "unknown";
    }
}