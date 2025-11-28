<script>
    import Page from "$lib/components/page.svelte";

    let { data } = $props();
</script>

<Page
    title={data.repo}
    crumbs={[{ title: "Repositories", href: "/github/repositories" }]}>hi</Page
>
