import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCart() {
    return (
        <div className="max-w-sm">
            <Card>
                <CardContent className="flex flex-col items-center justify-between h-72 p-4">
                    <div className="w-full aspect-w-1 aspect-h-1">
                        <Skeleton className="h-[150px] w-[200px] rounded-md bg-slate-300" />
                    </div>
                    <Skeleton className="h-4 w-[200px] bg-slate-300" />
                    <Skeleton className="h-4 w-[150px] bg-slate-300" />
                </CardContent>
            </Card>
        </div>
    );
}