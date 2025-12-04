<script>
    import { onMount } from "svelte";
    import { get } from "$lib/utility/api.js";

    import Page from "$lib/components/page.svelte";

    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    import IconExclamationCircle from "@tabler/icons-svelte/icons/exclamation-circle";

    let { data } = $props();

    let containers = $state([]);
    let loading = $state(true);
    let error = $state(null);

    const getContainers = async () => {
        loading = true;
        try {
            containers = await get("/docker/containers", data.accessToken);
        } catch (e) {
            error = e?.body?.message ?? "Unknown Error Occurred";
        } finally {
            loading = false;
        }
    };

    const restart = () => {};
    const start = () => {};
    const stop = () => {};

    onMount(() => {
        getContainers();
    });
</script>

<Page crumbs={[{ title: "Dashboard", href: "/" }, { title: "Containers" }]}>
    {#if loading || error || containers.length === 0}
        <Empty.Root class="w-full">
            <Empty.Header>
                <Empty.Media variant="icon">
                    {#if !loading}
                        <IconExclamationCircle />
                    {:else}
                        <Spinner />
                    {/if}
                </Empty.Media>
                <Empty.Title
                    >{containers.length === 0 && !loading
                        ? "Could not find any running containers"
                        : (error ?? "Loading Containers")}</Empty.Title
                >
            </Empty.Header>
        </Empty.Root>
    {:else}
        <div
            class=" @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6"
        >
            {#each containers as container}
                <Card.Root>
                    <Card.Header>
                        <div class="flex gap-4">
                            <div class="flex flex-col justify-center">
                                <Card.Title>{container.name}</Card.Title>
                                <Card.Description>{container.id}</Card.Description>
                            </div>
                            <div class="ml-auto">
                                <Badge
                                    variant={container.status === "online" ? "secondary" : "destructive"}
                                    class={container.status === "online"
                                        ? "bg-green-500 text-white dark:bg-green-600"
                                        : ""}
                                    >{container.status}
                                </Badge>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <div class="flex gap-2">
                            {#if container.ports.length}
                                <Badge variant="secondary" class="bg-gray-600">
                                    {container.ports.map((p) => `${p}:${p}`).join("-")}
                                </Badge>
                            {/if}
                            <Badge variant="secondary" class="bg-gray-600">{container.details}</Badge>
                        </div>
                    </Card.Content>
                    <Card.Footer class="border-t">
                        <div class="flex gap-2">
                            {#if container.status === "online"}
                                <Button variant="destructive" class="cursor-pointer">Stop</Button>
                            {:else}
                                <Button variant="secondary" class="bg-green-600 cursor-pointer">Start</Button>
                            {/if}
                            <Button class="cursor-pointer">Restart</Button>
                        </div>
                    </Card.Footer>
                </Card.Root>
            {/each}
        </div>
    {/if}
</Page>
