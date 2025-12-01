<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";

    let { title, description, type, buttons = [], span = "2" } = $props();

    let actionBackground = type === "destructive" ? "bg-red-700/10" : "bg-background";
    let border = type === "destructive" && "border-red-700/50";
    let buttonClass = type === "destructive" && "!bg-red-700/50 hover:!bg-red-900/50";
</script>

<div class="col-span-full xl:col-span-{span}">
    <Card.Root class="bg-transparent border pb-0 h-full {border}">
        <Card.Content class="px-0 flex flex-col h-full">
            <div class="px-6 pb-6">
                <h1 class="text-lg mb-2 font-bold">{title}</h1>
                <p class="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            <div class="border-t {border} flex justify-end p-4 {actionBackground} mt-auto">
                {#each buttons as button}
                    <Button
                        variant={button?.variant ?? "secondary"}
                        class={`cursor-pointer ${buttonClass}`}
                        onclick={button.onClick}>{button.text}</Button
                    >
                {/each}
            </div>
        </Card.Content>
    </Card.Root>
</div>
