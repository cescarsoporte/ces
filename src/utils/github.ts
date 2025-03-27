import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

export const updateFile = async (content: string) => {
  try {
    // Obtiene el SHA del archivo actual
    const { data: fileData } = await octokit.request('GET /repos/cescarsoporte/ces/contents/{path}', {
      owner: 'cescarsoporte',
      repo: 'ces',
      path: 'data/registros.json',
    });

    if (Array.isArray(fileData)) {
      throw new Error('Expected a single file, but received an array.');
    }
    const sha = fileData.sha;

    // Actualiza el archivo con el nuevo contenido
    const response = await octokit.request('PUT /repos/cescarsoporte/ces/contents/{path}', {
      owner: 'cescarsoporte',
      repo: 'ces',
      path: 'data/registros.json',
      message: 'Actualización desde la aplicación',
      content: btoa(unescape(encodeURIComponent(content))),
      sha,
    });

    return response;
  } catch (error) {
    console.error('Error al actualizar el archivo:', error);
    throw error;
  }
};