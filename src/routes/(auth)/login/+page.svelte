<script lang="ts">
    import { goto } from "$app/navigation";
    import { auth } from "$lib/firebase";
    import { page } from '$app/stores'
    import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
    import { getNotificationsContext } from 'svelte-notifications';

    const redirectTo = $page.url.searchParams.get('redirectTo')

    const { addNotification } = getNotificationsContext();

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const credential = await signInWithPopup(auth, provider);

        const idToken = await credential.user.getIdToken();

        await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
        });

        if (redirectTo) {
            goto(`/${redirectTo.slice(1)}`)
        } else {
            goto('/')
        }
    }

    async function signIn() {
        const credential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
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

        if (redirectTo) {
            goto(`/${redirectTo.slice(1)}`)
        } else {
            goto('/')
        }
    }

    const credentials = {
        email: '',
        password: ''
    }
</script>

<div class="relative flex flex-col items-center justify-center h-[70vh] overflow-hidden">
    <div class="w-full p-10 bg-base-300 rounded-xl shadow-md border-top lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center text-content">Login</h1>
        <form class="space-y-4">
            <div>
                <p class="label"><span class="text-base label-text">Email</span></p>
                <input name="email" type="text" placeholder="Email Address" class="w-full input input-bordered" bind:value={credentials.email}/>
            </div>
            <div>
                <p class="label"><span class="text-base label-text">Password</span></p>
                <input name="password" type="password" placeholder="Enter Password"class="w-full input input-bordered" bind:value={credentials.password}/>
            </div>
            <div class="flex flex-col gap-5 pt-4">
                <button class="btn btn-outline normal-case text-lg" on:click={signInWithGoogle}>Sign In With Google</button>
                <button class="btn btn-outline normal-case text-lg" on:click|preventDefault={signIn}>Sign In</button>
            </div>
        </form>
    </div>
    <a href="/register" class="mt-5">Register</a>
</div>