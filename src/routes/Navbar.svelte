<script lang="ts">
    import { auth, user } from "$lib/firebase";
    import { signOut } from "firebase/auth";

    async function signOutSSR() {
        await fetch("/api/login", { method: "DELETE" });
        signOut(auth)
    }
</script>

<div class="navbar bg-base-300 flex shadow-lg">
    <div class="navbar-start">
        <a href="/" class="btn btn-ghost normal-case text-lg">Home</a>
        <a href="/pricing" class="btn btn-ghost normal-case text-lg">Pricing</a>
        <div class="w-full"/>
    </div>
    <div class="navbar-center">
        <a class="navbar-center normal-case text-2xl font-bold text-white" href="/">Title</a>
    </div>
    <div class="navbar-end">
        <div class="w-full"/>
        <a href="/dashboard" class="btn btn-ghost normal-case text-lg">Dashboard</a>
        {#if $user}
            <button class="btn btn-ghost normal-case text-lg" on:click={signOutSSR}>Sign Out</button>
        {:else}
            <button class="btn btn-ghost normal-case text-lg"><a href="/login">Sign In</a></button>
        {/if}
    </div>
</div>