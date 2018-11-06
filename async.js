const fetch = require('node-fetch')

async function fetchFromGitHub(endpoint) {
	const url = `https://api.github.com${endpoint}`;
	const response = await fetch(url);
  const body = await response.json();

  if (response.status !== 200)
    throw Error(body.message)

  return body;
}

async function showUserAndRepos(handle) {
  try {
    const user = await fetchFromGitHub(`/users/${handle}`);
    const repos = await fetchFromGitHub(`/users/${handle}/repos`);
    console.log(user.name);
    console.log(`${repos.length} repos`);
  } catch (err) {
    console.log(`Error: ${err.message}`);

  }
}

showUserAndRepos('rodrigovallades');
