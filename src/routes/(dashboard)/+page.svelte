<script>
    import { onMount } from "svelte";
    import { get } from "$lib/utility/api.js";

    import Page from "$lib/components/page.svelte";
    import StatHolder from "$lib/components/statistics/StatHolder.svelte";

    let { data } = $props();

    let loading = $state(true);
    let managedRepos = $state(0);

    const getStats = async () => {
        loading = true;
        try {
            const generalStats = await get("/statistics/general", data.accessToken);
            managedRepos = generalStats?.repos ?? 0;
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        getStats();
    });
</script>

<Page crumbs={[{ title: "Dashboard" }]}>
    <div
        class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6"
    >
        <StatHolder title="Repositories Managed" value={managedRepos} {loading} />
    </div>
</Page>
