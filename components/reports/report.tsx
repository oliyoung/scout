import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu"
import { Report } from "@prisma/client"

const ReportComponent = ({ report }: { report: Report }) => {
    return (
        <div className={cn("space-y-3")}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="overflow-hidden rounded-md">
                        {/* <Image
                            src={album.cover}
                            alt={album.name}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-105",
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                            )}
                        /> */}
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                    <ContextMenuItem>Add to Library</ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-48">
                            <ContextMenuItem>
                                <PlusCircledIcon className="mr-2 h-4 w-4" />
                                New Playlist
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Play Next</ContextMenuItem>
                    <ContextMenuItem>Play Later</ContextMenuItem>
                    <ContextMenuItem>Create Station</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Like</ContextMenuItem>
                    <ContextMenuItem>Share</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">Name</h3>
                <p className="text-xs text-muted-foreground">Artist</p>
            </div>
        </div>
    )
}

export default ReportComponent