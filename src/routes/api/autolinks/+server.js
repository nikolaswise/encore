import { json } from '@sveltejs/kit';
import { getTerms } from '$lib/getTerms.js'

export async function GET({ url }) {
  let text = url.searchParams.get('text')
  let context = url.searchParams.get('context')
  let terms = await getTerms(context)

  let matchedTerms = terms.filter(node => text.includes(node.term))

  return json({
    autolinks: matchedTerms,
    context: context,
    text: text
  })
}