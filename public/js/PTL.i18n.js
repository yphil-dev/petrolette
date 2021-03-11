/*!
 * @base: https://github.com/videojs/video.js
 *
 * @Source: cliplibrejs.dev.js
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyleft 2017 Jesus Eduardo
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

PTL.i18n = {
  trans : function(term) {
    var terms = {};
    terms[ PTL.language ] = PTL.tr(term);

    return terms;
  }
};

PTL.i18n.translations = {

  "Pétrolette starting up OK" : { fr: "Pétrolette démarrage OK", ja: "Pétroletteが起動する", es: "Pétrolette iniciando OK" },
  "Pétrolette init finished OK" : { fr: "Pétrolette démarrage terminé OK", ja: "ペトロレットの初期化は正常に終了しました", es: "La inicialización de Pétrolette terminó bien" },

  "OK": { fr: "OK", ja: "入る", es: "OK" },
  "Cancel": { fr: "Annuler", ja: "取り消す", es: "Cancelar" },
  "Delete": { fr: "Supprimer", ja: "削除", es: "Eliminar" },
  "Name": { fr: "Nom", ja: "姓", es: "Nombre" },
  "Position": { fr: "Position", ja: "ポジション", es: "Posición" },
  "Menu": { fr: "Menu", ja: "メニュー", es: "Menú" },
  "Sorry": { fr: "Désolé", ja: "ごめんなさい", es: "Perdón" },
  "Warning": { fr: "Avertissement", ja: "警告", es: "Advertencia" },

  // Pétrolette

  "Whoops, no feeds!" : { fr: "Oups, pas de flux!", ja: "うわー、ソースはありません！", es: "¡Ups, sin fuentes!" },
  "Click here to add some." : { fr: "Cliquez ici pour en ajouter.", ja: "いくつか追加するにはここをクリックしてください。", es: "Haga clic aquí para agregar algunos." },
  "Group" : { fr: "Groupe", ja: "グループ", es: "Grupo" },

  "Find the feed for this URL, or build a new one from the search query" : { fr: "Trouver le flux du site web, ou construire un flux à partir des termes de recherche" , ja: "ウェブサイトのRSSフィードを見つける", es: "Encuentra la fuente RSS del sitio web" },
  "Move this feed to another group." : { fr: "Déplacer ce flux dans un autre groupe." , ja: "このソースを別のグループに移動する", es: "Mueva esta fuente a otro grupo." },
  "The type of feed: It can be all text, all image, or mixed." : { fr: "Quel type de flux ? Tout le texte, toute l'image, ou les deux.", ja: "どんな種類の飼料ですか？ すべてのテキスト、すべてのイメージ、または混合。", es: "¿Qué tipo de flux? Todo el texto, toda la imagen o mixto." },
  "How many new items should this feed display at a time?" : { fr: "Combien de nouveaux articles dans ce flux ?", ja: "フィードは一度にいくつ表示する必要がありますか？", es: "¿Cuántos elementos nuevos debería mostrar el feed a la vez?" },

  "feed" : { fr: "flux" , ja: "ソース", es: "fuente" },

  "Feed" : { fr: "Flux" , ja: "ソース", es: "Fuente" },
  "Feeds" : { fr: "Flux" , ja: "ソース", es: "Fuentes" },

  "Tab" : { fr: "Onglet" , ja: "フォルダ", es: "Carpeta" },
  "Tab " : { fr: "Onglet " , ja: "フォルダ ", es: "Carpeta " },
  "Tabs" : { fr: "Onglets" , ja: "フォルダー", es: "Carpetas" },


  "Theme" : { fr: "Thème" , ja: "テーマ", es: "Tema" },
  "Language" : { fr: "Langue" , ja: "言語", es: "Idioma" },
  "Image gallery" : { fr: "Galerie d'images" , ja: "イメージギャラリー", es: "Galería de imágenes" },
  "Slideshow speed" : { fr: "Vitesse du diaporama" , ja: "スライドショーのスピード", es: "Velocidad de la presentación" },
  "Slide transition" : { fr: "Transition image" , ja: "画像の遷移", es: "Transición de imagen" },

  "Broken images" : { fr: "Images cassées" , ja: "壊れた画像", es: "Imágenes rotas" },
  "Show" : { fr: "Montrer" , ja: "公演", es: "Mostrar" },
  "Hide" : { fr: "Cacher" , ja: "隠す", es: "Esconder" },


  "Help" : { fr: "Aide" , ja: "助けて", es: "Ayuda" },
  "Documentation" : { fr: "Documentation" , ja: "ドキュメンテーション", es: "Documentación" },
  "JS Licences" : { fr: "Licences JS" , ja: "JSライセンス", es: "Licencias JS" },

  "Console" : { fr: "Console" , ja: "コンソール", es: "Consola" },

  "JavaScript licencing information" : { fr: "Informations de licence JavaScript" , ja: "JavaScriptのライセンス情報", es: "Información de licencia de JavaScript" },

  "Send your love to Pétrolette" : { fr: "Aider Pétrolette" , ja: "Pétroletteにあなたの愛を送る", es: "Envíale tu amor a Pétrolette" },


  "Support" : { fr: "Soutien" , ja: "サポート", es: "Apoyo" },

  "Support Pétrolette" : { fr: "Soutenir Pétrolette" , ja: "ペトロレットのサポート", es: "Soporte Pétrolette" },

  "Pétrolette needs you" : { fr: "Pétrolette a besoin de vous" , ja: "ペトロレットはあなたを必要としています", es: "Pétrolette te necesita" },

  "Help me pay the bills" : { fr: "Aide-moi à payer les factures" , ja: "手形を支払うのを手伝ってください", es: "Ayúdame a pagar las facturas" },

  "Pétrolette is free software. However the development requires" : { fr: "Pétrolette est un logiciel libre. Cependant, le développement demande" , ja: "Pétroletteはフリーソフトウェアです。 ただし、開発には多くの時間と作業が必要です。", es: "Pétrolette es un software gratuito. Sin embargo, el desarrollo requiere" },
  "a lot of time" : { fr: "beaucoup de temps" , ja: "多くの時間", es: "mucho tiempo" },
  "and" : { fr: "et" , ja: "そして", es: "y" },
  "a lot of work" : { fr: "beaucoup de travail" , ja: "多くの作業", es: "mucho trabajo" },

  "In order to keep developing Pétrolette with new features I need your help." : { fr: "Afin de continuer à développer Pétrolette avec de nouvelles fonctionnalités, j'ai besoin de votre aide." , ja: "新しい機能を備えたペトロレットを開発し続けるために、私はあなたの助けが必要です。", es: "Para seguir desarrollando Pétrolette con nuevas funciones, necesito su ayuda." },
  "Please consider to support the Pétrolette project by sending a donation. Even the smallest amount will help a lot." : { fr: "Pensez à soutenir le projet Pétrolette en envoyant un don. Même un tout petit montant aidera beaucoup." , ja: "寄付を送って、ペトロレットプロジェクトを支援することを検討してください。 少量でも大いに役立ちます。", es: "Considere apoyar el proyecto Pétrolette enviando una donación. Incluso la cantidad más pequeña ayudará mucho." },

  "Pétrolette is cool" : { fr: "Pétrolette est cool" , ja: "「ペトロレット」はかっこいい", es: "Pétrolette es genial" },
  "Free as the wind" : { fr: "Libre comme l'air" , ja: "風のように自由", es: "Libre como el viento" },
  "Pétrolette is designed from the outset to respect the user: It does not embed any tracker or statistical tool, and does not call on any online resource." : { fr: "Pétrolette est conçu dés le départ pour réspecter l'utilisateur : Il n'embarque aucun pisteur ni outil de statistique, et ne fait appel à aucun ressource en ligne." , ja: "Pétroletteは最初からユーザーを尊重するように設計されています。トラッカーや統計ツールを組み込んでおらず、オンラインリソースを必要としません。", es: "Pétrolette está diseñada desde el principio para respetar al usuario: no incorpora ningún rastreador o herramienta estadística, y no recurre a ningún recurso en línea." },
  "Pétrolette is completely transparent, its source code is directly available." : { fr: "Pétrolette est totalement transparent, son code source est directement disponible." , ja: "Pétroletteは完全に透過的であり、そのソースコードは直接入手できます。", es: "Pétrolette es completamente transparente, su código fuente está disponible directamente." },
  "This site is just a test instance ; You can install Pétrolette on your own server and manage it on your own." : { fr: "Ce site n'est qu'une instance de test ; vous pouvez installer Pétrolette sur votre propre serveur et le gérer vous-même." , ja: "このサイトは単なるテストインスタンスです。 Pétroletteを自分のサーバーにインストールして、自分で管理することができます。", es: "Este sitio es solo una instancia de prueba; puede instalar Pétrolette en su propio servidor y administrarlo por su cuenta." },


  "Pétrolette is growing" : { fr: "Pétrolette grandit" , ja: "ペトロレットは成長しています", es: "Pétrolette está creciendo" },

  "A lot of exciting things are in the pipeline:" : { fr: "Beaucoup de choses passionnantes sont en préparation:" , ja: "多くのエキサイティングなことがパイプラインにあります。", es: "Hay muchas cosas interesantes en proceso:" },

  "Dedicated feeds" : { fr: "Flux dédiés" , ja: "専用フィード", es: "Fuentes dedicados" },

  "Even better mobile device experience" : { fr: "Expérience mobile encore meilleure" , ja: "さらに優れたモバイルデバイスエクスペリエンス", es: "Experiencia de dispositivo móvil aún mejor" },

  "Asynchronous / infinite loading of feed items" : { fr: "Chargement asynchrone / infini des éléments de flux" , ja: "フィードアイテムの非同期/無限ロード", es: "Carga asincrónica / infinita de elementos del fuente" },


  "Any improvement or proposal you have for Pétrolette" : { fr: "Toute amélioration ou proposition que vous avez pour Pétrolette" , ja: "Pétroletteの改善点や提案", es: "Cualquier mejora o propuesta que tengas para Pétrolette" },

  "Early and often" : { fr: "Tôt et souvent" , ja: "早くそして頻繁に", es: "Temprano y a menudo" },

  "Full weather report" : { fr: "Bulletin météo complet" , ja: "完全な天気予報", es: "Informe meteorológico completo" },

  "Search prefix" : { fr: "Préfixe de recherche" , ja: "検索プレフィックス", es: "Prefijo de búsqueda" },

  "Restore default" : { fr: "Rétablir défaut" , ja: "デフォルトを復元", es: "Restaurar predet." },

  "Restore default search prefix" : { fr: "Rétablir le préfixe de recherche par défaut" , ja: "デフォルトの検索プレフィックスを復元", es: "Restaurar el prefijo de búsqueda predeterminado" },

  "Restored search prefix to default value" : { fr: "Préfixe de recherche restauré à la valeur par défaut" , ja: "復元された検索プレフィックスをデフォルト値に復元しました", es: "Prefijo de búsqueda restaurado al valor predeterminado" },


  "Search in feeds" : { fr: "Rechercher dans les flux" , ja: "フィードで検索します", es: "Búsqueda en fuentes" },



  "English" : { fr: "English" , ja: "English", es: "English" },
  "Français" : { fr: "Français" , ja: "Français", es: "Français" },
  "日本語" : { fr: "日本語" , ja: "日本語", es: "日本語" },
  "Español" : { fr: "Español" , ja: "Español", es: "Español" },

  "None" : { fr: "Aucun" , ja: "なし", es: "Ninguna" },
  "Fade" : { fr: "Fondu" , ja: "フェード", es: "Descolorarse" },
  "Slide" : { fr: "Glissé" , ja: "滑り台", es: "Planeo" },
  "Circular" : { fr: "Circulaire" , ja: "円形", es: "Circular" },
  "Tube" : { fr: "Tube" , ja: "チューブ", es: "Tubo" },
  "Zoom" : { fr: "Zoom" , ja: "ズーム", es: "Enfocar" },
  "Rotate" : { fr: "Rotation" , ja: "回転する", es: "Girar" },

  "Profile" : { fr: "Profil" , ja: "プロフィール", es: "Perfil" },
  "Donate" : { fr: "Donation" , ja: "寄付する", es: "Donar" },
  "Open" : { fr: "Ouvrir" , ja: "負荷", es: "Carga" },
  "Save" : { fr: "Sauver" , ja: "セーブ", es: "Salvar" },

  "Rename tab" : { fr: "Renommer l'onglet" , ja: "名前の変更タブ", es: "Cambiar el nombre de la pestaña" },
  "Add" : { fr: "Ajouter" , ja: "追加", es: "Añadir" },
  "Add feed" : { fr: "Ajouter flux" , ja: "ソースを追加", es: "Agregue fuente" },
  "Add feeds" : { fr: "Ajouter flux" , ja: "ソースを追加", es: "Agregue fuentes" },

  "Column" : { fr: "Colonne" , ja: "列", es: "Columna" },
  "Add a column" : { fr: "Ajouter une colonne" , ja: "列を追加する", es: "Agrega una columna" },
  "Remove this column" : { fr: "Supprimer cette colonne" , ja: "この列を削除", es: "Eliminar esta columna" },
  "Add a feed to this column" : { fr: "Ajouter un flux à cette colonne" , ja: "この列にソースを追加する", es: "Agregar una fuente a esta columna" },
  "Keyboard shortcuts" : { fr: "Raccourcis clavier" , ja: "キーボードショートカット", es: "Atajos de teclado" },
  "When focus is on a tab" : { fr: "Lorsque le focus est sur un onglet" , ja: "フォーカスがタブにあるとき", es: "Cuando el foco está en una pestaña" },
  "When focus is in a panel" : { fr: "Lorsque le focus est dans un panel" , ja: "フォーカスがパネルにあるとき", es: "Cuando el foco está en un panel" },

  "Move focus to the previous tab. If on first tab, moves focus to last tab. Activate focused tab after a short delay." : { fr: "Déplace le focus sur l'onglet précédent. Si sur le premier onglet, déplace le focus sur le dernier onglet. Activer l'onglet ciblé après un court délai." , ja: "フォーカスを前のタブに移動します。 最初のタブの場合、最後のタブにフォーカスを移動します。 短時間の間にフォーカスを合わせたタブを有効にします。", es: "Mueve el foco a la pestaña anterior. Si está en la primera pestaña, mueve el foco a la última pestaña. Active la pestaña enfocada después de un breve retraso." },

  "Move focus to the next tab. If on last tab, moves focus to first tab. Activate focused tab after a short delay." : { fr: "Déplace le focus sur l'onglet suivant. Si sur le dernier onglet, déplace le focus sur le premier onglet. Activer l'onglet ciblé après un court délai." , ja: "フォーカスを次のタブに移動します。 最後のタブの場合は、最初のタブにフォーカスを移動します。 短時間の間にフォーカスを合わせたタブを有効にします。", es: "Mueve el foco a la siguiente pestaña. Si está en la última pestaña, mueve el foco a la primera pestaña. Active la pestaña enfocada después de un breve retraso." },

  "Move focus to the next tab. If on last tab, moves focus to first tab. The focused tab must be manually activated." : { fr: "Déplace le focus sur l'onglet suivant. Si sur le dernier onglet, déplace le focus sur le premier onglet. L'onglet ciblé doit être activé manuellement." , ja: "フォーカスを次のタブに移動します。 最後のタブの場合は、最初のタブにフォーカスを移動します。 フォーカスされたタブは手動でアクティブにする必要があります。", es: "Mueve el foco a la siguiente pestaña. Si está en la última pestaña, mueve el foco a la primera pestaña. La pestaña enfocada se debe activar manualmente." },
  "Move focus to the first tab. Activate focused tab after a short delay." : { fr: "Déplace le focus sur le premier onglet. Activer l'onglet ciblé après un court délai." , ja: "フォーカスを最初のタブに移動します。 短時間の間にフォーカスを合わせたタブを有効にします。", es: "Mueve el foco a la primera pestaña. Active la pestaña enfocada después de un breve retraso." },
  "Move focus to the last tab. Activate focused tab after a short delay." : { fr: "Déplace le focus sur le dernier onglet. Activer l'onglet ciblé après un court délai." , ja: "フォーカスを最後のタブに移動します。 短時間の間にフォーカスを合わせたタブを有効にします。", es: "Mueve el foco a la última pestaña. Active la pestaña enfocada después de un breve retraso." },
  "Move focus to the first tab. The focused tab must be manually activated." : { fr: "Déplace le focus sur le premier onglet. L'onglet ciblé doit être activé manuellement." , ja: "フォーカスを最初のタブに移動します。 フォーカスされたタブは手動でアクティブにする必要があります。", es: "Mueve el foco a la primera pestaña. La pestaña enfocada se debe activar manualmente." },
  "Move focus to the last tab. The focused tab must be manually activated." : { fr: "Déplace le focus sur le dernier onglet. L'onglet ciblé doit être activé manuellement." , ja: "フォーカスを最後のタブに移動します。 フォーカスされたタブは手動でアクティブにする必要があります。", es: "Mueve el foco a la última pestaña. La pestaña enfocada se debe activar manualmente." },

  "Activate panel associated with focused tab." : { fr: "Activer le panneau associé à l'onglet ciblé." , ja: "フォーカスされたタブに関連付けられたパネルをアクティブにします。", es: "Activa el panel asociado con la pestaña enfocada." },
  "Activate or toggle panel associated with focused tab." : { fr: "Activer ou basculer le panneau associé à l'onglet ciblé." , ja: "フォーカスされたタブに関連付けられたパネルを有効または切り替えます。", es: "Activar o alternar panel asociado con la pestaña enfocada." },
  "Move focus to the previous tab and immediately activate." : { fr: "Déplace le focus sur l'onglet précédent et active immédiatement." , ja: "フォーカスを前のタブに移動し、すぐにアクティブにします。", es: "Mueva el foco a la pestaña anterior y actívela de inmediato." },
  "Move focus to the next tab and immediately activate." : { fr: "Déplace le focus sur l'onglet suivant et active immédiatement." , ja: "フォーカスを次のタブに移動し、すぐにアクティブにします。", es: "Mueva el foco a la siguiente pestaña y actívela de inmediato." },

  "Move focus to associated tab." : { fr: "Déplace le focus sur l'onglet associé." , ja: "関連するタブにフォーカスを移動します。", es: "Mueve el foco a la pestaña asociada." },

  "Valid JSON file, but no groups in it" : { fr: "Fichier JSON valide, mais aucun groupe" , ja: "有効なJSONファイルですが、その中にグループはありません", es: "Archivo JSON válido, pero no hay grupos en él" },


  "Valid json file with %1 groups in it, but you should put feeds in it" : { fr: "Fichier json valide avec %1 groupes, mais vous devriez y mettre des flux" , ja: "%1つのグループがある有効なjsonファイルですが、その中にソースを入れる必要があります", es: "Archivo json válido con %1 grupos, pero debe poner las fuentes en él" },

  "Example feeds" : { fr: "Exemples de flux" , ja: "情報源の例", es: "Ejemplos de fuentes" },

  "Data structure OK: %1 groups containing %2 feeds" : { fr: "Structure de données OK: %1 groupes contenant %2 flux" , ja: "データ構造OK：%2のソースを含むグループ%1", es: "Estructura de datos OK: %1 grupos que contienen %2 fuentes" },

  "Invalid file" : { fr: "Fichier non valide" , ja: "無効なファイル", es: "Archivo inválido" },

  "This is not a valid Pétrolette feeds file" : { fr: "Ceci n'est pas un fichier de flux Pétrolette valide" , ja: "これは有効なPétroletteフィードファイルではありません", es: "Este no es un archivo de feeds de Pétrolette válido" },

  "Valid Pétrolette feeds file" : { fr: "Fichier de flux Pétrolette valide" , ja: "これは有効なPétroletteフィードファイルです", es: "Archivo de feeds de Pétrolette válido" },

  "Pétrolette can't read this file" : { fr: "Pétrolette ne pavient pas à lire ce fichier", ja: "Pétroletteはこのファイルを読み取ることができません", es: "Pétrolette no puede leer este archivo" },

  "Edit group" : { fr: "Modifier groupe" , ja: "グループの編集", es: "Editar grupo" },
  "Group name" : { fr: "Nom du groupe" , ja: "グループ名", es: "Nombre de la grupo" },
  "Group position" : { fr: "Position du groupe" , ja: "グループの位置", es: "Posición del grupo" },
  "Left" : { fr: "Gauche" , ja: "左", es: "Izquierda" },
  "Right" : { fr: "Droite" , ja: "右", es: "Derecha" },
  "Day theme" : { fr: "Thème jour" , ja: "日テーマ", es: "Tema del día" },
  "Night theme" : { fr: "Thème nuit" , ja: "夜のテーマ", es: "Tema nocturno" },
  "Day" : { fr: "Jour" , ja: "日", es: "día" },
  "Night" : { fr: "Nuit" , ja: "夜", es: "Noche" },

  // Help
  "Prev" : { fr: "Précédent" , ja: "前", es: "Anterior" },
  "Next" : { fr: "Suivant" , ja: "次", es: "Siguiente" },
  "Skip" : { fr: "Passer" , ja: "スキップ", es: "Omitir" },
  "Got it!" : { fr: "Compris !" , ja: "理解！", es: "Entendido!" },

  "This is a tab. It contains feeds." : { fr: "Ceci est un onglet, qui contient des flux." , ja: "これはタブです。 それはソースを含んでいます。", es: "Esta es una grupo. Contiene fuentes." },

  "Click on a group tab to display it ; Click the current/selected group tab to change its name and position. Drag to sort tabs." : { fr: "Cliquer sur l'onglet d'un groupe pour l'afficher ; cliquer sur le l'onglet courant pour changer son nom et sa position. Faites glisser pour réorganiser les onglets." , ja: "グループタブをクリックして表示します。現在の/選択したグループタブをクリックして、名前と位置を変更します。ドラッグしてタブを並べ替えます。", es: "Haga clic en una pestaña de grupo para mostrarla. Haga clic en la pestaña del grupo actual / seleccionado para cambiar su nombre y posición. Arrastra para reordenar las pestañas." },

  "That's what it's all about" : { fr: "C'est de ça qu'il s'agit" , ja: "それがすべてです", es: "Eso es lo que se trata" },

  "Keep everything tidy" : { fr: "Tout est bien rangé" , ja: "すべてを整頓してください", es: "Mantenga todo ordenado" },

  "Well you know how a tab works" : { fr: "Un onglet pour les rassembler tous" , ja: "あなたはタブがどのように機能するか知っています", es: "Sabes como funciona una pestaña" },

  "Add a new feed" : { fr: "Ajouter un nouveau flux" , ja: "新しいフィードを追加する", es: "Agregar un nuevo fuente" },

  "Get the latest articles." : { fr: "Voir les derniers articles." , ja: "最新の記事を入手する。", es: "Obtenga los últimos artículos." },
  "B-bye" : { fr: "Au revoir" , ja: "さようなら", es: "Adios" },
  "Grip handle" : { fr: "Poignée" , ja: "グリップハンドル", es: "Mango" },

  "Folded feeds are not loaded at startup, so as to speed things up." : { fr: "Les flux pliés ne sont pas chargés au démarrage, afin d'accélérer les choses." , ja: "折りたたまれたフィードは、処理を高速化するために、起動時に読み込まれません。", es: "Los feeds doblados no se cargan al inicio, para acelerar las cosas." },


  "You can also drag this button to your bookmark toolbar, and click it when you want to add a website to Pétrolette" : { fr: "Vous pouvez également faire glisser ce bouton dans la barre d'outils de votre navigateur et cliquer dessus lorsque vous souhaitez ajouter un site Web à Pétrolette" , ja: "このボタンをブックマークツールバーにドラッグして、Pétroletteにウェブサイトを追加するときにクリックすることもできます", es: "También puede arrastrar este botón a la barra de herramientas de su marcador y hacer clic en él cuando desee agregar un sitio web a Pétrolette." },
  "Add to Pétrolette" : { fr: "Ajouter à Pétrolette" , ja: "Pétroletteに追加", es: "Agregar a Pétrolette" },
  "Drag to the bookmark bar" : { fr: "Glisser dans la barre de favoris" , ja: "ブックマークバーにドラッグ", es: "Arrastre a la barra de marcador" },

  "This is a feed. More info: %1" : { fr: "Ceci est un flux. Plus d'infos: %1" , ja: "これはソースです 詳細情報：%1", es: "Esta es una fuente. Más info: %1" },

  "This is an RSS feed." : { fr: "Ceci est un flux RSS." , ja: "これはソースです 詳細情報", es: "Esta es una fuente." },

  "Click this button to add a tab" : { fr: "Cliquez sur ce bouton pour ajouter un onglet" , ja: "グループを追加するには、このボタンをクリックします。", es: "Haga clic en este botón para agregar un grupo" },

  "Source code" : { fr: "Code source" , ja: "ソースコード", es: "Código fuente" },
  "Use the force - read the Source" : { fr: "Utilise la Force, lis le Source" , ja: "力を使って、ソースを読んでください", es: "Usa la fuerza, lee la Fuente" },

  "Click to add a feed" : { fr: "Cliquer pour ajouter un flux" , ja: "ソースを追加するにはクリックしてください", es: "Haga clic para agregar una fuente" },

  "Click to add a feed." : { fr: "Cliquer pour ajouter un flux." , ja: "ソースを追加するにはクリックしてください", es: "Haga clic para agregar una fuente." },

  "You are in control now" : { fr: "Vous êtes à la barre maintenant" , ja: "あなたは今コントロールしています", es: "Tu tienes el control ahora" },

  "Use the menu to configure Pétrolette" : { fr: "Utilisez le menu pour configurer Pétrolette" , ja: "メニューを使用してPétroletteを構成します", es: "Usa el menú para configurar Pétrolette" },

  "Refresh / reload this feed" : { fr: "Actualiser / recharger ce flux" , ja: "このソースを更新/再読み込みしてください。", es: "Actualiza / recarga esta fuente" },

  "feeds loaded" : { fr: "flux chargés" , ja: "ソースが読み込まれました", es: "fuentes cargadas" },

  "Wait! Are you sure?" : { fr: "Stop ! Sur ?" , ja: "待つ！ 本気ですか？", es: "¡Espere! ¿Estás seguro?" },

  "Select this feed (for drag & drop)." : { fr: "Sélectionner ce flux (pour le glisser-déposer)." , ja: "このソースを選択します（ドラッグ＆ドロップ用）。", es: "Seleccione esta fuente (para arrastrar y soltar)." },
  "Drag here to move this feed (and all other selected feeds) within this tab, or into another." : { fr: "Attraper ici pour déplacer ce flux (et toutes les autres flux sélectionnées) dans cet onglet ou dans un autre." , ja: "ここでドラッグすると、このグループ内のこのソース（および他のすべての選択されたソース）を別のグループに移動できます。", es: "Arrastre aquí para mover esta fuente (y todas las demás fuentes seleccionadas) dentro de este grupo o dentro de otra." },

  "Fold / unfold this feed." : { fr: "Plier / déplier ce flux." , ja: "このソースを展開/折りたたむ。", es: "Expandir / contraer esta fuente." },

  "Pétrolette allows you to sync data with a storage of your choice ; " : { fr: "Synchroniser Pétrolette avec le stockage de votre choix ; " , ja: "Pétroletteでは、選択したストレージにデータを同期させることができます。 ; ", es: "Pétrolette le permite sincronizar datos con un almacenamiento de su elección ; " },

  "Read more." : { fr: "En savoir plus" , ja: "続きを読む。", es: "Lee mas." },

  "Add a new tab" : { fr: "Ajouter un nouvel onglet" , ja: "新しいタブを追加する", es: "Agregar una nueva carpeta" },
  "New tab" : { fr: "Nouvel onglet", ja: "新しいタブ", es: "Nueva carpeta" },

  "Add a feed" : { fr: "Ajouter un flux" , ja: "ソースを追加します", es: "Agrega una fuente" },
  "New feed" : { fr: "Nouveau flux", ja: "新しい情報源", es: "Nueva fuente" },

  "Welcome to Pétrolette" : { fr: "Bienvenue dans Pétrolette" , ja: "ペトロレットへようこそ", es: "Bienvenido a Pétrolette" },

  "Learn to use it in a few easy steps" : { fr: "Apprenez à utiliser Pétrolette en quelques instants" , ja: "いくつかの簡単なステップでそれを使用することを学ぶ", es: "Aprenda a usarlo en unos sencillos pasos" },

  "How does it work?" : { fr: "Comment ça marche ?" , ja: "どのように機能するのですか？", es: "¿Como funciona?" },
  "Take the tour" : { fr: "Visite guidée" , ja: "ガイド付き訪問", es: "Visita guiada" },
  "Pétrolette uses a time-tested technology" : { fr: "Pétrolette fonctionne sur une technologie éprouvée" , ja: "Pétroletteは時間を守った技術を使用しています", es: "Pétrolette utiliza una tecnología probada" },
  "Websites provide a feed of their headlines to facilitate access to their content ; Pétrolette updates and displays them." : { fr: "Les sites produisent un flux d'info pour faciliter l'accès à leur contenu ; Pétrolette actualise ces sources et les affiche." , ja: "ウェブサイトは、コンテンツへのアクセスを容易にするために、見出しのフィードを提供します。 Pétroletteが更新して表示する", es: "Los sitios web proporcionan información sobre sus titulares para facilitar el acceso a su contenido; Pétrolette las actualiza y las muestra." },

  "Tour" : { fr: "Visite", ja: "旅行", es: "Visita" },

  "The website publishes a new article" : { fr: "Le site publie un nouvel article" , ja: "ウェブサイトは新しい記事を公開します", es: "El sitio web publica un nuevo artículo" },
  "Its RSS feed is updated" : { fr: "Son flux RSS est mis à jour" , ja: "そのRSSフィードが更新されます", es: "Su feed RSS está actualizado" },
  "At the next refresh, Pétrolette displays a new link to this article" : { fr: "Lors du prochain rafraîchissement, Pétrolette affiche un nouveau lien vers cet article'article" , ja: "次の更新時に、Pétroletteはこの記事への新しいリンクを表示します", es: "En la próxima actualización, Pétrolette muestra un nuevo enlace a este artículo." },

  "Just a container for your feeds. Specifically, a tab that you can create, (re)name, move, and delete just like usual." : { fr: "Juste un conteneur pour vos flux ; plus précisément, un onglet que vous pouvez créer, (re) nommer, déplacer et supprimer comme d'habitude." , ja: "あなたのソースのためのちょうど容器。 具体的には、作成したり、名前を変更したり、移動したり、削除したりするタブです。", es: "Solo un contenedor para tus fuentes. Específicamente, una pestaña que puede crear, (re) nombrar, mover y eliminar como siempre." },

  "What is a feed?" : { fr: "Qu'est-ce qu'un flux ?" , ja: "情報源とは何ですか？", es: "¿Qué es una fuente?" },

  "What is a tab?" : { fr: "Qu'est-ce qu'un onglet ?" , ja: "フォルダとは何ですか？", es: "¿Qué es una carpeta?" },

  "What is a feed? How do I create one?" : { fr: "Qu'est-ce qu'un flux ? Comment en créer un ?" , ja: "情報源とは何ですか？ どのように作成するのですか？", es: "¿Qué es una fuente? ¿Cómo creo uno?" },

  "Click the «New feed» button." : { fr: "Cliquez sur le bouton «nouveau flux»." , ja: "«新しいソース»ボタンをクリックします。", es: "¿Qué es una fuente?" },

  "Why didn't I have to register? Where are my tabs and feeds saved?" : { fr: "Pourquoi n'ai-je pas dû m'inscrire ou me connecter? Où sont sauvegardés mes onglets et mes flux?" , ja: "なぜ私は登録やサインインをしなければならなかったのですか？ 私のグループとソースはどこに保存されていますか？", es: "¿Por qué no tengo que registrarme o iniciar sesión? ¿Dónde se guardan mis carpetas y fuentes?" },

  "Your feeds are saved in your browser. Go ahead, try to visit http://petrolette.space with another web browser, and you'll see other feeds." : { fr: "Vos flux sont enregistrées dans votre navigateur. Allez-y, essayez de visiter http://petrolette.space avec un autre navigateur Web, et vous verrez d'autres flux." , ja: "ソースはブラウザに保存されます。 他のWebブラウザでhttp://petrolette.spaceにアクセスしてみると、他のソースが表示されます。", es: "Tus fuentes se guardan en tu navegador. Adelante, intente visitar http://petrolette.space con otro navegador web, y verá otras fuentes." },

  "How can I view the same feeds on all my devices (like my phone)?" : { fr: "Comment voir les mêmes flux sur tous mes appareils (comme mon phone)?" , ja: "私のすべてのデバイス（私の電話のようなもの）に同じソースを表示するにはどうしたらいいですか？", es: "¿Cómo puedo ver las mismas fuentes en todos mis dispositivos (como mi teléfono)?" },

  "Two ways:" : { fr: "Deux méthodes:" , ja: "ふたつのやり方：", es: "Dos caminos:" },

  "Use the «Export» button in the menu to save your feeds file, then on the other device, use the «Import» button to load this file." : { fr: "Utilisez le bouton «Exporter» dans le menu pour enregistrer votre fichier flux, puis sur l'autre appareil, le bouton «Importer» pour charger ce fichier." , ja: "メニューの«エクスポート»ボタンを使用してソースファイルを保存し、次に他のデバイスに«インポート»ボタンを使用してこのファイルをロードします。", es: "Use el botón «Exportar» en el menú para guardar su archivo de fuentes, luego en el otro dispositivo, use el botón «Importar» para cargar este archivo." },

  "Or (recommended, much easier) use the synchronize button in the main menu to connect to the cloud - 5Apps, DropBox and Google Drive, only 5Apps is enabled on this instance for now, but you should use it anyway as it is FLOSS software - each change you make will then be reflected on all devices." : { fr: "Ou (recommandé, beaucoup plus facile) utilisez le bouton de synchronisation dans le menu principal pour vous connecter au nuage - 5Apps, DropBox et Google Drive, 5Apps seulement est activé sur cette instance pour l'instant, mais vous devriez l'utiliser de toute façon car c'est un logiciel FLOSS - chaque modification que vous effectuez sera répercutée sur tous les appareils." , ja: "メインメニューの同期ボタンを使用してクラウド（5Apps、DropBox、Googleドライブ）に接続すると、現在のところ5Appsのみが有効になっていますが、これはFLOSSソフトウェアと同じように使用する必要があります） あなたが行った変更は、すべてのデバイスに反映されます。", es: "O (recomendado, mucho más fácil) use el botón de sincronización en el menú principal para conectarse a la nube - 5Apps, DropBox y Google Drive, solo 5Apps está habilitado en esta instancia por ahora, pero debe usarlo de todos modos ya que es software FLOSS - cada cambio que realice se reflejará en todos los dispositivos." },

  "If you enter the URL of a valid feed (see «RSS feed» above), such as «https://news.google.com/news/rss/rss» Pétrolette will display it." : { fr: "Si vous entrez l'URL d'un flux valide (voir «Flux RSS» ci-dessus), par exemple «https://news.google.com/news/rss/rss», Pétrolette l'affichera." , ja: "«https://news.google.com/news/rss/rss»のような有効なソースのURLを入力すると（上記の«RSSフィード»を参照）、Pétroletteはそれを表示します", es: "Si ingresa la URL de una fuente válida (consulte «Alimentación RSS» arriba), como «https://news.google.com/news/rss/rss», Pétrolette lo mostrará." },

  "Now, if you simply enter the URL of a website, like «https://www.rt.com», Pétrolette will try to find the feed of this website and display it." : { fr: "Maintenant, si vous entrez simplement l'URL d'un site Web, comme «https://www.rt.com», Pétrolette essaiera de trouver le flux de ce site Web et de l'afficher." , ja: "«https://www.rt.com»のようにウェブサイトのURLを入力するだけで、Pétroletteはこのウェブサイトのソースを見つけて表示しようとします", es: "Si simplemente ingresa la URL de un sitio web, como «https://www.rt.com», Pétrolette intentará encontrar el origen de este sitio web y mostrarlo." },

  "And finally, if you enter anything other than a URL, like the expression «bitcoin crash» or «zombie attack», Pétrolette will build a feed using a free and open feed proxy search engine, which will display the latest news on fluctuations in digital currency (or incidents involving undead) every time you update it." : { fr: "Enfin, si vous entrez autre chose qu'une URL, comme l'expression «crash Bitcoin» ou «attaque zombie», Pétrolette construira un flux en utilisant un moteur de recherche proxy gratuit et open feed, qui affichera les dernières nouvelles sur les fluctuations des devises numérique (ou les incidents impliquant des morts-vivants) chaque fois que vous le mettez à jour." , ja: "最後に、「bitcoinクラッシュ」や「ゾンビ攻撃」のようなURL以外のものを入力すると、Pétroletteは無料でオープンソースのプロキシ検索エンジンを使用してソースを構築し、デジタルの変動に関する最新ニュースを表示します 通貨（またはアンデッドを含むインシデント）を更新するたびに", es: "Y finalmente, si ingresa algo que no sea una URL, como la expresión «accidente de bitcoin» o «ataque zombi», Pétrolette construirá una fuente utilizando un motor de búsqueda de proxy de código abierto y gratuito, que mostrará las últimas noticias sobre las fluctuaciones en moneda (o incidentes relacionados con muertos vivientes) cada vez que la actualice." },

  "If you enter the URL of a valid feed (see «RSS feed» above), such as «https://news.google.com/news/rss/rss» Pétrolette will display it. Now, if you simply enter the URL of a website, like «https://www.rt.com», Pétrolette will try to find the feed of this website and display it. And finally, if you enter anything other than a URL, like the expression «bitcoin crash» or «zombie attack», Pétrolette will build a feed using a free and open feed proxy search engine, which will display the latest news on fluctuations in digital currency (or incidents involving undead) every time you update it." : { fr: "Cliquez sur le bouton «Ajouter un flux» ; si vous entrez l'URL d'un flux valide (voir ci-dessus «flux RSS»), comme, par exemple, «https://news.google.com/news/rss/rss» Pétrolette l'affichera. Maintenant, si vous entrez simplement l'URL d'un site web, comme https://www.rt.com, Pétrolette va essayer de trouver le flux de ce site web et l'afficher. Et enfin, si vous entrez autre chose qu'une URL, comme l'expression «crash bitcoin» ou «attaque zombie», Pétrolette va construire un flux en utilisant un moteur de recherche proxy libre et open feed, qui affichera les dernières nouvelles sur les fluctuations de monnaie numérique (ou des incidents impliquant des morts-vivants) chaque fois que vous l'actualisez." , ja: "[新しいソース]ボタンをクリックします。「https://news.google.com/news/rss/rss」などの有効なソース（上記の「RSSフィード」を参照）のURLを入力すると、Pétroletteに表示されます。 さて、単にhttps://www.rt.comのようなウェブサイトのURLを入力すれば、Pétroletteはこのウェブサイトのソースを見つけようとします。 最後に、「bitcoin crash」や「zombie attack」のようなURL以外のものを入力すると、Pétroletteは無料のオープンソースプロキシ検索エンジンを使用してソースを構築し、デジタルの変動に関する最新ニュースを表示します 通貨（またはアンデッドに関わるインシデント）を更新するたびに更新されます。", es: "Haga clic en el botón **Nueva fuente** ; Si ingresa la URL de una fuente válida (consulte «Alimentación RSS» arriba), como «https://news.google.com/news/rss/rss», Pétrolette lo mostrará. Ahora, si simplemente ingresa la URL de un sitio web, como https://www.rt.com, Pétrolette intentará encontrar el origen de este sitio web y mostrarlo. Y finalmente, si ingresa algo que no sea una URL, como la expresión «accidente de bitcoin» o «ataque de zombie», Pétrolette construirá una fuente utilizando un motor de búsqueda de proxy de código abierto y gratuito, que mostrará las últimas noticias sobre las fluctuaciones en moneda (o incidentes relacionados con muertos vivientes) cada vez que la actualice." },

  "How do I use it?" : { fr: "Comment l'utiliser ?" , ja: "どうやって使うの？", es: "¿Como lo uso?" },

  "Ok, where do I start?" : { fr: "Ok, c'est par où ?" , ja: "さて、私はどこから始めますか？", es: "Ok, ¿por dónde empiezo?" },

  "Pétrolette is a news reader focused on preventing anyone to know what you are reading." : { fr: "Pétrolette est un lecteur d'actualités qui protège votre vie privée en empéchant quiconque de savoir ce que vous lisez. " , ja: "Pétroletteは、あなたが読んでいるものを誰かが知るのを防ぐことに焦点を当てたニュースリーダーです。", es: "Pétrolette es un lector de noticias enfocado en evitar que cualquiera sepa lo que está leyendo." },

  "Learn how to use" : { fr: "Apprenez à utiliser" , ja: "タブとソース、および一般的なPétroletteの使い方を学んでください。", es: "Aprenda cómo usar" },
  "and Pétrolette in general." : { fr: "et Pétrolette en général." , ja: "Pétroletteの使い方を学んでください。", es: "y Pétrolette en general." },
  "the tabs and the feeds" : { fr: "les onglets et les flux" , ja: "フォルダとフィード", es: "las carpetas y las fuentes" },

  "Open / import tabs and feeds" : { fr: "Ouvrir / importer onglets et flux" , ja: "フォルダとフィードを開く/インポートする", es: "Abrir / importar carpetas y canales RSS" },
  "Save / export tabs and feeds" : { fr: "Enregistrer / exporter onglets et flux" , ja: "タブとフィードを保存/エクスポートする", es: "Guardar archivo de carpetas y feeds" },

  "Reset all tabs and feeds to defaults" : { fr: "Réinitialiser tous les onglets et flux aux valeurs par défaut" , ja: "すべてのタブとフィードをデフォルトにリセットします", es: "Restablecer todas las pestañas y fuentes a los valores predeterminados" },

  "Reset" : { fr: "Réinitialiser" , ja: "リセット", es: "Restablecer" },

  "This operation cannot be undone" : { fr: "Cette opération ne peut pas être annulée" , ja: "この操作は元に戻せません", es: "Esta operación no se puede deshacer" },

  "All tabs and feeds restored to defaults" : { fr: "Tous les onglets et flux restaurés aux valeurs par défaut" , ja: "すべてのタブとフィードがデフォルトに復元されました", es: "Todas las pestañas y fuentes restaurados a los valores predeterminados" },

  "If this is set, when you drag & drop one or more feed(s) in a group, said group opens" : { fr: "Ouvrir le groupe où un flux est déposée" , ja: "魔法使いのタブを開いて餌を入れる", es: "Abrir grupo en donde se pone un canal" },

  "Empty feed" : { fr: "Source vide" , ja: "空のソース", es: "fuente vacía" },

  "View Pétrolette according to the time of day." : { fr: "Voir Pétrolette selon l'heure de la journée." , ja: "時刻に応じてPétroletteを表示する", es: "Ver Pétrolette según la hora del día." },

  "When you click an image, you can view it in a gallery, and start a slideshow." : { fr: "Un clic sur une image l'affiche dans une galerie." , ja: "イメージをクリックすると、ギャラリーでそのイメージを表示し、スライドショーを開始できます", es: "Cuando hace clic en una imagen, puede verla en una galería." },
  "Help Pétrolette according to your spiritual mood of the day." : { fr: "Aider (en vrai) Pétrolette." , ja: "あなたの精神的な日の気分に応じてPétroletteを助けてください", es: "Ayuda a Pétrolette de acuerdo con tu estado de ánimo espiritual del día." },
  "This file is bad [%1]" : { fr: "Ce fichier est chelou [%1]" , ja: "[%1]このファイルは悪いです", es: "Este archivo es malo [%1]" },
  "Loading of [%1] OK" : { fr: "Lecture de [%1] OK" , ja: "[%1]をロードしました。OK", es: "Cargado [%1] bien" },
  "Erase all" : { fr: "Tout effacer" , ja: "すべてを消去する", es: "Borrar todo" },

  "Connected to remote storage" : { fr: "Connecté au stockage distant" , ja: "リモートストレージに接続", es: "Conectado al almacenamiento remoto" },

  "Not Connected to remote storage" : { fr: "Non connecté au stockage distant" , ja: "リモートストレージに接続されていない", es: "No conectado a almacenamiento remoto" },

  "Disconnected from remote storage" : { fr: "Déconnecté du stockage distant" , ja: "リモートストレージから切断されました", es: "Desconectado de almacenamiento remoto" },

  "Synchronize" : { fr: "Synchroniser" , ja: "同期する", es: "Sincronizar" },
  "More info" : { fr: "Plus d'infos" , ja: "詳細情報", es: "Más info" },
  "More info: %1" : { fr: "Plus d'infos: %1" , ja: "詳細情報: %1", es: "Más info: %1" },

  "Connection to storage" : { fr: "Connexion au stockage" , ja: "ストレージへの接続", es: "Conexión al almacenamiento" },

  "Synced just now" : { fr: "Synchronisé maintenant" , ja: "今すぐ同期しました", es: "Sincronizado ahora mismo" },

  "To synchronize the feeds across devices" : { fr: "Pour synchroniser les flux sur plusieurs appareils" , ja: "デバイス間でソースを同期するには", es: "Para sincronizar las fuentes en todos los dispositivos" },





  "Remote file validation NOT OK (error [%1]) now reading from browser cache" : { fr: "Validation de fichier à distance NOT OK (erreur [%1]) lecture depuis le cache du navigateur" , ja: "リモートファイルの検証NOT OK（エラー[%1]）がブラウザのキャッシュから読み込み中です", es: "La validación remota de archivos NO está OK (error [%1]) leyendo desde el caché del navegador" },

  "Reading feeds and preferences from browser cache" : { fr: "Lecture des flux et des préférences depuis le cache du navigateur" , ja: "ブラウザのキャッシュからソースと設定を読み込む", es: "Leer las fuentes y preferencias de la memoria caché del navegador" },

  "Remote file validation OK" : { fr: "Validation fichier distant OK" , ja: "リモートファイルの検証OK", es: "Validación remota de archivos OK" },

  "Writing to remote storage OK" : { fr: "Ecriture stockage distant OK" , ja: "リモートストレージへの書き込みOK", es: "Escribir almacenamiento remoto OK" },

  "There was a problem writing to remote storage: [%1]" : { fr: "Un problème est survenu lors de l'écriture sur le stockage distant: [%1]" , ja: "リモートストレージへの書き込みに問題がありました：[%1]", es: "Hubo un problema al escribir en el almacenamiento remoto: [%1]" },

  "Problem reading feed [%1] Error type [%2]" : { fr: "Problème lecture flux [%1] Type d'erreur [%2]", ja: "問題の読書の問題[%1]エラータイプ[%2]", es: "Problema al leer la fuente [%1] Tipo de error [%2]" },

  "Error type" : { fr: "Type d'erreur", ja: "エラータイプ", es: "Tipo de error" },

  "Error" : { fr: "Erreur", ja: "エラー", es: "Error" },
  "Error:" : { fr: "Erreur:", ja: "エラー", es: "Error:" },

  "error" : { fr: "erreur", ja: "エラー", es: "error" },

  "Main menu" : { fr: "Menu principal", ja: "メインメニュー", es: "Menú principal" },

  // Dialogues
  "Flux: Kill" : { fr: "Feed: Supprimer", ja: "フィード：削除", es: "Flux: Eliminar" },
  "Feed: Parameters" : { fr: "Flux: Paramètres", ja: "フィード：パラメータ", es: "Feed: Parámetros" },
  "Feed type" : { fr: "Type de flux", ja: "フィードの種類", es: "Tipo de flux" },

  "Type" : { fr: "Type", ja: "タイプ", es: "Tipo" },


  "Feed group" : { fr: "Groupe du flux", ja: "ソースグループ", es: "Grupo fuente" },

  "Mixed" : { fr: "Mixte", ja: "混合", es: "Mezclado" },
  "Image" : { fr: "Image", ja: "画像", es: "Imagen" },
  "Text" : { fr: "Texte", ja: "テキスト", es: "Texto" },
  "Collection" : { fr: "Collection", ja: "コレクション", es: "Colección" },

  "Index" : { fr: "Indice", ja: "インデックス", es: "Índice" },

  "Height" : { fr: "Hauteur", ja: "高さ", es: "Altura" },

  "Number of items displayed in this feed" : { fr: "Nombre d'articles affichés dans ce flux", ja: "このソースの項目数", es: "Número de elementos en este fuente" },
  "Number of feeds" : { fr: "Nombre de flux", ja: "ソース数", es: "Cantidad de fuentes" },

  "Just answer the question" : { fr: "Répond juste à la question", ja: "ちょうど質問に答える", es: "Solo responde la pregunta" },

  "Group: Kill" : { fr: "Group: Supprimer", ja: "タブ：削除", es: "Grupo: Eliminar" },
  "Unrecognized URL" : { fr: "URL non reconnue", ja: "認識できないURL", es: "URL no reconocida" },

  "Unrecognized URL: %1" : { fr: "URL non reconnue: %1", ja: "認識できないURL: %1", es: "URL no reconocida: %1" },

  "No feeds found" : { fr: "Aucun flux trouvée", ja: "ソースが見つかりません", es: "No se encontraron fuentes" },

  "Found %1 feeds in %2 columns in %3 groups" : { fr: "Trouvé %1 flux dans %2 colonnes dans %3 groupes", ja: "%3つのグループで%2つの列に%1つのソースが見つかりました", es: "Se encontraron %1 fuentes en %2 columnas en %3 grupos" },

  "Location" : { fr: "Adresse", ja: "ロケーション", es: "Ubicación" },

  "Enter a website address/URL and click search, then OK, or simply enter the URL of the feed and click OK" : { fr: "Entrer l'adresse / URL d'un site Web, puis cliquer sur Rechercher et valider, ou directement l'adresse d'un flux et valider", ja: "ウェブサイトのアドレス/ URLを入力して[検索]をクリックし、次に[OK]をクリックするか、フィードの場所", es: "Ingrese la dirección / URL de un sitio web y haga clic en buscar, luego en Aceptar o ingrese directamente la ubicación del fuente" },


  "Enter a website address/URL and click search, then OK, or simply enter the URL of the" : { fr: "Entrez une adresse / URL de site Web et cliquez sur Rechercher, puis sur OK, ou entrez simplement l'URL du", ja: "ウェブサイトのアドレス/ URLを入力して[検索]、[OK]の順にクリックするか、単にURLを入力します", es: "Ingrese la dirección / URL de un sitio web y haga clic en buscar, luego OK, o simplemente ingrese la URL del" },

  "Heck, enter anything, and Pétrolette will build a feed from your search query" : { fr: "Bon, entrez n'importe quoi, et Pétrolette construira un flux à partir de votre requête de recherche", ja: "何かを入力すると、Pétroletteは検索クエリからソースを作成します。]をクリックし、次に[OK]をクリックするか、フィードの場所", es: "Diablos, ingrese cualquier cosa, y Pétrolette construirá una fuente a partir de su consulta de búsqueda" },



  "Find the feed of this website, or build a new one from the search terms." : { fr: "Recherchez le flux de ce site Web ou créez-en un nouveau à partir des termes recherche.", ja: "このウェブサイトのフィードを見つけるか、検索用語から新しいフィードを作成してください。", es: "Busque el feed de este sitio web o cree uno nuevo a partir de los términos de búsqueda." },



  "Move the current feed in this group" : { fr: "Déplacer le flux courant dans ce groupe", ja: "このグループの現在のフィードを移動する", es: "Mueve el fuente actual en este grupo" },

  "Display only text" : { fr: "Affichage du texte seul", ja: "テキストのみ", es: "visualización del solo texto" },
  "Display text and image" : { fr: "Affichage du texte et de l'image", ja: "テキストとイメージ", es: "visualización del texto e imagen" },
  "Display only image" : { fr: "Affichage de l'image seule", ja: "画像のみ", es: "visualización del solo imagen" },

  "Validate /verify this feed file with the W3C" : { fr: "Valider / vérifier ce fichier flux avec le W3C", ja: "このソースファイルをW3Cで検証/検証する", es: "Validar / verificar este archivo fuente con el W3C" },

  "Validate" : { fr: "Valider", ja: "検証", es: "Validar" },

  "Report" : { fr: "Signaler" , ja: "報告する", es: "Reporte" },

  "Report feed error" : { fr: "Signaler un flux en erreur" , ja: "レポートソースエラー", es: "Informe de error de la fuente" },

  "No valid feed found at this address" : { fr: "Aucun flux valide découverte à cette adresse", ja: "このアドレスに有効なソースが見つかりません", es: "No se encontró una fuente válida en esta dirección" },
  "Valid feed found! Now just press OK" : { fr: "Flux valide trouvée ! Maintenant, appuyez simplement sur OK", ja: "有効なソースが見つかりました！ OKを押すだけです", es: "¡Se ha encontrado una fuente válida! Ahora solo presione OK" },

  // New Content

  "Add news feeds" : { fr: "Ajouter des flux d'actualités", ja: "ニュースソースを追加", es: "Agregar fuentes de noticias" },
  "Add misc feeds" : { fr: "Ajouter des flux divers", ja: "その他のソースを追加", es: "Agregar fuentes diferentes" },
  "Delete everything" : { fr: "Tout supprimer", ja: "すべて削除", es: "Elimina todo" },

  // Titres
  "Add a new feed to [%1]" : { fr: "Ajouter un flux à [%1]", ja: "新しいRSSフィードを追加する", es: "Agregue un nuevo feed a [%1]" },

  "Select this feed (%1)" : { fr: "Sélectionner ce flux (%1)", ja: "RSS(%1)フィードを選択", es: "Selecciona este feed (%1)" },


  "Configure this feed" : { fr: "Configurer ce flux" , ja: "このソースを設定します", es: "Configura esta fuente" },

  "Configure this feed." : { fr: "Configurer ce flux." , ja: "このソースを設定します。", es: "Configura esta fuente." },

  "Delete this feed" : { fr: "Supprimer ce flux" , ja: "このソースを削除してください", es: "Eliminar esta fuente" },

  "Delete the [%1] tab" : { fr: "Supprimer l'onglet [%1]" , ja: "本当にこのフォルダを削除しますか？", es: "Eliminar el carpeta [%1]" },

  "Delete feed" : { fr: "Supprimer flux" , ja: "このソースを削除してください", es: "Eliminar esta fuente" },

  "Delete tab" : { fr: "Supprimer onglet", ja: "フォルダを削除", es: "eliminar carpeta" },

  "Untitled" : { fr: "Sans titre", ja: "無題", es: "Intitulado" },

  "%1 | Click to rename, drag to move" : { fr: "%1 | Cliquer pour renommer, glisser pour déplacer", ja: "%1 | クリックして名前を変更し、ドラッグして再注文します", es: "%1 | Haga clic para cambiar el nombre, arrastre para volver a ordenar" },

  "Really delete this feed? (%1)" : { fr: "Réellement supprimer ce flux (%1) ?", ja: "本当にこのフィードを削除しますか？  (%1)", es: "¿Realmente borraste este feed? (%1)" },

  "Really delete this feed?" : { fr: "Réellement supprimer ce flux ?", ja: "本当にこのフィードを削除しますか？", es: "¿Realmente borraste este feed?" },

  "Really delete this column?" : { fr: "Vraiment supprimer cette colonne ?", ja: "本当にこの列を削除しますか？", es: "¿Realmente borras esta columna?" },


  "Really delete this tab?" : { fr: "Supprimer définitivement cet onglet ?", ja: "本当にこのフォルダを削除しますか？", es: "¿De verdad borras esta carpeta?" },



  "Fold / unfold this feed (%1)" : { fr: "Plier / déplier ce flux (%1)", ja: "ウーブリール - ファーマー (%1)", es: "Abrir / cerrar esta fuente (%1)" },

  "Move this feed (%1)" : { fr: "Déplacer ce flux (%1)", ja: "このソースを移動する (%1)", es: "Mueva esta fuente (%)" },

  "Delete this feed (%1)" : { fr: "Supprimer ce flux (%1)", ja: "本当にこのフィードを削除しますか (%1)", es: "Borraste esta feed (%1)" },
  "Delete all" : { fr: "Supprimer tout", ja: "すべて削除", es: "Eliminar todos" },

  "Really delete this group? (%1, %2 feeds)" : { fr: "Réellement supprimer ce groupe (%1, %2 flux) ?", ja: "本当にこのタブを削除しますか？ (%1, %2 フィード)", es: "¿Realmente borras esta grupo? (%1, %2 feeds)" },
  "Edit this feed (%1) parameters" : { fr: "Modifier les paramètres de ce flux (%1)", ja: "このソース（%1）パラメータを変更する", es: "Establezca estos parámetros fuente %1" },
  "Refresh this feed (%1 - %2)" : { fr: "Actualiser ce flux (%1 - %2)", ja: "このソースをリフレッシュしてください (%1 - %2)", es: "Actualiza esta fuente (%1 - %2)" }
};
