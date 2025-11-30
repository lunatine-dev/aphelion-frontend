<script>
    import Page from "$lib/components/page.svelte";

    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<Page crumbs={[{ title: "Dashboard", href: "/" }, { title: "Containers" }]}>
    <Empty.Root class="w-full">
        <Empty.Header>
            <Empty.Media variant="icon">
                <Spinner />
            </Empty.Media>
            <Empty.Title>Loading Containers</Empty.Title>
        </Empty.Header>
    </Empty.Root>
</Page>
