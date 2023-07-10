<script>
    import "../app.css";
    import { page } from "$app/stores";
    import Navbar from "../components/Navbar.svelte";
    import Notifications from 'svelte-notifications';
</script>

<svelte:head>
    <title>Felix VPN - {$page.url.pathname == '/' ? 'home' : $page.url.pathname.split('/').at(-1)}</title>
</svelte:head>

<Navbar/>
<div class="">
    <Notifications>
        <slot/>
    </Notifications>
</div>