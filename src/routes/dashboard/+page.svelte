<script lang="ts">
    import { goto } from "$app/navigation";
  import { user } from "$lib/firebase";
</script>

{#if !$user}
  {goto('/login')}
{/if}

<h1>Dashboard</h1>
<p>{$user?.uid}</p>