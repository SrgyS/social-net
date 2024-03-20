export const getNameLetter = (name: string) => {
    if (!name) return '';
    return name[0].toUpperCase();
};
