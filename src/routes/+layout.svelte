<script>
    import "../app.css";
    import Navbar from "../components/Navbar.svelte";
    import Notifications from 'svelte-notifications';
</script>

<Navbar/>
<div class="p-5">
    <Notifications>
        <slot/>
    </Notifications>
</div>