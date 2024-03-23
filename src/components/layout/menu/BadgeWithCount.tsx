import { Badge } from 'antd';

interface IBageProps {
    count: number;
    title: string;
}

export const BadgeWithCount = ({ count, title }: IBageProps) => (
    <Badge color='blue' offset={[20, 6]} count={count} overflowCount={99}>
        {title}
    </Badge>
);
