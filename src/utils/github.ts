import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
});

export const updateFile = async (content: string) => {
  const response = await octokit.request('PUT /repos/cescarsoporte/ces/contents/{path}', {
    owner: 'cescarsoporte',
    repo: 'ces',
    path: 'data/registros.json',
    message: 'Actualización desde la aplicación',
    content: btoa(unescape(encodeURIComponent(content))),
    sha: '' // Obtener el último SHA si existe
  });
  return response;
};