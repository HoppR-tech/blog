# Titre 1

## Sous titre 1


Pour obtenir le contenu d'une page Notion avec Typescript via l'API, suivez ces étapes :

1. Installer les dépendances :
1. Importer et configurer le client Notion :
1. Obtenir le contenu de la page :
Assurez-vous que votre clé API est correctement configurée dans vos variables d'environnement (process.env.NOTION_API_KEY). Vous pouvez obtenir cette clé depuis le portail de l'API Notion.



Le type d'une Page avec @notionhq/client pour TypeScript est PageObjectResponse.



Pour obtenir le titre de la page avec @notionhq/client en TypeScript, vous pouvez accéder à la propriété properties de l'objet de réponse et extraire le titre. Voici un exemple de code pour y parvenir :

```typescript
async function getPageTitle(pageId: string) {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    const title = response.properties.title.title[0].plain_text;
    console.log("Titre de la page:", title);
  } catch (error) {
    console.error("Erreur lors de la récupération du titre de la page:", error);
  }
}

// Remplacez 'votre_page_id' par l'ID de votre page Notion
getPageTitle("votre_page_id");

```

Assurez-vous que votre page Notion a une propriété title dans ses propriétés. Ce code suppose également que le titre de la page est un texte simple (plain_text).



## Sous titre 2



![Image](https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb)

