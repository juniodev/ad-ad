const axios = require('axios');

(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const postData = response.data;

    // Modificar o título da página
    document.title = postData.title;

    // Modificar a meta description
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', postData.body);
    } else {
      // Se não existir uma meta tag de description, você pode criar uma
      const newMetaTag = document.createElement('meta');
      newMetaTag.setAttribute('name', 'description');
      newMetaTag.setAttribute('content', postData.body);
      document.head.appendChild(newMetaTag);
    }

    console.log('Dados da postagem:', postData);
  } catch (error) {
    console.error('Erro ao fazer requisição:', error.message);
  }
})();