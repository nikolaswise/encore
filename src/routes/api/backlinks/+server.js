import { error, json } from '@sveltejs/kit'
import { queryJSON } from '$lib/ld/query'

export async function GET({ url }) {
  let context = url.searchParams.get('context')

  let response = await queryJSON(`
    CONSTRUCT {
      ?sub ?pred ?obj .
      ?i ?pred ?oi .
    }
    WHERE {
      ?sub rdf:type <vox:Backlink> .
      ?sub vox:context <${context}> .
      ?sub ?pred ?obj .

      OPTIONAL {
        <${context}> vox:parent+ ?parent .
        ?i vox:context ?parent .
        ?i ?pred ?oi .
      }
    }`
  ).catch(e => {
    return error(500, e)
  })

  return json({
    backlinks: response
  })
}