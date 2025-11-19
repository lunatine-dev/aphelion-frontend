<script>
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import NavMain from "./nav-main.svelte";
    import NavUser from "./nav-user.svelte";

    import IconInnerShadowTop from "@tabler/icons-svelte/icons/inner-shadow-top";
    import IconDashboard from "@tabler/icons-svelte/icons/dashboard";
    import IconListDetails from "@tabler/icons-svelte/icons/list-details";
    import IconServer from "@tabler/icons-svelte/icons/server";
    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import IconGitCherryPick from "@tabler/icons-svelte/icons/git-cherry-pick";
    import IconBrandDocker from "@tabler/icons-svelte/icons/brand-docker";
    import IconSettings from "@tabler/icons-svelte/icons/settings";
    import IconLogs from "@tabler/icons-svelte/icons/logs";
    import IconNotification from "@tabler/icons-svelte/icons/notification";
    import IconGauge from "@tabler/icons-svelte/icons/gauge";
    import IconBellBolt from "@tabler/icons-svelte/icons/bell-bolt";
    import IconPlanet from "@tabler/icons-svelte/icons/planet";

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

    let { user, ...restProps } = $props();
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
                            <IconPlanet class="!size-5" />
                            <span class="text-base font-semibold">aphelion</span
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
        <NavUser {user} />
    </Sidebar.Footer>
</Sidebar.Root>
