import { Badge } from 'antd';

interface IBageProps {
    count: number;
    title: string;
}

export const BadgeWithCount = ({ count, title }: IBageProps) => (
    <Badge
        color='blue'
        style={{
            margin: '6px -15px',
            cursor: 'pointer',
        }}
        count={count}
        overflowCount={99}
    >
        {title}
    </Badge>
);
