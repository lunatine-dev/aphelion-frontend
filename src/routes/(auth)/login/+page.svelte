<script>
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import IconGalaxy from "@tabler/icons-svelte/icons/galaxy";
    import IconPlanet from "@tabler/icons-svelte/icons/planet";
    import { PUBLIC_API_URL } from "$env/static/public";
</script>

<div
    class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
>
    <div class="w-full max-w-sm">
        <div class="flex flex-col gap-6">
            <form>
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col items-center gap-2">
                        <a
                            href="##"
                            class="flex flex-col items-center gap-2 font-medium"
                        >
                            <div
                                class="flex size-8 items-center justify-center rounded-md"
                            >
                                <IconPlanet class="size-6" />
                            </div>
                            <span class="sr-only">Aphelion</span>
                        </a>
                        <h1 class="text-xl font-bold">Welcome to Aphelion</h1>
                    </div>
                    <div class="flex flex-col gap-6">
                        <div class="grid gap-3">
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="me@example.com"
                                required
                                disabled
                            />
                        </div>
                        <Button type="submit" class="w-full" disabled
                            >Login</Button
                        >
                    </div>
                    <div
                        class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
                    >
                        <span
                            class="bg-background text-muted-foreground relative z-10 px-2"
                        >
                            Or
                        </span>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-1">
                        <Button
                            variant="outline"
                            type="button"
                            class="w-full"
                            href={`${PUBLIC_API_URL}/oauth/github`}
                        >
                            <IconBrandGithub />
                            Continue with GitHub
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
