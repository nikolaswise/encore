import { queryJSON } from '$lib/ld/query'
import arrayify from '$lib/arrayify.js'

export const getTerms = async (context) => {
  let response = await queryJSON(`
    CONSTRUCT {
      ?target vox:terms ?term .
      ?itarget vox:terms ?iterm .
    }
    WHERE {
      ?sub rdf:type <vox:Backlink> .
      ?sub vox:context <${context}> .
      ?sub vox:terms ?term .
      ?sub vox:target ?target .

      OPTIONAL {
        <${context}> vox:parent+ ?parent .
        ?inherited vox:context ?parent .
        ?inherited vox:terms ?iterm .
        ?inherited vox:target ?itarget .
      }
    }`
  )

  let arr = arrayify(response)
  let shaped = []
  arr.forEach(node => {
    let terms = arrayify(node.terms)
    terms.forEach(term => {
      shaped.push({term: term, url: node.id})
    })
  })
  return shaped
}