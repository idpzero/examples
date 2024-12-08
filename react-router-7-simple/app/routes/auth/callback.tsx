import { callback  } from '~/services/auth.server'
import type { Route } from '../../+types/root';

export async function loader({ request, params }: Route.LoaderArgs) {
   await callback({request})
}

