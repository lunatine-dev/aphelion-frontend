<script>
    import TimeAgo from "javascript-time-ago";
    import en from "javascript-time-ago/locale/en";

    import * as Table from "$lib/components/ui/table/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";

    import IconX from "@tabler/icons-svelte/icons/x";
    import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
    import IconChevronUp from "@tabler/icons-svelte/icons/chevron-up";

    let { logs } = $props();
    TimeAgo.addDefaultLocale(en);
    const timeAgo = new TimeAgo("en-US");
</script>

<div class="px-4">
    <Table.Root>
        <Table.Header>
            <Table.Row>
                <Table.Head class="w-[100px]">Job ID</Table.Head>
                <Table.Head>Tags</Table.Head>
                <Table.Head>Created at</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each logs as item, index}
                <Table.Row class="cursor-pointer group" onclick={() => (item.open = !item?.open ?? true)}>
                    <Table.Cell
                        class="font-medium align-top"
                        rowspan={item.open ? (item.logs.length ? item.logs.length + 1 : 1) : 1}>{item._id}</Table.Cell
                    >
                    <Table.Cell class="font-medium">
                        <Badge variant="secondary">{item.type}</Badge>
                        {#if item.status === "success"}
                            <Badge class="bg-green-600 text-white">success</Badge>
                        {:else}
                            <Badge variant="destructive">{item.status}</Badge>
                        {/if}
                    </Table.Cell>
                    <Table.Cell class="text-muted-foreground group-hover:text-white"
                        >{timeAgo.format(new Date(item.createdAt).getTime())}</Table.Cell
                    >
                    <Table.Cell class="w-[50px]">
                        {#if item?.open}
                            <IconChevronUp class="text-muted-foreground group-hover:text-white" />
                        {:else}
                            <IconChevronDown class="text-muted-foreground group-hover:text-white" />
                        {/if}
                    </Table.Cell>
                </Table.Row>

                {#if item?.open}
                    {#each item?.logs as log}
                        <Table.Row>
                            <Table.Cell colspan="3">
                                <div class="flex gap-2">
                                    <Badge>{log.tag}</Badge>
                                    <span>{log.text}</span>
                                    <span class="text-muted-foreground ml-auto"> {timeAgo.format(log.timestamp)}</span>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    {:else}
                        <Table.Row>
                            <Table.Cell colspan="4" class="text-center">No logs found</Table.Cell>
                        </Table.Row>
                    {/each}
                {/if}
            {:else}
                <Table.Row>
                    <Table.Cell colspan="3" class="text-center">No logs found</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>
