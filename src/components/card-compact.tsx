import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type CartCompactProps = {
    title: string;
    description: string;
    content: React.ReactNode;
    className?: string;
    footer?: React.ReactNode;
}

const CardCompact = ({title, description, content, className, footer}: CartCompactProps) => {
    return (
        <Card className="w-full max-w-[420px] self-center">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{content}</CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    )
}

export default CardCompact;