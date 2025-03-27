import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
});

export const updateFile = async (content: string) => {
  const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'TU_USUARIO',
    repo: 'TU_REPO',
    path: 'data/alumnos.json',
    message: 'Actualización desde la aplicación',
    content: btoa(unescape(encodeURIComponent(content))),
    sha: '' // Obtener el último SHA si existe
  });
  return response;
};