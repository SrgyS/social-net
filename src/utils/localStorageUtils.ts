export const saveDataToLocalStorage = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const loadDataFromLocalStorage = <T>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const clearLocalStorage = () => {
    localStorage.clear();
};
