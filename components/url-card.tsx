import { BellIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type CardProps = React.ComponentProps<typeof Card> & {
  projectURL: string;
  projectId: string;
};

export function CardDemo({ className, projectURL, projectId }: CardProps) {

    const openProjectLink = () => {
        window.open(projectURL, "_blank");
      };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Your Hosted Link</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <div
            key="1"
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{projectURL}</p>
              <p className="text-sm text-muted-foreground">{projectId}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      <Button onClick={openProjectLink} className="w-full">
        <CheckIcon className="mr-2 h-4 w-4" /> See your project
      </Button>
      </CardFooter>
    </Card>
  );
}
