<script>
    import { languageColors } from "$lib/languageColors";

    import Code from "@tabler/icons-svelte/icons/code";

    //Languages
    import JavaScript from "@devicon/svelte/javascript/plain/JavascriptPlainIcon.svelte";
    import TypeScript from "@devicon/svelte/typescript/plain/TypescriptPlainIcon.svelte";
    import Svelte from "@devicon/svelte/svelte/plain/SveltePlainIcon.svelte";
    import Bash from "@devicon/svelte/bash/plain/BashPlainIcon.svelte";

    let icons = {
        JavaScript,
        TypeScript,
        Shell: Bash,
        Svelte,
    };

    let { language } = $props();

    let Icon = $derived(icons[language] || Code);
    let color = $derived(languageColors[language]?.color || "#fff");
</script>

<Icon {color} size={"1.5em"} />
