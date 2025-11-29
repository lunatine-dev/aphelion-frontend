<script>
    import * as Card from "$lib/components/ui/card/index.js";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";

    import IconCheck from "@tabler/icons-svelte/icons/check";
    import IconX from "@tabler/icons-svelte/icons/x";

    let { status = false, text = "", loading = false } = $props();

    let color = $derived(loading ? "bg-secondary" : status ? "bg-green-600" : "bg-rose-600");
    let Icon = $derived(status ? IconCheck : IconX);
    let width = Math.random() * (100 - 60) + 80;
</script>

<Card.Root>
    <Card.Content>
        <div class="flex items-center justify-between">
            <span class="text-foreground font-medium">
                {#if loading}
                    <Skeleton
                        class="inline-block h-[1em] bg-gray-600/50 mr-1 last-child:mr-0"
                        style={`width:${width}px;`}
                    />
                {:else}
                    {text}
                {/if}
            </span>

            <div class="{color} flex h-6 w-6 items-center justify-center rounded-full">
                {#if loading}
                    <Spinner class="text-primary w-4 h-4" />
                {:else}
                    <Icon class="text-secondary h-4 w-4" />
                {/if}
            </div>
        </div>
    </Card.Content>
</Card.Root>
