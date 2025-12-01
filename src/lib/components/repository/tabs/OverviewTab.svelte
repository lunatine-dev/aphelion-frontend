<script>
    import prettyBytes from "pretty-bytes";

    import Status from "$lib/components/repository/Status.svelte";
    import LanguageIcon from "$lib/components/LanguageIcon.svelte";

    import { Skeleton } from "$lib/components/ui/skeleton/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import Action from "$lib/components/repository/Action.svelte";

    let { loading, repo, liveRepo } = $props();
</script>

<div class="grid grid-cols-1 gap-4 px-4 lg:px-6 xl:grid-cols-5 items-stretch">
    <div class="col-span-full xl:col-span-2">
        <Card.Root class="bg-transparent h-full">
            <Card.Content>
                <div class="flex flex-col items-center gap-4 p-6">
                    {#if !loading}
                        <Avatar.Root class="w-20 h-20 border-2">
                            <Avatar.Image src={repo?.owner?.avatar_url} alt={repo?.owner?.login} />
                            <Avatar.AvatarFallback>{repo?.owner?.login.charAt(0).toUpperCase()}</Avatar.AvatarFallback>
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
                        class={loading ? "" : "bg-accent text-accent-foreground hover:bg-accent hover:brightness-75"}
                        target="_blank"
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
        <Card.Root class="bg-transparent h-full">
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
                <div class="flex flex-col text-sm space-y-1 text-muted-foreground mt-3 *:items-center *:flex *:gap-1">
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
                            <Skeleton class="inline-block h-[1em] w-[100px] bg-gray-600/50" />{:else}{new Date(
                                repo.created_at,
                            ).toLocaleDateString()}
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
    <Action
        type="destructive"
        title="Remove Repository"
        description="This will stop managing this repository. All automated tasks, webhooks, and integrations will be removed."
        buttons={[
            {
                variant: "destructive",
                text: "Remove",
                onClick: () => {},
            },
        ]}
    />
    {#if liveRepo?.webhook}
        <Action
            span="3"
            type="warning"
            title="Remove Webhook"
            description="Remove the webhook from this repository, this will stop GitHub from being able to communicate on new pushes to main"
            buttons={[
                {
                    variant: "destructive",
                    text: "Remove Webhook",
                    onClick: () => {},
                },
            ]}
        />
    {:else}
        <Action
            span="3"
            type="secondary"
            title="Setup Webhook"
            description="Setup the webhook for this repository so it can automatically pull and restart the Docker instance"
            buttons={[
                {
                    variant: "secondary",
                    text: "Setup",
                    onClick: () => {},
                },
            ]}
        />
    {/if}
</div>
