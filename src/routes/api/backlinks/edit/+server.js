import { json } from '@sveltejs/kit'
import rdfkv from '$lib/ld/rdf-kv.js'
import { update } from '$lib/ld/query.js'

export async function POST({ request }) {
  let formData = await request.formData()
  let id = formData.get('id')
  formData.delete('id')
  let updateData = rdfkv(id, formData)

  await update(updateData)
  return json({
    backlinks: "edit a backlink"
  })
}