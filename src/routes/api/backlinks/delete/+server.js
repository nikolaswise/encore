import { json } from '@sveltejs/kit';
import { update } from '$lib/ld/query.js'

export async function GET({ url }) {
  let backlink = url.searchParams.get('backlink')

  await update({
    delete: `<${backlink}> ?p ?o .`,
    insert: ``
  })

  return json({
    backlinks: "delete a backlink"
  })
}