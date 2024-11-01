"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar, } from "@/components/ui/sidebar"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { NavUser } from "@/components/nav-user"
import Link from 'next/link'
import { Search, Sparkles, Home, LucideIcon, ChevronDown, MoreHorizontal, ArrowUpRight, StarOff, Trash2, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Player, Report, Team } from "@prisma/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import NewReport from "@/components/reports/form"
import useSWR, { mutate } from "swr"
import { fetcher } from "@/lib/utils"

interface NavItem {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean,
    badge?: string
}

const navItems: NavItem[] = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
    },
    {
        title: "Search",
        url: "/search",
        icon: Search,
    },
    {
        title: "Ask AI",
        url: "/ai",
        icon: Sparkles,
    }
]

const TeamSwitcher = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [activeTeam, setActiveTeam] = useState(teams[0])

    useEffect(() => {
        setTeams([])
    }, [])

    if (!activeTeam) {
        return <></>
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-fit px-1.5">
                            <span className="truncate font-semibold">{teams[0].name}</span>
                            <ChevronDown className="opacity-50" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-64 rounded-lg"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Teams
                        </DropdownMenuLabel>
                        {teams.map((team, index) => (
                            <DropdownMenuItem
                                key={team.name}
                                onClick={() => setActiveTeam(team)}
                                className="gap-2 p-2"
                            >
                                {team.name}
                                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

const Main = () =>
    <SidebarMenu>
        {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
    </SidebarMenu>

const Reports = () => {
    const { isMobile } = useSidebar()
    const { data, isLoading } = useSWR("/api/reports", fetcher);

    return (
        <Dialog>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel>Reports</SidebarGroupLabel>
                <SidebarMenu>
                    {!isLoading && data.map((report: Report) => (
                        <SidebarMenuItem key={report.id}>
                            <SidebarMenuButton asChild>
                                <a href={`/reports/${report.id}`} title={report.reportAt.toLocaleDateString()}>
                                    <span>{report.type}</span>
                                    <span>{report.reportAt.toLocaleDateString()}</span>
                                </a>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontal />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <DropdownMenuItem>
                                        <StarOff className="text-muted-foreground" />
                                        <span>Remove from Favorites</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <ArrowUpRight className="text-muted-foreground" />
                                        <span>Open in New Tab</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Trash2 className="text-muted-foreground" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70">
                            <MoreHorizontal />
                            <Link href='/reports'>More</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarGroupAction>
                    <DialogTrigger asChild>
                        <Plus />
                    </DialogTrigger>
                </SidebarGroupAction>
            </SidebarGroup>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Start Report</DialogTitle>
                    <DialogDescription>
                        Quisque dapibus lorem sed pharetra viverra. Sed feugiat turpis nec est sagittis, in finibus tortor blandit. Sed facilisis nisi at iaculis rutrum.
                    </DialogDescription>
                    <NewReport />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const Players = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const { isMobile } = useSidebar()

    useEffect(() => {
        setPlayers([])
    }, [])

    return (
        <Dialog>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel>Players</SidebarGroupLabel>
                <SidebarMenu>
                    {players.map((player) => (
                        <SidebarMenuItem key={player.id}>
                            <SidebarMenuButton asChild>
                                <a href={`/Players/${player.id}`} title={player.name ?? ''}>
                                    <span>{player.name}</span>
                                    <span>{player.teamId}</span>
                                </a>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontal />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <DropdownMenuItem>
                                        <StarOff className="text-muted-foreground" />
                                        <span>Remove from Favorites</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <ArrowUpRight className="text-muted-foreground" />
                                        <span>Open in New Tab</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Trash2 className="text-muted-foreground" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70">
                            <MoreHorizontal />
                            <Link href='/players'>More</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarGroupAction>
                    <DialogTrigger asChild>
                        <Plus />
                    </DialogTrigger>
                </SidebarGroupAction>
            </SidebarGroup>
        </Dialog >
    )
}

const LeftAppSidebar = () => {
    return <Sidebar side="left" >
        <SidebarHeader>
            <TeamSwitcher />
            <Main />
        </SidebarHeader>
        <SidebarContent>
            <Reports />
            <SidebarRail />
            <Players />
        </SidebarContent>
        <SidebarRail />
    </Sidebar>
}

const RightAppSidebar = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return <Sidebar side="right" >
        <SidebarContent>
            <NavUser />
            <SidebarGroup>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />
            </SidebarGroup>
            <SidebarGroup>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
}

export { LeftAppSidebar, RightAppSidebar }