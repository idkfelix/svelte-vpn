<script>
	import { page } from '$app/stores';
</script>

<div class="hero min-h-[50vh]">
    <div>
        <h1 class="text-3xl font-bold text-center">{$page.status}</h1>
        <h2 class="text-xl font-semibold text-center">Error: {$page.error?.message}</h2>
    </div>
</div>