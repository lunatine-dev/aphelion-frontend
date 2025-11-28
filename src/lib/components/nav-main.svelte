<script>
    import { page } from "$app/state";

    import { Button } from "$lib/components/ui/button/index.js";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";

    import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
    import IconDashboard from "@tabler/icons-svelte/icons/dashboard";

    let { items } = $props();
    let openMap = $state({});
</script>

{#each items as item (item.title)}
    <Sidebar.Group>
        <Sidebar.GroupLabel>{item.title}</Sidebar.GroupLabel>
        <Sidebar.GroupContent class="flex flex-col gap-2">
            <Sidebar.Menu>
                {#each item.items as navItem (navItem.title)}
                    {#if !navItem.type}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton
                                tooltipContent={navItem.title}
                                isActive={navItem.url === "/"
                                    ? page.url.pathname === navItem.url
                                    : page.url.pathname.includes(navItem.url)}
                            >
                                {#snippet child({ props })}
                                    <a href={navItem.url} {...props}>
                                        {#if navItem.icon}
                                            <navItem.icon />
                                        {/if}
                                        <span>{navItem.title}</span>
                                    </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {:else if navItem.type === "collapse"}
                        <Collapsible.Root
                            open={navItem.items?.some(
                                (c) => c.url === page.url.pathname
                            )}
                            class="group/collapsible"
                        >
                            {#snippet child({ props })}
                                <Sidebar.MenuItem {...props}>
                                    <Collapsible.Trigger>
                                        {#snippet child({ props })}
                                            <Sidebar.MenuButton
                                                {...props}
                                                tooltipContent={navItem.title}
                                            >
                                                {#if navItem.icon}
                                                    <navItem.icon />
                                                {/if}
                                                <span>{navItem.title}</span>
                                                <IconChevronRight
                                                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                                />
                                            </Sidebar.MenuButton>
                                        {/snippet}
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                        <Sidebar.MenuSub>
                                            {#each navItem.items as subItem (subItem.title)}
                                                <Sidebar.MenuSubItem>
                                                    <Sidebar.MenuSubButton>
                                                        {#snippet child({
                                                            props,
                                                        })}
                                                            <a
                                                                href={subItem.url}
                                                                {...props}
                                                            >
                                                                {#if subItem.icon}
                                                                    <subItem.icon
                                                                    />
                                                                {/if}
                                                                <span
                                                                    >{subItem.title}</span
                                                                >
                                                            </a>
                                                        {/snippet}
                                                    </Sidebar.MenuSubButton>
                                                </Sidebar.MenuSubItem>
                                            {/each}
                                        </Sidebar.MenuSub>
                                    </Collapsible.Content>
                                </Sidebar.MenuItem>
                            {/snippet}
                        </Collapsible.Root>
                    {/if}
                {/each}
            </Sidebar.Menu>
        </Sidebar.GroupContent>
    </Sidebar.Group>
{/each}
