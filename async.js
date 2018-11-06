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
    const userPromise = fetchFromGitHub(`/users/${handle}`);
    const reposPromise = fetchFromGitHub(`/users/${handle}/repos`);

    const user = await userPromise;
    const repos = await reposPromise;

    console.log(user.name);
    console.log(`${repos.length} repos`);
  } catch (err) {
    console.log(`Error: ${err.message}`);

  }
}

showUserAndRepos('rodrigovallades');
