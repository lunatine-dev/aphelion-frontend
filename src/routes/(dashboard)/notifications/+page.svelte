<script>
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import Page from "$lib/components/page.svelte";

    let data = [
        {
            title: "Yippee",
            description: "Nothing bad happened",
            actions: "OK",
        },
    ];
</script>

<Page
    crumbs={[{ title: "Dashboard", href: "/" }, { title: "Notifications" }]}
    extraClasses="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
>
    <div class="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <DataTable {data} {columns} />
    </div>
</Page>
