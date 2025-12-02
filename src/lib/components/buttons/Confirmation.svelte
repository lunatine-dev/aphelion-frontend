<script>
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";

    let {
        title,
        message,
        cancelText = "Cancel",
        confirmText = "Confirm",
        confirmClasses = "",
        cancelClasses = "",
        buttonVariant = "outline",
        buttonText,
        buttonClasses,
        onConfirm = () => {},
        onCancel = () => {},
    } = $props();
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger
        class={`cursor-pointer hover:brightness-75 ${buttonClasses} ${buttonVariants({ variant: buttonVariant })}`}
        >{buttonText}</AlertDialog.Trigger
    >
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>
                {message}
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            {#if cancelText}
                <AlertDialog.Cancel onclick={onCancel} class={`cursor-pointer ${cancelClasses}`}
                    >{cancelText}</AlertDialog.Cancel
                >
            {/if}
            {#if confirmText}
                <AlertDialog.Action onclick={onConfirm} class={`cursor-pointer ${confirmClasses}`}
                    >{confirmText}</AlertDialog.Action
                >
            {/if}
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
