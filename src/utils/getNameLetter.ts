export const getNameLetter = (name: string | null) => {
    if (!name) return '';
    return name[0].toUpperCase();
};
