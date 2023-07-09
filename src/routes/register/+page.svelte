<script lang="ts">
    import { goto } from "$app/navigation";
    import { auth } from "$lib/firebase";
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import { getNotificationsContext } from 'svelte-notifications';

    const { addNotification } = getNotificationsContext();

    const credentials = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    async function register() {
        if(credentials.password !== credentials.confirmPassword) {
            return addNotification({
                text: 'Error: Passwords do not match!',
                position: 'bottom-right',
                type: 'error',
            })
        }

        const credential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .catch(function(error) {
            addNotification({
                text: 'Error: '+error.code,
                position: 'bottom-right',
                type: 'error',
            })
        })

        const idToken = await credential?.user.getIdToken();

        await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
        });

        goto('/dashboard')
    }
</script>

<div class="relative flex flex-col items-center justify-center h-[70vh] overflow-hidden">
    <div class="w-full p-10 bg-base-300 rounded-xl shadow-md border-top lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center text-content">Register</h1>
        <form class="space-y-4">
            <div>
                <p class="label"><span class="text-base label-text">Email</span></p>
                <input name="email" type="text" placeholder="Email Address" class="w-full input input-bordered" bind:value={credentials.email}/>
            </div>
            <div>
                <p class="label"><span class="text-base label-text">Password</span></p>
                <input name="password" type="password" placeholder="Enter Password"class="w-full input input-bordered" bind:value={credentials.password}/>
                <input name="password" type="password" placeholder="Confirm Password"class="w-full input input-bordered mt-2" bind:value={credentials.confirmPassword}/>
            </div>
            <div class="flex flex-col gap-5 pt-4">
                <button class="btn btn-outline normal-case text-lg" on:click|preventDefault={register}>Sign Up</button>
            </div>
        </form>
    </div>
    <a href="/login" class="mt-5">Login</a>
</div>