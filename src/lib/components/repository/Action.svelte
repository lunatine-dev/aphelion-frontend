<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import Confirmation from "$lib/components/buttons/Confirmation.svelte";

    let { title, description, type, buttons = [], span = "2", loading } = $props();

    let actionBackground = type === "destructive" ? "bg-red-700/10" : "bg-background";
    let border = type === "destructive" && "border-red-700/50";
    let buttonClass = type === "destructive" && "!bg-red-600/70 hover:!bg-red-900 text-white";
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
                    {#if button.type === "confirmation"}
                        <Confirmation
                            title={button.confirmationTitle ?? "Are you sure?"}
                            message={button.confirmationMessage ?? ""}
                            confirmText="Remove"
                            confirmClasses={buttonClass}
                            buttonVariant={button.variant}
                            buttonText={button.text}
                            buttonClasses={buttonClass}
                            onConfirm={button.onClick}
                            disabled={loading || button?.disabled || false}
                        />
                    {:else}
                        <Button
                            disabled={loading || button?.disabled || false}
                            variant={button?.variant ?? "secondary"}
                            class={`cursor-pointer ${buttonClass}`}
                            onclick={button.onClick}>{button.text}</Button
                        >
                    {/if}
                {/each}
            </div>
        </Card.Content>
    </Card.Root>
</div>
