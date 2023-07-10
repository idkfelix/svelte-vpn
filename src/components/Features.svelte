<script lang="ts">
    const features = [
    {
    "title": "Works Seamlessly at School",
    "content": "Our VPN service is specifically optimized to work flawlessly within school networks, bypassing restrictions and providing unrestricted internet access for students, educators, and staff."
    },
    {
    "title": "Stealth Mode Technology",
    "content": "Our advanced stealth mode technology ensures that your VPN connection remains undetectable to network administrators, allowing you to navigate school networks without any interruptions or restrictions."
    },
    {
    "title": "Lightning-fast connections",
    "content": "Experience lightning-fast speeds and minimal latency with our high-performance servers strategically located across the globe. Enjoy smooth streaming, fast downloads, and seamless browsing."
    },
    {
    "title": "Robust security",
    "content": "Rest easy knowing that your online activities are shielded from prying eyes. Our VPN service employs advanced encryption and security protocols to safeguard your data and protect your privacy, even on public Wi-Fi networks."
    },
    {
    "title": "Easy to use",
    "content": "Our user-friendly interface makes it a breeze for anyone, regardless of technical expertise, to set up and connect to our VPN servers. Get started with just a few clicks and enjoy hassle-free protection."
    },
    {
    "title": "Cross-platform compatibility",
    "content": "Whether you're using a Windows PC, Mac, iOS, Android, or even Linux, our VPN service seamlessly integrates with your devices, ensuring a consistent and reliable experience across all platforms."
    }
    ];
</script>

<section class="container mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each features as feature}
        <div class="card shadow-lg">
            <div class="card-body">
            <h2 class="card-title">{feature.title}</h2>
            <p>{feature.content}</p>
            </div>
        </div>
    {/each}
</section>