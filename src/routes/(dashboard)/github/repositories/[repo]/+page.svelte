<script>
    import Page from "$lib/components/page.svelte";

    let { data } = $props();
</script>

<Page
    title={data.repo}
    crumbs={[
        { title: "Dashboard", href: "/" },
        { title: "Repositories", href: "/github/repositories" },
        { title: data.repo },
    ]}
>
    <p></p>
</Page>
