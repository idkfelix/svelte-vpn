import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad} from './$types';

export const load = (async (event) => {
    const uid = event.locals.userID
    const fromURL = event.url.pathname + event.url.search
    
    if (!uid) {
        throw redirect(301, `/login?redirectTo=${fromURL}`)
    }
}) satisfies LayoutServerLoad;