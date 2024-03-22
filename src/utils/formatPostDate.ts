import { formatDistanceToNow, parseISO } from 'date-fns';

import { ru } from 'date-fns/locale';

export const formatPostDate = (dateTimeString: string) => {
    if (!dateTimeString) return '';
    const inputDate = parseISO(dateTimeString);
    const timeDistance = formatDistanceToNow(inputDate, {
        addSuffix: true,
        locale: ru,
    });
    return timeDistance;
};
