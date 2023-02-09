<h1>Encore</h1>

<h2>Get Autolinks for a Blob of Text Given a Context</h2>

<pre><code>
https://encore-three.vercel.app/api/autolinks?context=chorusGroup:456&text=%22i%20love%20baseball%20also%20sports%22

{@html `{
  "autolinks": [
    {
      "term": "baseball",
      "url": "https://sbn.com/baseball"
    },
    {
      "term": "sports",
      "url": "https://sbn.com/sports"
    }
  ],
  "context": "chorusGroup:456",
  "text": "\"i love baseball also sports\""
}`}
</code></pre>

<h2>Get Backlinks for a Community</h2>

<pre><code>
https://encore-three.vercel.app/api/backlinks?context=chorusGroup:456

{@html `{
  "backlinks": [
    {
      "id": "uri:uuid:456",
      "type": "vox:Backlink",
      "https://vocab.voxmedia.com/#context": {
        "id": "chorusGroup:456"
      },
      "target": {
        "id": "https://sbn.com/baseball"
      },
      "terms": [
        "ballbase",
        "baseball"
      ]
    },
    {
      "id": "uri:uuid:sports",
      "type": "vox:Backlink",
      "https://vocab.voxmedia.com/#context": {
        "id": "chorusNetwork:abc"
      },
      "target": {
        "id": "https://sbn.com/sports"
      },
      "terms": "sports"
    }
  ]
}`}
</code></pre>