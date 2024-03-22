import { Badge } from 'antd';
import { Link } from 'react-router-dom';

interface IBageProps {
    path: string;
    count: number;
    title: string;
}

export const BadgeWithCount = ({ path, count, title }: IBageProps) => (
    <Badge
        color='blue'
        style={{
            margin: '6px -15px',
            cursor: 'pointer',
        }}
        count={count}
        overflowCount={99}
    >
        <Link to={path}>{title}</Link>
    </Badge>
);
