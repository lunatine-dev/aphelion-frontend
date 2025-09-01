<script>
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";

    import {
        IconInnerShadowTop,
        IconDashboard,
        IconListDetails,
        IconServer,
        IconBrandGithub,
        IconGitCherryPick,
        IconBrandDocker,
        IconSettings,
        IconLogs,
        IconNotification,
        IconGauge,
        IconBellBolt,
    } from "@tabler/icons-svelte";

    import NavMain from "./nav-main.svelte";
    import NavUser from "./nav-user.svelte";

    let navItems = [
        {
            title: "Overview",
            items: [
                {
                    title: "Dashboard",
                    url: "/",
                    icon: IconDashboard,
                },
                {
                    title: "Notifications",
                    url: "/notifications",
                    icon: IconBellBolt,
                },
                {
                    title: "Settings",
                    url: "/settings",
                    icon: IconSettings,
                },
            ],
        },
        {
            title: "GitHub",
            items: [
                {
                    title: "Repositories",
                    url: "/github/repositories",
                    icon: IconGitCherryPick,
                },
            ],
        },
        {
            title: "Server",
            items: [
                {
                    title: "Containers",
                    url: "/server/containers",
                    icon: IconBrandDocker,
                },
                {
                    title: "Metrics",
                    url: "/server/metrics",
                    icon: IconGauge,
                },
                {
                    title: "Logs",
                    url: "/server/logs",
                    icon: IconLogs,
                },
            ],
        },
    ];

    const data = {
        user: {
            name: "Lunatine",
            email: "admin@lunatine.dev",
            avatar: "https://i.imgur.com/nzTWHlf.jpeg",
        },
    };

    let { ...restProps } = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton
                    class="data-[slot=sidebar-menu-button]:!p-1.5"
                >
                    {#snippet child({ props })}
                        <a href="/" {...props}>
                            <IconInnerShadowTop class="!size-5" />
                            <span class="text-base font-semibold"
                                >aphelion.lunatine.dev</span
                            >
                        </a>
                    {/snippet}
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Header>
    <Sidebar.Content>
        <NavMain items={navItems} />
    </Sidebar.Content>
    <Sidebar.Footer>
        <NavUser user={data.user} />
    </Sidebar.Footer>
</Sidebar.Root>
