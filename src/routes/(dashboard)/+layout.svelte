<script>
    import "../../app.css";

    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/app-sidebar.svelte";

    let { children, data } = $props();
</script>

<Sidebar.Provider
    style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
    <AppSidebar variant="inset" user={data?.user} />
    <Sidebar.Inset>
        {@render children?.()}
    </Sidebar.Inset>
</Sidebar.Provider>
