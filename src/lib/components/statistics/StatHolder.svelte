<script>
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";

    import TrendingDownIcon from "@tabler/icons-svelte/icons/trending-down";
    import TrendingUpIcon from "@tabler/icons-svelte/icons/trending-up";
    import MinusIcon from "@tabler/icons-svelte/icons/minus";

    let {
        title,
        value,
        action = {
            active: false,
            type: "neutral",
            value: 0,
            period: "month",
            description: "Lifetime repositories",
        },
        loading,
    } = $props();
</script>

{#if loading}
    <div class="aspect-16/9 animate-pulse bg-muted/60 rounded-lg"></div>
{:else}
    <Card.Root class="@container/card">
        <Card.Header>
            <Card.Description>{title}</Card.Description>
            <Card.Title
                class="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums"
            >
                {value}
            </Card.Title>
            {#if action.active}
                <Card.Action>
                    <Badge variant="outline">
                        {#if action.type === "increase"}
                            <TrendingUpIcon />
                        {:else if action.type === "decrease"}
                            <TrendingDownIcon />
                        {:else if action.type === "neutral"}
                            <MinusIcon />
                        {/if}
                        {action.value}
                    </Badge>
                </Card.Action>
            {/if}
        </Card.Header>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            {#if action.active}
                <div class="line-clamp-1 flex gap-2 font-medium">
                    {#if action.type === "increase"}
                        Trending up this {action.period}
                        <TrendingUpIcon class="size-4" />
                    {:else if action.type === "decrease"}
                        Trending down this {action.period}
                        <TrendingDownIcon class="size-4" />
                    {:else}
                        No change this {action.period}
                    {/if}
                </div>
            {/if}
            <div class="text-muted-foreground">{action.description}</div>
        </Card.Footer>
    </Card.Root>
{/if}
