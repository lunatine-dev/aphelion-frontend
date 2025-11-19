<script>
    import { get, post } from "$lib/utility/api.js";

    import Page from "$lib/components/page.svelte";
    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { onMount } from "svelte";

    let { data } = $props();
    let loading = $state(true);
    let repos = $state([]);

    const fetchRepos = async () => {
        console.log(data);
        loading = true;
        repos = await get("/repos/github", data.accessToken);
        loading = false;
    };

    onMount(() => {
        fetchRepos();
    });
</script>

<Page title="Repositories">
    {#if loading}
        <Empty.Root class="w-full">
            <Empty.Header>
                <Empty.Media variant="icon">
                    <Spinner />
                </Empty.Media>
                <Empty.Title>Fetching Repositories</Empty.Title>
            </Empty.Header>
        </Empty.Root>
    {/if}
</Page>
