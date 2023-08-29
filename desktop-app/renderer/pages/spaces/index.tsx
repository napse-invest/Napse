import ContextHeader from '@/components/layout/contextHeader';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

function ValueChangeColor(value: number): string {
    if (value > 0) {
        return 'text-green-500';
    } else if (value < 0) {
        return 'text-red-500';
    } else {
        return '';
    }
}


function DisplaySpaces(): JSX.Element {
    const spaces = [
        {
            name: 'Space Jam',
            bots: 3,
            value: 1.01,
            change: 20.6
        },
        {
            name: 'Space Mountain',
            bots: 152,
            value: 152163231.89,
            change: 0
        },
        {
            name: 'Space Mountain',
            bots: 152,
            value: 152163231.89,
            change: 0
        }
    ];

    return (
        <ContextHeader isSpace>
            <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 my-10 max-w-screen-xl px-24">
                {spaces.map((space, index) => (
                    <Card key={index} className="hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-7">
                            <CardTitle className="text-sm font-medium">
                                {space.name}
                            </CardTitle>
                            <div className="text-xs italic">{space.bots} bots</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{`$${space.value}`}</div>
                            <p className={`text-xs text-muted-foreground ${ValueChangeColor(space.change)}`}>
                                {`${space.change}%`}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ContextHeader>
    )
}

export default DisplaySpaces
