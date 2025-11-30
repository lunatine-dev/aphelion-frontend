<script>
    // shadcn
    import * as Field from "$lib/components/ui/field/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as InputGroup from "$lib/components/ui/input-group/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    // icons
    import IconCode from "@tabler/icons-svelte/icons/code";
    import IconEyeOff from "@tabler/icons-svelte/icons/eye-off";
    import IconSearch from "@tabler/icons-svelte/icons/search";
    import IconEye from "@tabler/icons-svelte/icons/eye";
    import IconDots from "@tabler/icons-svelte/icons/dots";

    let { repo, envItems } = $props();
</script>

<div class="grid grid-cols-[200px_1fr_100px] gap-4 px-4 lg:px-6 xl:grid-cols-5 items-stretch">
    <!-- Cards -->
    <div class="col-span-full xl:col-span-3">
        <!-- vercel like env management -->
        <div>
            <InputGroup.Root>
                <InputGroup.Input placeholder="Search..." />
                <InputGroup.Addon>
                    <IconSearch />
                </InputGroup.Addon>
                <InputGroup.Addon align="inline-end">2 results</InputGroup.Addon>
            </InputGroup.Root>
        </div>
        {#if envItems.length}
            <div class="flex flex-col pt-4">
                <div class="border rounded-md">
                    {#each envItems as env}
                        <div
                            class="border-b last:border-none first:rounded-t-md last:rounded-b-md p-5 {env?.edit
                                ? 'bg-background'
                                : 'bg-card'}"
                        >
                            <div
                                class="grid grid-cols-1 lg:grid-cols-[200px_1fr_100px] w-full items-center justify-items-stretch gap-2 {env?.edit
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
                                    <span class="truncate max-w-[75%] font-mono">{env.key}</span>
                                </div>

                                <!-- Middle: value -->
                                <div class="flex items-center lg:justify-center text-muted-foreground gap-2">
                                    {#if env.visible}
                                        <IconEyeOff class="cursor-pointer" onclick={() => (env.visible = false)} />
                                    {:else}
                                        <IconEye class="cursor-pointer" onclick={() => (env.visible = true)} />
                                    {/if}
                                    <span class="font-mono flex-shrink-0 w-[50%] text-left truncate"
                                        >{env.visible ? env.value : "********"}</span
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
                                                        envItems.forEach((e) => (e.edit = false));
                                                        env.edit = true;
                                                    }}>Edit</DropdownMenu.Item
                                                >
                                                <DropdownMenu.Item class="text-rose-600">Delete</DropdownMenu.Item>
                                            </DropdownMenu.Group>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                </div>
                            </div>
                            {#if env?.edit}
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
                                                        value={env?.key}
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
                                                        value={env?.value}
                                                    />
                                                </Field.Field>
                                            </Field.Group>
                                        </Field.Set>
                                        <Field.Field orientation="horizontal" class="justify-end">
                                            <Button variant="outline" type="button" onclick={() => (env.edit = false)}
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
        <Button>Import .env</Button>
    </div>
</div>
