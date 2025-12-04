<script>
    import { onMount } from "svelte";
    import { get } from "$lib/utility/api.js";

    import Page from "$lib/components/page.svelte";
    import EnvironmentTab from "$lib/components/repository/tabs/EnvironmentTab.svelte";

    import { Button } from "$lib/components/ui/button/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Empty from "$lib/components/ui/empty/index.js";

    import IconExclamationCircle from "@tabler/icons-svelte/icons/exclamation-circle";
    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import OverviewTab from "$lib/components/repository/tabs/OverviewTab.svelte";
    import LogTab from "$lib/components/repository/tabs/LogTab.svelte";

    let { data } = $props();

    let loading = $state(true);
    let found = $state(true);
    let env = $state("");
    let liveRepo = $state({});
    let repo = $state({});
    let logs = $state({});
    let is_docker_app = $state(true);

    let docker_state = $state("loading");

    let message = $state("Internal Server Error");
    let description = $state("We could not find that repository");

    const joinUrl = (base, path) => base.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "");
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
        is_docker_app: async (url) => {
            url = joinUrl(url, "is_docker_app");
            return await get(url, data.accessToken);
        },
        get_docker_app: async () => {
            return await get(`/docker/containers/${data.repo}`, data.accessToken);
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
            const funcs = [fetchRepo.logs, fetchRepo.github, fetchRepo.is_docker_app];

            [logs, repo, { is_docker_app }] = await Promise.all(funcs.map((fn) => fn(url)));
        } catch (e) {
            console.error("Failed to fetch repo data", e);
            found = false;
        } finally {
            loading = false;
        }

        // No point blocking main rendering, loading this in background as docker can take a few seconds
        try {
            const dockerContainer = await fetchRepo.get_docker_app();

            docker_state = dockerContainer?.status ?? "offline";
        } catch (e) {
            console.error(e);
        }
    };

    onMount(() => {
        fetchData();
    });

    let envItems = $state([
        {
            key: "BLA_BLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            value: "woah!",
            visible: false,
            edit: false,
        },
        {
            key: "BLA_BLA2",
            value: "https://api.lunatine.dev/aphelion/v1",
            visible: false,
            edit: false,
        },
    ]);
</script>

{#if found}
    <Page
        title={data.repo}
        crumbs={[
            { title: "Dashboard", href: "/" },
            { title: "Repositories", href: "/github/repositories" },
            { title: loading ? "Edit repository" : repo?.name, icon: IconBrandGithub },
        ]}
    >
        <Tabs.Root value="details">
            <Tabs.List
                class="grid w-full grid-cols-1 lg:grid-cols-3 lg:mb-5 bg-transparent px-4 lg:px-6 *:transition-colors *:hover:bg-input/30 *:hover:ring *:hover:ring-ring/25 *:first:rounded-l-md *:last:rounded-r-md *:rounded-none"
            >
                <!-- TODO: Responsiveness for tab triggers -->
                <Tabs.Trigger value="details" disabled={loading}>Details</Tabs.Trigger>
                <Tabs.Trigger value="env" disabled={loading}>Environment variables</Tabs.Trigger>
                <Tabs.Trigger value="logs" disabled={loading}>Jobs</Tabs.Trigger>
            </Tabs.List>
            <hr class="mb-5" />
            <Tabs.Content value="details">
                <OverviewTab {repo} {liveRepo} {loading} {is_docker_app} {docker_state} />
            </Tabs.Content>
            <Tabs.Content value="env">
                <EnvironmentTab {repo} {envItems} {env} {data} />
            </Tabs.Content>
            <Tabs.Content value="logs">
                <LogTab {logs} />
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
