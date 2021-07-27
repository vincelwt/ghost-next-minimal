import GhostContentAPI from "@tryghost/content-api"

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL,
  key: process.env.NEXT_PUBLIC_GHOST_KEY,
  version: "v3",
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
      include: "tags",
    })
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,
    })
}


export async function subscribeEmail(email) {

  const values = {
    email,
    emailType: `subscribe`,
    labels: [],
  }

  console.log(values)
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_GHOST_URL}/members/api/send-magic-link/`, {
    method: `POST`,
    mode: `cors`,
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify(values),
  })

  console.log(res)
  return
}