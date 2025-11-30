<script>
    import { onMount } from "svelte";
    import { get, post } from "$lib/utility/api.js";

    import Page from "$lib/components/page.svelte";
    import StatHolder from "$lib/components/statistics/StatHolder.svelte";

    import IconBrandYoutube from "@tabler/icons-svelte/icons/brand-youtube";

    let { data } = $props();

    let loading = $state(true);
    let managedRepos = $state(0);

    const getStats = async () => {
        loading = true;
        const general = await get("/statistics/general", data.accessToken);
        managedRepos = general.repos;
        loading = false;
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

        <!--        <StatHolder-->
        <!--            title="Repositories"-->
        <!--            value={20}-->
        <!--            action={{-->
        <!--                active: true,-->
        <!--                type: "neutral",-->
        <!--                value: 10,-->
        <!--                period: "month",-->
        <!--                description: "Lifetime repositories",-->
        <!--            }}-->
        <!--            {loading}-->
        <!--        />-->
        <!--        <StatHolder-->
        <!--            title="Repositories"-->
        <!--            value={17}-->
        <!--            action={{-->
        <!--                active: true,-->
        <!--                type: "decrease",-->
        <!--                value: 3,-->
        <!--                period: "month",-->
        <!--                description: "Lifetime repositories",-->
        <!--            }}-->
        <!--            {loading}-->
        <!--        />-->
        <!--        <StatHolder-->
        <!--            title="Repositories"-->
        <!--            value={16}-->
        <!--            action={{-->
        <!--                active: true,-->
        <!--                type: "decrease",-->
        <!--                value: 1,-->
        <!--                period: "month",-->
        <!--                description: "Lifetime repositories",-->
        <!--            }}-->
        <!--            {loading}-->
        <!--        />-->
    </div>
</Page>
