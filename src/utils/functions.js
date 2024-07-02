export const capitalize = (string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export const formatBoolean = (value) => {
    return value ? "Sí" : "No";
}