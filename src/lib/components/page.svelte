<script>
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";

    let {
        children,
        title,
        buttons = [],
        extraClasses,
        crumbs = [],
        classOverride,
        blank = false,
        buttonsSnippet,
    } = $props();
</script>

<header
    class="h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear"
>
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Sidebar.Trigger class="-ml-1" />
        <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
        {#if !crumbs.length}
            <h1 class="text-base font-medium">
                {title ?? "Title"}
            </h1>
        {:else}
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    {#each crumbs as crumb, index}
                        <Breadcrumb.Item>
                            {#if crumb.href}
                                <Breadcrumb.Link href={crumb.href}>
                                    {crumb.title}
                                </Breadcrumb.Link>
                            {:else}
                                <Breadcrumb.Page>
                                    {crumb.title}
                                </Breadcrumb.Page>
                            {/if}
                        </Breadcrumb.Item>
                        {#if index < crumbs.length - 1}
                            <Breadcrumb.Separator />
                        {/if}
                    {/each}
                </Breadcrumb.List>
            </Breadcrumb.Root>
        {/if}
        <div class="ml-auto flex items-center gap-2">
            {#each buttons as button}
                <Button
                    variant="ghost"
                    size={button.size}
                    class="dark:text-foreground hidden sm:flex"
                    target={button.target}
                    href={button.href}
                >
                    {#if button.icon}
                        <button.icon />
                    {/if}
                    {button.text}
                </Button>
            {/each}
            {@render buttonsSnippet?.()}
        </div>
    </div>
</header>

{#if !blank}
    <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
            <div class={classOverride ? classOverride : `flex flex-col gap-4 py-4 md:gap-6 md:py-6 ${extraClasses}`}>
                {@render children?.()}
            </div>
        </div>
    </div>
{:else}
    <div class="flex flex-1 flex-col">
        {@render children?.()}
    </div>
{/if}
