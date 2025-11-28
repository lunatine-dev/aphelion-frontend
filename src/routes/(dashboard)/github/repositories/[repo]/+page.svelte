<script>
    import Page from "$lib/components/page.svelte";

    import * as Card from "$lib/components/ui/card/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";

    import IconExclamationCircle from "@tabler/icons-svelte/icons/exclamation-circle";
    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";

    let { data } = $props();

    let loading = $state(true);
    let found = $state(true);

    let message = $state("Internal Server Error");
    let description = $state("We could not find that repository");
</script>

{#if found}
    <Page
        title={data.repo}
        crumbs={[
            { title: "Dashboard", href: "/" },
            { title: "Repositories", href: "/github/repositories" },
            { title: "Edit repository" },
        ]}
    >
        <div class="grid grid-cols-1 gap-4 px-4 lg:px-6 xl:grid-cols-5">
            <!-- Cards -->
            <div class="col-span-full xl:col-span-2">
                <Card.Root class="bg-transparent">
                    <Card.Content>
                        <div class="flex flex-col items-center gap-4 p-6">
                            <Avatar.Root class="w-20 h-20 border-2">
                                <Avatar.Image></Avatar.Image>
                                <Avatar.AvatarFallback>R</Avatar.AvatarFallback>
                            </Avatar.Root>
                            <h2 class="text-muted-foreground text-xl">
                                repo owner
                            </h2>
                            <Button
                                disabled={loading}
                                href="#"
                                variant="secondary"
                                class={loading
                                    ? ""
                                    : "bg-accent text-accent-foreground hover:bg-accent hover:brightness-75"}
                            >
                                {#if loading}
                                    <Spinner /> Please wait
                                {:else}
                                    <IconBrandGithub />
                                    Open in GitHub
                                {/if}
                            </Button>
                        </div>
                    </Card.Content>
                </Card.Root>
            </div>
            <div class="col-span-full xl:col-span-3">
                <Card.Root class="bg-transparent"></Card.Root>
            </div>
        </div>
    </Page>
{:else}
    <Empty.Root class="w-full">
        <Empty.Header>
            <Empty.Media variant="icon">
                <IconExclamationCircle />
            </Empty.Media>
            <Empty.Title>{message}</Empty.Title>
            <Empty.Description>{description}</Empty.Description>
        </Empty.Header>
        <Empty.Content>
            <div class="flex gap-2">
                <Button variant="outline" href="/github/repositories"
                    >Go Back</Button
                >
            </div>
        </Empty.Content>
    </Empty.Root>
{/if}
