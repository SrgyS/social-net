import usersStore from '../store/users';

export const getUsers = (userIds: string[]) => {
    return userIds
        .map((userId) => usersStore.allUsers.find((user) => user.id === userId))
        .filter(Boolean);
};
