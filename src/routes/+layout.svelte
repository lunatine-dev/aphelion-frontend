<script>
    import { ModeWatcher } from "mode-watcher";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import "../app.css";
    let { children } = $props();
</script>

<Toaster richColors position="bottom-center" />

<ModeWatcher />

{@render children?.()}
