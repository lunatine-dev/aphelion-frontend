<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { toast } from "svelte-sonner";

    import { get, post } from "$lib/utility/api.js";

    import Page from "$lib/components/page.svelte";

    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import * as Item from "$lib/components/ui/item/index.js";

    import LanguageIcon from "$lib/components/LanguageIcon.svelte";
    import IconPlus from "@tabler/icons-svelte/icons/plus";
    import IconLock from "@tabler/icons-svelte/icons/lock";
    import IconWorld from "@tabler/icons-svelte/icons/world";

    const perPage = 12;

    let { data } = $props();

    let page = $state(1);
    let loading = $state(true);
    let loadingLiveRepos = $state(true);
    let liveRepoMessage = $state("Fetching repositories");
    let manageDialog = $state(false);
    let repos = $state([]);
    let liveRepos = $state([]);
    let pagedRepos = $derived(repos.slice((page - 1) * perPage, page * perPage));

    const fetchRepos = async () => {
        loading = true;
        repos = await get("/repos/live", data.accessToken);
        loading = false;
    };

    const fetchLiveRepos = async () => {
        if (loading) return;
        loadingLiveRepos = true;
        liveRepoMessage = "Fetching repositories";

        const liveRepoData = await get("/repos/github", data.accessToken);

        // Remove managed repos from list
        const repoIds = new Set(repos.map((live) => live.id));
        liveRepos = liveRepoData.filter((repo) => !repoIds.has(repo.id));

        loadingLiveRepos = false;
    };

    const manageLiveRepo = async (repo) => {
        loading = true;
        liveRepoMessage = "Saving Repository...";

        try {
            let payload = {
                id: repo.id,
                is_private: repo.private,
                owner: repo.owner,
            };
            let resp = await post(`/repos/github/${repo.full_name}/manage`, payload, data.accessToken);

            await fetchRepos();
            manageDialog = false;
            toast.success(resp?.message ?? "Success");
        } catch (err) {
            console.error(err);
            toast.error(err?.body?.message ?? err?.message ?? "Unknown error");
        }
    };

    onMount(() => {
        fetchRepos();
    });
</script>

<Page crumbs={[{ title: "Dashboard", href: "/" }, { title: "Repositories" }]}>
    {#snippet buttonsSnippet()}
        <Dialog.Root bind:open={manageDialog}>
            <Dialog.Trigger class={buttonVariants({ variant: "secondary" })} onclick={fetchLiveRepos}
                ><IconPlus /> Manage Repo</Dialog.Trigger
            >
            <Dialog.Content class="sm:max-w-[425px]">
                <Dialog.Header>
                    <Dialog.Title>Manage Repository</Dialog.Title>
                    <Dialog.Description>Choose a repository to manage</Dialog.Description>
                </Dialog.Header>
                <div class="grid gap-4">
                    <ScrollArea class="h-72 w-full rounded-md border">
                        {#if loadingLiveRepos || loading}
                            <div class="flex items-center justify-center h-full">
                                <div class="flex items-center gap-2 text-muted-foreground">
                                    <Spinner class="w-5 h-5" />
                                    <span>{liveRepoMessage}</span>
                                </div>
                            </div>
                        {:else}
                            <Item.Group>
                                {#each liveRepos as repo, index}
                                    <Item.Root>
                                        <Item.Media variant="icon">
                                            {#if repo?.private}
                                                <IconLock class="text-rose-600" />
                                            {:else}
                                                <IconWorld class="text-blue-600" />
                                            {/if}
                                        </Item.Media>
                                        <Item.Content class="gap-1">
                                            <Item.Title>{repo?.name}</Item.Title>
                                            <Item.Description>@{repo?.owner?.login}</Item.Description>
                                        </Item.Content>
                                        <Item.Actions>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                class="rounded-full cursor-pointer"
                                                onclick={() => manageLiveRepo(repo)}
                                            >
                                                <IconPlus />
                                            </Button>
                                        </Item.Actions>
                                    </Item.Root>
                                    {#if index !== liveRepos.length - 1}
                                        <Item.Separator />
                                    {/if}
                                {/each}
                            </Item.Group>
                        {/if}
                    </ScrollArea>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    {/snippet}
    {#if loading}
        <Empty.Root class="w-full">
            <Empty.Header>
                <Empty.Media variant="icon">
                    <Spinner />
                </Empty.Media>
                <Empty.Title>Fetching Repositories</Empty.Title>
            </Empty.Header>
        </Empty.Root>
    {:else}
        <div class="flex flex-col min-h-[500px]">
            <div
                class=" @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6"
            >
                {#each pagedRepos as repo}
                    <Card.Root
                        class="gap-0 cursor-pointer transition-all transform hover:scale-[1.02]"
                        onclick={() => {
                            goto(`/github/repositories/${repo.id}`);
                        }}
                    >
                        <Card.Header>
                            <div class="flex gap-4">
                                <div class="flex-shrink-0" style="font-size: 1.25em;">
                                    <LanguageIcon language={repo.language} />
                                </div>
                                <div class="flex flex-col justify-center">
                                    <Card.Title>
                                        {repo.name}
                                    </Card.Title>
                                    <Card.Description>@{repo.owner.login}</Card.Description>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Content>
                            <div class="flex gap-2">
                                <Badge
                                    variant={repo.private ? "destructive" : "secondary"}
                                    class={!repo.private ? "bg-green-500 text-white dark:bg-green-600" : ""}
                                    >{repo.private ? "Private" : "Public"}</Badge
                                >
                                {#if repo.webhook}
                                    <Badge>Webhook</Badge>
                                {/if}
                                {#if repo.archived}
                                    <Badge variant="secondary" class="bg-gray-600">Archived</Badge>
                                {/if}
                                {#if repo.is_template}
                                    <Badge variant="secondary" class="bg-purple-600">Template</Badge>
                                {/if}
                                {#if repo.fork}
                                    <Badge variant="secondary" class="bg-blue-500">Fork</Badge>
                                {/if}
                                {#if repo.license}
                                    <Badge variant="secondary" class="bg-gray-600">
                                        {repo.license_type}</Badge
                                    >
                                {/if}
                            </div>
                        </Card.Content>
                        <Card.Footer></Card.Footer>
                    </Card.Root>
                {/each}
            </div>
        </div>
        <div class="mt-auto">
            <Pagination.Root count={repos.length} {perPage} bind:page>
                {#snippet children({ pages, currentPage })}
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.PrevButton />
                        </Pagination.Item>
                        {#each pages as page (page.key)}
                            {#if page.type === "ellipsis"}
                                <Pagination.Item>
                                    <Pagination.Ellipsis />
                                </Pagination.Item>
                            {:else}
                                <Pagination.Item>
                                    <Pagination.Link {page} isActive={currentPage === page.value}>
                                        {page.value}
                                    </Pagination.Link>
                                </Pagination.Item>
                            {/if}
                        {/each}
                        <Pagination.Item>
                            <Pagination.NextButton />
                        </Pagination.Item>
                    </Pagination.Content>
                {/snippet}
            </Pagination.Root>
        </div>
    {/if}
</Page>
