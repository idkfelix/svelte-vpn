<script lang="ts">
    import { user } from "$lib/firebase";
</script>

<h1>Dashboard</h1>
<p>{JSON.stringify($user,null,4)}</p>