<script lang="ts">
  import { page } from "$app/stores";

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/client', label: 'Client' },
    { path: '/dashboard/plan', label: 'Plan' }
  ];
</script>

<div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col m-8 overflow-hidden">
    <label for="my-drawer-2" class="btn drawer-button lg:hidden">Open Sidebar</label>
    <slot/>    
    </div> 
    <div class="drawer-side shadow-lg">
      <label for="my-drawer-2" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-64 h-full bg-base-200 text-base-content text-lg  gap-2">
        {#each navLinks as link}
          <li>
            {#if $page?.route.id === link.path}
              <a href="{link.path}" class="font-bold">{link.label}</a>
            {:else}
              <a href="{link.path}">{link.label}</a>
            {/if}
          </li>
        {/each}
      </ul>
    
    </div>
  </div>