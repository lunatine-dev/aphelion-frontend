<script>
    import { page } from "$app/state";

    import * as Empty from "$lib/components/ui/empty/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<Empty.Root class="w-full">
    <Empty.Header>
        <Empty.Title>{page.status}</Empty.Title>
        <Empty.Description>{page?.error?.message ?? "Unknown Error Occurred"}</Empty.Description>
        <Empty.Content>
            <div class="flex gap-2">
                <Button variant="outline" href="/">Go Back</Button>
            </div>
        </Empty.Content>
    </Empty.Header>
</Empty.Root>
