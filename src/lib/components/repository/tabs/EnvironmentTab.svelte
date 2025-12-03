<script>
    import { envParser } from "$lib/utility/env.js";
    import { isEmpty, filterObject } from "$lib/utility/object.js";
    // shadcn
    import * as Field from "$lib/components/ui/field/index.js";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as InputGroup from "$lib/components/ui/input-group/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Spinner } from "$lib/components/ui/spinner/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { toast } from "svelte-sonner";

    // icons
    import IconCode from "@tabler/icons-svelte/icons/code";
    import IconEyeOff from "@tabler/icons-svelte/icons/eye-off";
    import IconSearch from "@tabler/icons-svelte/icons/search";
    import IconEye from "@tabler/icons-svelte/icons/eye";
    import IconDots from "@tabler/icons-svelte/icons/dots";
    import { get, post } from "$lib/utility/api.js";

    let { env, repo, data } = $props();

    let search = $state("");
    let edit = $state("");
    let visible = $state("");
    let envObj = $derived(env ? envParser.toObject(env) : {});
    let envObjSearched = $derived(filterObject(envObj, (key, value) => key.toLowerCase().includes(search)));
    let envImport = $state("");
    let envImportOpen = $state(false);
    let loading = $state(false);
    let loadingMessage = $state("Please wait...");

    const importEnv = async () => {
        if (!envImport || envImport === "") return;
        loading = true;
        envImportOpen = false;
        let newEnvObj = { ...envObj, ...envParser.toObject(envImport) };

        env = envParser.toString(newEnvObj);

        try {
            let resp = await post(`/repos/live/${repo.id}/env`, { env }, data.accessToken);

            toast.success(resp?.message ?? "Success");
        } catch (err) {
            console.error(err);
            toast.error(err?.body?.message ?? err?.message ?? "Unknown error");
        } finally {
            envImport = "";
            loading = false;
        }
    };
</script>

<div class="grid grid-cols-[200px_1fr_100px] gap-4 px-4 lg:px-6 xl:grid-cols-5 items-stretch relative">
    {#if loading}
        <div class="bg-black/50 h-full w-full absolute z-100 flex items-center justify-center gap-2">
            <Spinner />
            <span>{loadingMessage ?? "Please wait..."}</span>
        </div>
    {/if}
    <!-- Cards -->
    <div class="col-span-full xl:col-span-3 {loading ? 'blur' : ''}">
        <!-- vercel like env management -->
        <div>
            <InputGroup.Root>
                <InputGroup.Input placeholder="Search..." bind:value={search} />
                <InputGroup.Addon>
                    <IconSearch />
                </InputGroup.Addon>
                <InputGroup.Addon align="inline-end"
                    >{Object.keys(envObjSearched)?.length ?? 0} results</InputGroup.Addon
                >
            </InputGroup.Root>
        </div>
        {#if !isEmpty(envObj)}
            <div class="flex flex-col pt-4">
                <div class="border rounded-md">
                    {#each Object.keys(envObjSearched) as key}
                        <div
                            class="border-b last:border-none first:rounded-t-md last:rounded-b-md p-5 {edit === key
                                ? 'bg-background'
                                : 'bg-card'}"
                        >
                            <div
                                class="grid grid-cols-1 lg:grid-cols-[200px_1fr_100px] w-full items-center justify-items-stretch gap-2 {edit ===
                                key
                                    ? 'mb-5'
                                    : ''}"
                            >
                                <!-- Left: key + icon -->
                                <div class="flex items-center gap-2">
                                    <div
                                        class="flex items-center justify-center bg-neutral-900 rounded-full w-7 h-7 border border-input"
                                    >
                                        <IconCode class="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <span class="truncate max-w-[75%] font-mono">{key}</span>
                                </div>

                                <!-- Middle: value -->
                                <div class="flex items-center lg:justify-center text-muted-foreground gap-2">
                                    {#if visible === key}
                                        <IconEyeOff class="cursor-pointer" onclick={() => (visible = "")} />
                                    {:else}
                                        <IconEye class="cursor-pointer" onclick={() => (visible = key)} />
                                    {/if}
                                    <span class="font-mono flex-shrink-0 w-[50%] text-left truncate"
                                        >{visible === key ? envObjSearched[key] : "********"}</span
                                    >
                                </div>

                                <!-- Right: date/avatar/menu -->
                                <div class="flex items-center lg:justify-end gap-2 text-muted-foreground">
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                            <IconDots class="cursor-pointer" />
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content align="end">
                                            <DropdownMenu.Group>
                                                <DropdownMenu.Item
                                                    onclick={() => {
                                                        edit = key;
                                                    }}>Edit</DropdownMenu.Item
                                                >
                                                <DropdownMenu.Item class="text-rose-600">Delete</DropdownMenu.Item>
                                            </DropdownMenu.Group>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                </div>
                            </div>
                            {#if edit === key}
                                <form>
                                    <Field.Group>
                                        <Field.Set class="border-b pb-5">
                                            <Field.Group>
                                                <Field.Field class="gap-1">
                                                    <Field.Label for="env-name" class="text-muted-foreground"
                                                        >Name</Field.Label
                                                    >
                                                    <Input
                                                        id="env-name"
                                                        placeholder="EXAMPLE_NAME"
                                                        required
                                                        value={key}
                                                    />
                                                </Field.Field>
                                                <Field.Field class="gap-1">
                                                    <Field.Label for="env-val" class="text-muted-foreground "
                                                        >Value</Field.Label
                                                    >
                                                    <Input
                                                        id="env-val"
                                                        placeholder="SECRET_HERE"
                                                        required
                                                        value={envObjSearched[key]}
                                                    />
                                                </Field.Field>
                                            </Field.Group>
                                        </Field.Set>
                                        <Field.Field orientation="horizontal" class="justify-end">
                                            <Button variant="outline" type="button" onclick={() => (edit = "")}
                                                >Cancel</Button
                                            >
                                            <Button type="submit">Save</Button>
                                        </Field.Field>
                                    </Field.Group>
                                </form>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <p class="text-muted-foreground pt-5 text-sm">No environment variables found, why not add some?</p>
        {/if}
    </div>
    <div class="col-span-full xl:col-span-2">
        <Dialog.Root bind:open={envImportOpen}>
            <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Import .env</Dialog.Trigger>
            <Dialog.Content class="sm:max-w-[425px]">
                <Dialog.Header>
                    <Dialog.Title>Import .env</Dialog.Title>
                    <Dialog.Description>Paste your .env file here to add them to the repository</Dialog.Description>
                </Dialog.Header>
                <Textarea placeholder="HOST=google.com" bind:value={envImport} />
                <Dialog.Footer>
                    <Button onclick={importEnv}>Import</Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    </div>
</div>
