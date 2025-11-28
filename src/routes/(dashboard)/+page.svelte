<script>
    import Page from "$lib/components/page.svelte";
    import StatHolder from "$lib/components/statistics/StatHolder.svelte";

    import IconBrandYoutube from "@tabler/icons-svelte/icons/brand-youtube";
    import { onMount } from "svelte";

    let loading = $state(true);
</script>

<Page crumbs={[{ title: "Dashboard" }]}>
    <div
        class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6"
    >
        <StatHolder title="Repositories" value={10} {loading} />
        <StatHolder
            title="Repositories"
            value={20}
            action={{
                active: true,
                type: "increase",
                value: 10,
                period: "month",
                description: "Lifetime repositories",
            }}
            {loading}
        />
        <StatHolder
            title="Repositories"
            value={17}
            action={{
                active: true,
                type: "decrease",
                value: 3,
                period: "month",
                description: "Lifetime repositories",
            }}
            {loading}
        />
        <StatHolder
            title="Repositories"
            value={16}
            action={{
                active: true,
                type: "decrease",
                value: 1,
                period: "month",
                description: "Lifetime repositories",
            }}
            {loading}
        />
    </div>
</Page>
