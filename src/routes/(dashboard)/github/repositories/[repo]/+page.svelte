<script>
    import { onMount } from "svelte";
    import { get } from "$lib/utility/api.js";
    import prettyBytes from "pretty-bytes";

    import Page from "$lib/components/page.svelte";

    import * as Card from "$lib/components/ui/card/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";

    import IconExclamationCircle from "@tabler/icons-svelte/icons/exclamation-circle";
    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import Status from "$lib/components/repository/Status.svelte";
    import LanguageIcon from "$lib/components/LanguageIcon.svelte";

    let { data } = $props();

    let loading = $state(true);
    let found = $state(true);
    let env = $state("");
    let liveRepo = $state({});
    let repo = $state({});
    let logs = $state({});

    let message = $state("Internal Server Error");
    let description = $state("We could not find that repository");

    const fetchRepo = {
        live: async () => {
            return await get(`/repos/live/${data.repo}`, data.accessToken);
        },
        logs: async () => {
            return await get(`/repos/live/${data.repo}/logs`, data.accessToken);
        },
        github: async (url) => {
            return await get(url, data.accessToken);
        },
    };

    const fetchData = async () => {
        loading = true;

        try {
            const {
                name,
                owner: { login },
                ...response
            } = await fetchRepo.live();

            env = response.env;
            liveRepo = response;

            const url = `/repos/github/${login}/${name}`;
            const funcs = [fetchRepo.logs, fetchRepo.github];

            [logs, repo] = await Promise.all(funcs.map((fn) => fn(url)));

            console.log(logs);
        } catch (e) {
            console.error("Failed to fetch repo data", e);
            found = false;
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        fetchData();
    });
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
        <Tabs.Root value="details">
            <Tabs.List
                class="grid w-full grid-cols-1 lg:grid-cols-3 lg:mb-5 bg-transparent px-4 lg:px-6 *:transition-colors *:hover:bg-input/30 *:hover:ring *:hover:ring-ring/25 mb-[4.5em]"
            >
                <Tabs.Trigger value="details" disabled={loading}>Details</Tabs.Trigger>
                <Tabs.Trigger value="env" disabled={loading}>Environment variables</Tabs.Trigger>
                <Tabs.Trigger value="logs" disabled={loading}>Logs</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="details">
                <div class="grid grid-cols-1 gap-4 px-4 lg:px-6 xl:grid-cols-5 items-stretch">
                    <!-- Cards -->
                    <div class="col-span-full xl:col-span-2">
                        <Card.Root class="bg-transparent h-full">
                            <Card.Content>
                                <div class="flex flex-col items-center gap-4 p-6">
                                    {#if !loading}
                                        <Avatar.Root class="w-20 h-20 border-2">
                                            <Avatar.Image src={repo?.owner?.avatar_url} alt={repo?.owner?.login} />
                                            <Avatar.AvatarFallback
                                                >{repo?.owner?.login.charAt(0).toUpperCase()}</Avatar.AvatarFallback
                                            >
                                        </Avatar.Root>

                                        <h2 class="text-muted-foreground text-xl">{repo?.owner?.login}</h2>
                                    {:else}
                                        <Skeleton class="w-20 h-20 rounded-full bg-gray-600/50" />
                                        <h2 class="text-muted-foreground text-xl">
                                            <Skeleton class="inline-block h-[1em] w-[200px] bg-gray-600/50" />
                                        </h2>
                                    {/if}
                                    <Button
                                        disabled={loading}
                                        href={repo?.html_url ?? "#"}
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
                        <Card.Root class="bg-transparent">
                            <Card.Content>
                                <div class="flex text-2xl items-center gap-2 mb-2">
                                    <IconBrandGithub class="h-[1em] inline-block" />
                                    <h1>
                                        {#if loading}
                                            <Skeleton class="inline-block h-[1em] w-[175px] bg-gray-600/50 mr-1" />
                                        {:else}
                                            {repo.name}
                                        {/if}
                                    </h1>
                                    <Badge
                                        variant={loading ? "secondary" : repo.private ? "destructive" : "secondary"}
                                        class={`ml-auto ${loading ? "" : repo.private ? "" : "bg-green-600 text-white"}`}
                                        >{loading ? "Loading" : repo.private ? "Private" : "Public"}</Badge
                                    >
                                </div>
                                {#if loading}
                                    <Skeleton class="inline-block h-[1em] w-[25px] bg-gray-600/50 mr-1" />
                                    <Skeleton class="inline-block h-[1em] w-[100px] bg-gray-600/50" />
                                {:else}
                                    <LanguageIcon language={repo.language ?? "code"} text={true} size="1em" />
                                {/if}
                                <div
                                    class="flex flex-col text-sm space-y-1 text-muted-foreground mt-3 *:items-center *:flex *:gap-1"
                                >
                                    <div>
                                        📅 Created:
                                        {#if loading}
                                            <Skeleton class="inline-block h-[1em] w-[100px] bg-gray-600/50" />{:else}
                                            {new Date(repo.created_at).toLocaleDateString()}
                                        {/if}
                                    </div>
                                    <div>
                                        🛠️ Updated:
                                        {#if loading}
                                            <Skeleton
                                                class="inline-block h-[1em] w-[100px] bg-gray-600/50"
                                            />{:else}{new Date(repo.created_at).toLocaleDateString()}
                                        {/if}
                                    </div>
                                    <div>
                                        📂 Size:
                                        {#if loading}
                                            <Skeleton class="inline-block h-[1em] w-[100px] bg-gray-600/50" />{:else}
                                            {prettyBytes(repo.size * 1000)}
                                        {/if}
                                    </div>
                                </div>
                                <hr class="my-3" />
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <Status text="Webhooks Setup" status={liveRepo?.webhook} {loading} />
                                    <Status text="Directory Exists" status={liveRepo?.directory_exists} {loading} />
                                    <Status text="Docker Status" status={false} {loading} />
                                </div>
                            </Card.Content>
                        </Card.Root>
                    </div>
                </div>
            </Tabs.Content>
            <Tabs.Content value="env">
                <div class="grid grid-cols-1 gap-4 px-4 lg:px-6">
                    <!-- Cards -->
                    <div class="col-span-full">
                        <Card.Root class="bg-transparent"></Card.Root>
                    </div>
                </div>
            </Tabs.Content>
        </Tabs.Root>
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
                <Button variant="outline" href="/github/repositories">Go Back</Button>
            </div>
        </Empty.Content>
    </Empty.Root>
{/if}
