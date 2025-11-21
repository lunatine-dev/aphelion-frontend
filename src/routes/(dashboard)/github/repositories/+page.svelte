<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    import { get, post } from "$lib/utility/api.js";

    import Page from "$lib/components/page.svelte";
    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";

    import LanguageIcon from "$lib/components/LanguageIcon.svelte";

    let page = $state(1);
    let perPage = 12;

    let { data } = $props();
    let loading = $state(true);
    let repos = $state([]);
    let pagedRepos = $derived(
        repos.slice((page - 1) * perPage, page * perPage)
    );

    const fetchRepos = async () => {
        loading = true;
        repos = await get("/repos/github", data.accessToken);
        loading = false;
    };

    onMount(() => {
        fetchRepos();
    });
</script>

<Page title="Repositories">
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
                                <div
                                    class="flex-shrink-0"
                                    style="font-size: 1.25em;"
                                >
                                    <LanguageIcon language={repo.language} />
                                </div>
                                <div class="flex flex-col justify-center">
                                    <Card.Title>
                                        {repo.name}
                                    </Card.Title>
                                    <Card.Description
                                        >@{repo.owner.login}</Card.Description
                                    >
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Content>
                            <div class="flex gap-2">
                                <Badge
                                    variant={repo.private
                                        ? "destructive"
                                        : "secondary"}
                                    class={!repo.private
                                        ? "bg-green-500 text-white dark:bg-green-600"
                                        : ""}
                                    >{repo.private
                                        ? "Private"
                                        : "Public"}</Badge
                                >
                                {#if repo.archived}
                                    <Badge
                                        variant="secondary"
                                        class="bg-gray-600">Archived</Badge
                                    >
                                {/if}
                                {#if repo.is_template}
                                    <Badge
                                        variant="secondary"
                                        class="bg-purple-600">Template</Badge
                                    >
                                {/if}
                                {#if repo.fork}
                                    <Badge
                                        variant="secondary"
                                        class="bg-blue-500">Fork</Badge
                                    >
                                {/if}
                                {#if repo.license}
                                    <Badge
                                        variant="secondary"
                                        class="bg-gray-600"
                                    >
                                        {repo.license.spdx_id}</Badge
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
                                    <Pagination.Link
                                        {page}
                                        isActive={currentPage === page.value}
                                    >
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
