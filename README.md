## Bienvenue sur Internet

![Petrolette](http://pix.toile-libre.org/upload/original/1515112723.png)

[Pétrolette](https://yphil.bitbucket.io/petrolette) est une web-application de lecture de sources récurrentes (Flux RSS, mais pas seulement, comme on va le voir) écrite en NodeJS/[Express](https://expressjs.com/) pour la partie serveur, et en JQuery/[UI](https://jqueryui.com/) pour la partie client.

Ce projet existe depuis une demi douzaine d'années [déjà](https://linuxfr.org/nodes/89475/comments/1321606) ; la première version était en PHP/XML, et proposait pour organiser les flux  (maintenant appelés "sources") et les onglets (maintenant appelés "groupes") un méchant "back office" qui marchait si mal que personne – et surtout pas moi – ne l'utilisait, préférant éditer à la main le fichier XML de configuration.

Aujourd'hui, plus rien n'est sur le serveur, et toutes les préférences sont lues et écrites dans [le cache du navigateur](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage), et restent sur la machine de l'utilisateur. De plus, en fait de back office, tout se fait directement dans l'interface frontale.

Et du coup, une instance "publique" de Pétrolette ne nécessite pas d'identification, ce qui est tout de même assez pratique, et concrètement assez nouveau, après des décennies de paradigme "même URI = même contenu".

## Fonctionnalités

- Découverte du flux RSS d'un site ;
- Construction d'un flux RSS de recherche (http://trouvons.org) à partir de la chaîne de caractères ;
- Lecture / Écriture locale de la liste des flux (et de l'ensemble des options) dans le cache du navigateur ;
- Galerie d'images avec diaporama pour les sources de type "image" ;
- Interface en 4 langues ;
- Aide en ligne ;
- Pas d'interface d'administration, toutes les fonctions d'organisation des groupes et des sources sont disponibles dans l'appli:
  - Déplacement des groupes et des sources (individuellement ou par lots) ;
  - Renommage des groupes et déplacement ;
  - Suppression d'un groupe ou d'une source.

### Mobile

Oui je sais, c'est un Graal que certains pensent hors de portée, mais Pétrolette relève le défi, c'est la même interface pour toutes les plateformes, avec des ajustements spécifiques (pas de drag & drop dans les pages web sous Android, par exemple) pour adapter l'interface au mieux.

![Pétrolette mobile](https://framapic.org/wnLYda2BM9RJ/B1fjYy6JZsLT)

### Feedrat / Solexine

Au départ, le champ de saisie de l'URL de la source n'était que ça, un champ de saisie. Puis un ami m'a dit "m'enfin, j'ai entré "http://lemonde.fr" et *ça a pas marché*". J'ai donc écrit une petite bibliothèque, [Feedrat](https://www.npmjs.com/package/feedrat) (que je vais probablement renommer "[Solexine](https://fr.wiktionary.org/wiki/Solexine)" pour coller au sujet) qui cherche le flux RSS d'un domaine donné, en utilisant diverses stratégies, spécifiquement :

1. Recherche des "suspects usuels" `example.com/rss`, `example.com/feed`, etc ;
2. Lecture du DOM de la page à la recherche d'un `<link rel="alternate" type="application/rss+xml" href="http://example.com/feed" />`
3. Pour certaines pages spécifiques (comme les chaînes YouTube) construction de l'URL de la source en concaténant les divers éléments prédictibles du chemin.

Mais à ce moment-là une copine m'a dit "m'enfin, j'ai entré "bug intel" et *ça a pas marché*" ; J'ai donc ajouté une fonction de construction à la volée d'une source à partir de la requête, à l'aide de http://trouvons.org qui est une instance publique de https://searx.me.

La lib valide ensuite que le feed existe bien à l'URI indiquée, et renvoie cette dernière.

## Et maintenant ?

- J'ai toujours rêvé d'une "bibliothèque RSS", un site qui listerait tous les flux RSS existants, en mode wiki public avec un système de catégories/étiquettes. Je vais donc le faire, juste je continue d'y réfléchir, et d'écraser les bugs de Petrolette ;
- Je vais également ré-écrire Solexine pour pouvoir proposer tous les feeds trouvés dans une page, pas juste le premier ;
- Je souhaite également améliorer le système d'affichage en grille pour pouvoir proposer d'autres modèles, et pourquoi pas le re-dimensionnage (ouch) des sources ;
- Et bien sur, maintenir Pétrolette au jour le jour. En fait, il reste beaucoup à faire, et ce projet s'est avéré m'occuper un peu plus longtemps que prévu.

## Modèle économique

J'ai monté une instance de test sur le dédié d'un ami, que vous pouvez [essayer tout de suite](http://petrolette.space/) ; C'est la beauté d'un système de cache, que tous les utilisateurs puissent s'y connecter sans s’identifier, et voir un contenu différent de celui de son voisin, qui ne peut virtuellement **pas voir la liste de nos sources**.

Bien sur, en échange, le contenu sera différent selon la machine avec laquelle on le consulte (moi-même j'ai encore du mal à m'y faire) donc Pétrolette permet l'import/export de la configuration (un simple fichier json: des sources dans des groupes, avec 3 paramètres par source: `URL`, `type` ("texte seul", "image", ou "mixte") et `limit` (le nombre d'articles de cette source)) pour synchroniser au mieux la chose.

Chez/pour moi ça marche™, mais certains préféreraient peut-être éviter de jongler avec un fichier `petrolette.conf` entre son bureau, sa maison et son phone, et pour ceux-là, pourquoi ne pas vendre de l'hébergement? C'est aussi pour avoir des pistes dans ce sens que je poste ce journal. Dans ce cas, il faudrait que je développe une option pour écrire sur le serveur, ce qui est assez simple. Par ailleurs, je verrai assez bien Pétrolette en interface RSS d'un système d'auto-hébergement léger.

Enfin, pour le moment, [RERO](https://fr.wikipedia.org/wiki/Release_early,_release_often), faites bon usage de Pétrolette, c'est du code ~~de goret~~ chantourné avec amour, et partagé avec plaisir.

- [La page officielle](https://yphil.bitbucket.io/petrolette/)
- [L'instance de test](http://petrolette.space/)
- [Le code](https://bitbucket.org/yphil/petrolette)
- [La page Liberapay](https://liberapay.com/yPhil/donate)
