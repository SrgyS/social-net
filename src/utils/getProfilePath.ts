export const getProfilePath = (id: string) => {
    return id ? `/profile/${id}` : '/';
};
