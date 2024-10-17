export const capitalize = (string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export const formatBoolean = (value) => {
    return value ? "Sí" : "No";
}

export const getClubName = (url) => {
    // Crear un objeto URL
    const parsedUrl = new URL(url);

    // Obtener el hostname (por ejemplo, "santamaria.clvb.uy" o "www.atahualpa.clvb.uy")
    const hostname = parsedUrl.hostname;

    // Dividir el hostname por puntos
    const parts = hostname.split('.');

    // Si el primer parte es "www", tomar el segundo, de lo contrario tomar el primero
    return parts[0] === 'www' ? parts[1] : parts[0];
}