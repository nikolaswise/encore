import { json, error } from '@sveltejs/kit'
import rdfkv from '$lib/ld/rdf-kv.js'
import { update, ask } from '$lib/ld/query.js'

const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
}

const termExistsForContext = context => async (term) => {
  let bool = await ask(`
    ask {
      ?backlink vox:context <${context}> .
      ?backlink vox:terms '${term}' .
    }
  `)
  return bool
}

export async function POST({ request }) {
  let formData = await request.formData()
  let id = formData.get('id')
  formData.delete('id')
  formData.append('rdf:type :', 'vox:Backlink')
  let updateData = rdfkv(id, formData)

  let terms = formData.getAll('vox:terms')
  let context = formData.get('vox:context :')

  const collisions = await asyncFilter(terms, termExistsForContext(context))

  if (collisions.length > 0) {
    throw error(409, {
      message: `terms exist for context ${context}`,
      collisions
    });
  }
  await update(updateData)
  return json({
    backlinks: "create a backlink"
  })
}