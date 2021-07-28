// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.i18n = {
  trans : function(term) {
    var terms = {};
    terms[ PTL.language ] = PTL.tr(term);

    return terms;
  }
};

PTL.i18n.translations = {

  "Pétrolette init" : { fr: "Initialisation Pétrolette", ja: "Pétroletteが起動する", es: "Pétrolette iniciando" },
  "Pétrolette init finished" : { fr: "Initialisation Pétrolette terminée", ja: "ペトロレットの初期化は正常に終了しました", es: "La inicialización de Pétrolette terminó" },

  "OK": { fr: "OK", ja: "入る", es: "OK" },
  "Cancel": { fr: "Annuler", ja: "取り消す", es: "Cancelar" },
  "Delete": { fr: "Supprimer", ja: "削除", es: "Eliminar" },
  "Edit": { fr: "Modifier", ja: "変更", es: "Modificar" },
  "Reload": { fr: "Recharger", ja: "リロード", es: "Recargar" },
  "Refresh": { fr: "Rafraîchir", ja: "更新", es: "Actualizar" },
  "Reset": { fr: "Réinitialiser", ja: "リセット", es: "Reiniciar" },

  "Name": { fr: "Nom", ja: "姓", es: "Nombre" },
  "Names": { fr: "Noms", ja: "お名前 (必須)", es: "Nombres" },
  "Position": { fr: "Position", ja: "ポジション", es: "Posición" },
  "Menu": { fr: "Menu", ja: "メニュー", es: "Menú" },
  "Sorry": { fr: "Désolé", ja: "ごめんなさい", es: "Perdón" },
  "Warning": { fr: "Avertissement", ja: "警告", es: "Advertencia" },
  "All": { fr: "Tout", ja: "すべて", es: "todos" },
  "Replace": { fr: "Remplacer", ja: "交換", es: "Reemplazar" },
  "Merge": { fr: "Fusionner", ja: "マージ", es: "Unir" },

  "Feed" : { fr: "Flux" , ja: "ソース", es: "Fuente" },
  "feed" : { fr: "flux" , ja: "ソース", es: "fuente" },
  "Feeds" : { fr: "Flux" , ja: "ソース", es: "Fuentes" },

  "Tab" : { fr: "Onglet" , ja: "フォルダ", es: "Carpeta" },
  "tab " : { fr: "onglet " , ja: "フォルダ ", es: "carpeta " },
  "Tabs" : { fr: "Onglets" , ja: "フォルダー", es: "Carpetas" },

  "Column" : { fr: "Colonne" , ja: "カラム", es: "Columna" },
  "column" : { fr: "colonne" , ja: "カラム", es: "columna" },

  "Prev" : { fr: "Précédent" , ja: "前", es: "Anterior" },
  "Next" : { fr: "Suivant" , ja: "次", es: "Siguiente" },
  "Close" : { fr: "Fermer" , ja: "閉じる", es: "Cerca" },
  "Got it!" : { fr: "Compris !" , ja: "理解！", es: "Entendido!" },

  "Left" : { fr: "Gauche" , ja: "左", es: "Izquierda" },
  "Right" : { fr: "Droite" , ja: "右", es: "Derecha" },
  "Day theme" : { fr: "Thème jour" , ja: "日テーマ", es: "Tema del día" },
  "Night theme" : { fr: "Thème nuit" , ja: "夜のテーマ", es: "Tema nocturno" },
  "Day" : { fr: "Jour" , ja: "日", es: "día" },
  "Night" : { fr: "Nuit" , ja: "夜", es: "Noche" },
  "Group" : { fr: "Groupe", ja: "グループ", es: "Grupo" },
  "Feed name" : { fr: "Nom du flux", ja: "ソースの名前", es: "Nombre de la fuente" },

  "Location" : { fr: "Adresse", ja: "ロケーション", es: "Ubicación" },

  "Loading" : { fr: "Chargement", ja: "読み込み中", es: "Cargando" },

  "Media" : { fr: "Média", ja: "メディア", es: "Medios" },

  "Bookmarklet" : { fr: "Média", ja: "メディア", es: "Medios" },
  
  "Media preloading" : { fr: "Pré-chargement des médias", ja: "メディアのプリロード", es: "Precarga de medios" },

  "Location / URL / Keywords" : { fr: "Adresse / URL / Mots-clés", ja: "所在地 / URL / キーワード", es: "Ubicación / URL / Palabras clave" },

  "Three options" : { fr: "Trois options", ja: "三种选择", es: "Tres opciones" },

  "The valid URL of a feed" : { fr: "L'URL valide d'un flux", ja: "ソースの有効なURL", es: "La URL válida de una fuente" },

  "The feed will be added to the current tab." : { fr: "Le flux sera ajouté à l'onglet actuel.", ja: "ソースは現在のタブに追加されます。", es: "La fuente se añadirá a la pestaña actual." },

  "The valid URL of a website" : { fr: "L'URL valide d'un site Web", ja: "ウェブサイトの有効なURL", es: "La URL válida de un sitio web" },

  "Pétrolette will search for a feed at this URL, then add it to the current tab." : { fr: "Pétrolette cherchera une source à cette URL, puis l'ajoutera à l'onglet actuel.", ja: "Pétrolette はこの URL でソースを検索し、現在のタブに追加します。", es: "Pétrolette buscará una fuente en esta URL, y luego la añadirá a la pestaña actual." },

  "A list of words" : { fr: "Une liste de mots", ja: "単語のリスト", es: "Una lista de palabras" },

  "Pétrolette will build a search feed (using the configured search engine) that will display the last news about those words" : { fr: "Pétrolette construira un flux de recherche (en utilisant le moteur de recherche configuré) qui affichera les dernières nouvelles à propos de ces mots", ja: "Pétrolette は検索フィード (設定された検索エンジンを使用して) をビルドします。これらの単語に関する最後のニュースが表示されます。", es: "Pétrolette construirá una fuente de búsqueda (utilizando el motor de búsqueda configurado) que mostrará las últimas noticias sobre esas palabras" },

  "Bookmark to quickly add a website\'s feed to Pétrolette" : { fr: "Marque-page pour ajouter le flux d'un site dans Pétrolette", ja: "ブックマークして、PétroletteにWebサイトのフィードを追加します", es: "Marcador para agregar el feed de un sitio web en Pétrolette" },

  "e9156a58-a059-430d-ad36-4b14ab3b00bf" : { fr: "521311c2-ad41-4d7a-b4f0-71a27b1a9edd", ja: "e9156a58-a059-430d-ad36-4b14ab3b00bf", es: "e9156a58-a059-430d-ad36-4b14ab3b00bf" },
  
  "Click to focus current tab" : { fr: "Cliquer pour sélectionner l'onglet courant", ja: "カレントタブを焦点を合わせるにはクリックしてください", es: "Haga clic para enfocar la pestaña actual" },

  "A click on the Pétrolette logo puts the focus on the current tab" : { fr: "Un clic sur le logo Pétrolette met l'accent sur l'onglet en cours", ja: "Pétroletteのロゴをクリックすると、現在のタブに焦点が合わせる", es: "Un clic en el logotipo de Pétrolette pone el enfoque en la pestaña actual" },

  "Feed name (optional)" : { fr: "Nom du flux (optionnel)", ja: "フロー名（オプション）", es: "Nombre de la fuente (Opcional)" },

  "Number of items" : { fr: "Nombre d'éléments", ja: "アイテム数", es: "Número de items" },

  "Height of this feed" : { fr: "Hauteur de ce flux", ja: "この情報源の高さ", es: "Altura de esta fuente" },

  "About Pétrolette" : { fr: "À propos de Pétrolette", ja: "ペトロレットについて", es: "Sobre Pétrolette" },

  "By yPhil" : { fr: "yPhil", ja: "yPhil著", es: "Por yPhil" },

  "The news page that doesn't know you" : { fr: "La page d'actu qui ne sait rien de toi", ja: "あなたを知らないニュースページ", es: "La página de noticias que no te conoce" },


  "Name the feed of this website, if it is not informative enough ; leave blank to get the default feed title." : { fr: "Renommez le flux de ce site Web, s'il n'est pas assez informatif ; laisser vide pour obtenir le titre du flux par défaut." , ja: "それが十分に報知されていない場合、このウェブサイトのフィードに名前を付けます。 デフォルトフィードのタイトルを取得するには、空白のままにします", es: "Nombra la fuente de este sitio web, si no es lo suficientemente informativo; Deje en blanco para obtener el título de fuente predeterminado." },

  "Move this feed to another tab ; Use this menu when drag & drop is not available, like on a phone or a TV." : { fr: "Déplacer ce flux dans un autre onglet ; ce menu est pratique lorsque le glisser-déposer n'est pas disponible, comme sur un téléphone ou un téléviseur." , ja: "このソースを別のグループに移動する", es: "Mueva esta fuente a otro grupo ; Use este menú cuando Drag & Drop no está disponible, como en un teléfono o un televisor." },

  "The type of feed: It can be all text, all image, or mixed." : { fr: "Quel type de flux ? Tout le texte, toute l'image, ou les deux.", ja: "どんな種類の飼料ですか？ すべてのテキスト、すべてのイメージ、または混合。", es: "¿Qué tipo de flux? Todo el texto, toda la imagen o mixto." },

  "Height of the feed\'s viewport." : { fr: "Hauteur de la fenêtre du flux", ja: "ソースのビューポートの高さ", es: "Altura de la ventana de la fuente." },

  "Number of items to load ; 0 loads all items." : { fr: "Nombre d'articles à charger; 0 charge tous les articles.", ja: "ロードする項目数。 0すべてのアイテムをロードします。", es: "Número de artículos para cargar; 0 carga todos los artículos." },
  
  "Tabs and feeds saved" : { fr: "Onglets et flux enregistrés" , ja: "タブとソースが保存されました", es: "Pestañas y fuentes guardadas" },

  "New icon in cache" : { fr: "Nouvelle icône dans le cache" , ja: "キャッシュの新しいアイコン", es: "Nuevo icono en caché" },

  "Error fetching icon" : { fr: "Erreur au téléchargement de l'icône" , ja: "アイコンのフェッチエラー", es: "Error al buscar icono" },

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

  "JavaScript licensing information" : { fr: "Informations de licence JavaScript" , ja: "JavaScriptのライセンス情報", es: "Información de licencia de JavaScript" },

  "Send your love to Pétrolette" : { fr: "Aider Pétrolette" , ja: "Pétroletteにあなたの愛を送る", es: "Envíale tu amor a Pétrolette" },

  "Pétrolette needs you" : { fr: "Pétrolette a besoin de vous" , ja: "ペトロレットはあなたを必要としています", es: "Pétrolette te necesita" },

  "Pétrolette is free software. However the development requires" : { fr: "Pétrolette est un logiciel libre. Cependant, le développement demande" , ja: "Pétroletteはフリーソフトウェアです。 ただし、開発には多くの時間と作業が必要です。", es: "Pétrolette es un software gratuito. Sin embargo, el desarrollo requiere" },
  "a lot of time" : { fr: "beaucoup de temps" , ja: "多くの時間", es: "mucho tiempo" },
  "and" : { fr: "et" , ja: "そして", es: "y" },
  "a lot of work" : { fr: "beaucoup de travail" , ja: "多くの作業", es: "mucho trabajo" },

  "In order to keep maintaining Pétrolette and developing her with new features I need your help." : { fr: "Afin de continuer à maintenir la Pétrolette et de la développer avec de nouvelles fonctionnalités, j'ai besoin de votre aide." , ja: "Pétroletteを維持し、新しい機能を維持し続けるために、私はあなたの助けが必要です。", es: "Para mantener el mantenimiento de la Pétrolette y desarrollarla con nuevas características, necesito su ayuda." },
  
  "Please consider to support the Pétrolette project by sending a donation. Even the smallest amount will help a lot." : { fr: "Pensez à soutenir le projet Pétrolette en envoyant un don. Même un tout petit montant aidera beaucoup." , ja: "寄付を送って、ペトロレットプロジェクトを支援することを検討してください。 少量でも大いに役立ちます。", es: "Considere apoyar el proyecto Pétrolette enviando una donación. Incluso la cantidad más pequeña ayudará mucho." },

  "Search prefix" : { fr: "Préfixe de recherche" , ja: "検索プレフィックス", es: "Prefijo de búsqueda" },

  "Restore default" : { fr: "Rétablir défaut" , ja: "デフォルトを復元", es: "Restaurar predet." },

  "Restore default search prefix" : { fr: "Rétablir le préfixe de recherche par défaut" , ja: "デフォルトの検索プレフィックスを復元", es: "Restaurar el prefijo de búsqueda predeterminado" },

  "Restored search prefix to default value" : { fr: "Préfixe de recherche restauré à la valeur par défaut" , ja: "復元された検索プレフィックスをデフォルト値に復元しました", es: "Prefijo de búsqueda restaurado al valor predeterminado" },

  "Search in feeds" : { fr: "Chercher dans les flux" , ja: "フィードで検索します", es: "Búsqueda en fuentes" },

  "Press ENTER to go to last result" : { fr: "Appuyez sur Entrée pour aller au dernier résultat" , ja: "Enterキーを押して最後の結果に移動します", es: "Presione ENTER para ir al último resultado" },


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

  "Donate" : { fr: "Donation" , ja: "寄付する", es: "Donar" },
  "Open" : { fr: "Ouvrir" , ja: "負荷", es: "Carga" },
  "Save" : { fr: "Sauver" , ja: "セーブ", es: "Salvar" },

  "Add" : { fr: "Ajouter" , ja: "追加", es: "Añadir" },

  "Searching" : { fr: "Recherche" , ja: "検索中", es: "Búsqueda" },
  
  "Add feed" : { fr: "Ajouter flux" , ja: "ソースを追加", es: "Agregue fuente" },

  "Add anyway" : { fr: "Ajouter quand même" , ja: "とにかく追加", es: "Agregar de todos modos" },
  
  "Add a column" : { fr: "Ajouter une colonne" , ja: "列を追加する", es: "Agrega una columna" },

  "This field cannot be empty" : { fr: "Ce champ ne peut pas être vide" , ja: "このフィールドを空にすることはできません", es: "Esta entrada de texto no puede estar vacía" },

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

  "Example feeds" : { fr: "Exemples de flux" , ja: "情報源の例", es: "Ejemplos de fuentes" },

  "Data structure OK: %1 tab(s) containing %2 feed(s)" : { fr: "Structure de données OK: %1 onglet(s) contenant %2 flux" , ja: "データ構造OK：%2のソースを含むグループ%1", es: "Estructura de datos OK: %1 grupos que contienen %2 fuentes" },

  "Invalid file" : { fr: "Fichier non valide" , ja: "無効なファイル", es: "Archivo inválido" },

  "DataBase error: %1" : { fr: "Erreur de la Base de Données: %1" , ja: "データベースエラー %1", es: "Error de la base de datos: %1" },

  "This is not a valid Pétrolette feeds file" : { fr: "Ceci n'est pas un fichier de flux Pétrolette valide" , ja: "これは有効なPétroletteフィードファイルではありません", es: "Este no es un archivo de feeds de Pétrolette válido" },

  "Valid Pétrolette feeds file" : { fr: "Fichier de flux Pétrolette valide" , ja: "これは有効なPétroletteフィードファイルです", es: "Archivo de feeds de Pétrolette válido" },

  "Pétrolette can't read this file" : { fr: "Pétrolette ne pavient pas à lire ce fichier", ja: "Pétroletteはこのファイルを読み取ることができません", es: "Pétrolette no puede leer este archivo" },

  "This is a tab. It contains feeds." : { fr: "Ceci est un onglet, qui contient des flux." , ja: "これはタブです。 それはソースを含んでいます。", es: "Esta es una grupo. Contiene fuentes." },

  "Click on a tab to display it ; Click the current/selected tab to change its name and position, drag to move it" : { fr: "Cliquer sur un onglet pour l'afficher ; cliquer sur l'onglet courant pour changer son nom et sa position, glisser / déposer pour le déplacer" , ja: "表示するタブをクリックしてください。 現在/選択されたタブをクリックしてその名前と位置を変更し、ドラッグして移動する", es: "Haga clic en una pestaña para mostrarlo; Haga clic en la pestaña actual / seleccionada para cambiar su nombre y posición, arrastre para moverlo" },

  "That's what it's all about" : { fr: "C'est de ça qu'il s'agit" , ja: "それがすべてです", es: "Eso es lo que se trata" },

  "Location of the feed" : { fr: "Adresse du flux" , ja: "源泉の場所", es: "Ubicación de la fuente" },

  "Keep everything tidy" : { fr: "Tout est bien rangé" , ja: "すべてを整頓してください", es: "Mantenga todo ordenado" },

  "Tab control" : { fr: "Contrôle de l'onglet" , ja: "タブコントロール", es: "Control de pestañas" },

  "Columns" : { fr: "Colonnes" , ja: "列", es: "Columnas" },

  "Click + to add a column, and - to delete it." : { fr: "Cliquez sur + pour ajouter une colonne et - pour la supprimer." , ja: "「+」をクリックして列を追加し、「-」を削除します。", es: "Haga clic en + para agregar una columna, y - para eliminarlo." },

  "Add a new feed" : { fr: "Ajouter un nouveau flux" , ja: "新しいフィードを追加する", es: "Agregar un nuevo fuente" },

  "You are home" : { fr: "Vous êtes chez vous" , ja: "あなたは在宅です", es: "Estás en casa" },

  "Use the menu to configure your Pétrolette." : { fr: "Utilisez le menu pour configurer votre Pétrolette." , ja: "メニューを使用してPétroletteを設定します。", es: "Utilice el menú para configurar su Pétrolette." },

  "Get the latest articles." : { fr: "Voir les derniers articles." , ja: "最新の記事を入手する。", es: "Obtenga los últimos artículos." },
  "B-bye" : { fr: "Au revoir" , ja: "さようなら", es: "Adios" },
  "Grip handle" : { fr: "Poignée" , ja: "グリップハンドル", es: "Mango" },

  "Folded feeds are not loaded at startup, so as to speed things up." : { fr: "Les flux pliés ne sont pas chargés au démarrage, afin d'accélérer les choses." , ja: "折りたたまれたフィードは、処理を高速化するために、起動時に読み込まれません。", es: "Los feeds doblados no se cargan al inicio, para acelerar las cosas." },

  "You can also drag this button to your bookmark toolbar, and click it when you want to add a website to Pétrolette" : { fr: "Vous pouvez également faire glisser ce bouton dans la barre d'outils de votre navigateur et cliquer dessus lorsque vous souhaitez ajouter un site Web à Pétrolette" , ja: "このボタンをブックマークツールバーにドラッグして、Pétroletteにウェブサイトを追加するときにクリックすることもできます", es: "También puede arrastrar este botón a la barra de herramientas de su marcador y hacer clic en él cuando desee agregar un sitio web a Pétrolette." },
  "Add to Pétrolette" : { fr: "Ajouter à Pétrolette" , ja: "Pétroletteに追加", es: "Agregar a Pétrolette" },

  'Drag me to the bookmark bar, or right click "Bookmark this link"' : { fr: 'Glissez-moi dans la barre de favoris, ou clic droit "Marque-page sur ce lien"' , ja: 'ブックマークバーに私をドラッグするか、右クリック"Bookmarkこのリンク"', es: 'Arrastre a la barra de marcadores, o haga clic derecho en "Bookmark este enlace"' },

  "This is an RSS feed." : { fr: "Ceci est un flux RSS." , ja: "これはソースです 詳細情報", es: "Esta es una fuente." },

  "Click this button to add a tab" : { fr: "Cliquez sur ce bouton pour ajouter un onglet" , ja: "グループを追加するには、このボタンをクリックします。", es: "Haga clic en este botón para agregar un grupo" },

  "Source code" : { fr: "Code source" , ja: "ソースコード", es: "Código fuente" },
  "Use the force - read the Source" : { fr: "Utilise la Force, lis le Source" , ja: "力を使って、ソースを読んでください", es: "Usa la fuerza, lee la Fuente" },

  "Source" : { fr: "Source" , ja: "ソース", es: "Fuente" },
  "License" : { fr: "Licence" , ja: "ライセンス", es: "Licencia" },

  "Click to add a feed" : { fr: "Cliquer pour ajouter un flux" , ja: "ソースを追加するにはクリックしてください", es: "Haga clic para agregar una fuente" },

  "Click to add a feed." : { fr: "Cliquer pour ajouter un flux." , ja: "ソースを追加するにはクリックしてください", es: "Haga clic para agregar una fuente." },

  "I think that\'s about it..." : { fr: "Je crois qu'on a fait le tour..." , ja: "私はそれがすべてのことだと思います...", es: "Creo que eso es todo..." },

  "Any questions?" : { fr: "Des questions?" , ja: "質問は？", es: "¿Alguna pregunta?" },

  "Have a nice read ☕ 📰" : { fr: "Bonne lecture ☕ 📰" , ja: "素敵な読書をしてください ☕ 📰", es: "Tener una linda lea ☕ 📰" },

  "Use the menu to configure Pétrolette." : { fr: "Utilisez le menu pour configurer Pétrolette." , ja: "メニューを使用してPétroletteを構成します", es: "Usa el menú para configurar Pétrolette." },

  "Refresh / reload this feed" : { fr: "Actualiser / recharger ce flux" , ja: "このソースを更新/再読み込みしてください。", es: "Actualiza / recarga esta fuente" },

  "feeds loaded" : { fr: "flux chargés" , ja: "ソースが読み込まれました", es: "fuentes cargadas" },

  "Wait! Are you sure?" : { fr: "Stop ! Sur ?" , ja: "待つ！ 本気ですか？", es: "¡Espere! ¿Estás seguro?" },

  "Select this feed (for moving and deletion)." : { fr: "Sélectionnez ce flux (pour le déplacement et la suppression)." , ja: "このソース(移動と削除のために)を選択します。", es: "Seleccione esta fuente (para mover y eliminar)." },
  
  "Grab this handle to move this feed (and all other selected feeds) within this tab, or into another." : { fr: "Attraper cette poignée pour déplacer ce flux (et toutes les autres flux sélectionnés) dans cet onglet ou dans un autre." , ja: "ここでドラッグすると、このグループ内のこのソース（および他のすべての選択されたソース）を別のグループに移動できます。", es: "Arrastre aquí para mover esta fuente (y todas las demás fuentes seleccionadas) dentro de este grupo o dentro de otra." },

  "Fold / unfold this feed" : { fr: "Plier / déplier ce flux" , ja: "このソースを展開/折りたたむ", es: "Expandir / contraer esta fuente" },

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
  "At the next refresh, Pétrolette displays a link to this new article" : { fr: "Lors du prochain rafraîchissement, Pétrolette affiche le lien vers ce nouvel article" , ja: "次の更新時に、Pétroletteはこの記事への新しいリンクを表示します", es: "En la próxima actualización, Pétrolette muestra un enlace a este nuevo artículo." },

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

  "And finally, if you enter anything other than a URL, like the expression «bitcoin crash» or «zombie attack», Pétrolette will build a feed using a free and open feed proxy search engine, which will display the latest news on fluctuations in digital currency (or incidents involving undead) every time you update it." : { fr: "Enfin, si vous entrez autre chose qu'une URL, comme l'expression «crash Bitcoin» ou «attaque zombie», Pétrolette construira un flux en utilisant un moteur de recherche proxy gratuit et open feed, qui affichera les dernières nouvelles sur les fluctuations des crypto-monnaies (ou les incidents impliquant des morts-vivants) chaque fois que vous le mettez à jour." , ja: "最後に、「bitcoinクラッシュ」や「ゾンビ攻撃」のようなURL以外のものを入力すると、Pétroletteは無料でオープンソースのプロキシ検索エンジンを使用してソースを構築し、デジタルの変動に関する最新ニュースを表示します 通貨（またはアンデッドを含むインシデント）を更新するたびに", es: "Y finalmente, si ingresa algo que no sea una URL, como la expresión «accidente de bitcoin» o «ataque zombi», Pétrolette construirá una fuente utilizando un motor de búsqueda de proxy de código abierto y gratuito, que mostrará las últimas noticias sobre las fluctuaciones en moneda (o incidentes relacionados con muertos vivientes) cada vez que la actualice." },

  "If you enter the URL of a valid feed (see «RSS feed» above), such as «https://news.google.com/news/rss/rss» Pétrolette will display it. Now, if you simply enter the URL of a website, like «https://www.rt.com», Pétrolette will try to find the feed of this website and display it. And finally, if you enter anything other than a URL, like the expression «bitcoin crash» or «zombie attack», Pétrolette will build a feed using a free and open feed proxy search engine, which will display the latest news on fluctuations in digital currency (or incidents involving undead) every time you update it." : { fr: "Cliquez sur le bouton «Ajouter un flux» ; si vous entrez l'URL d'un flux valide (voir ci-dessus «flux RSS»), comme, par exemple, «https://news.google.com/news/rss/rss» Pétrolette l'affichera. Maintenant, si vous entrez simplement l'URL d'un site web, comme https://www.rt.com, Pétrolette va essayer de trouver le flux de ce site web et l'afficher. Et enfin, si vous entrez autre chose qu'une URL, comme l'expression «crash bitcoin» ou «attaque zombie», Pétrolette va construire un flux en utilisant un moteur de recherche proxy libre et open feed, qui affichera les dernières nouvelles sur les fluctuations de monnaie numérique (ou des incidents impliquant des morts-vivants) chaque fois que vous l'actualisez." , ja: "[新しいソース]ボタンをクリックします。「https://news.google.com/news/rss/rss」などの有効なソース（上記の「RSSフィード」を参照）のURLを入力すると、Pétroletteに表示されます。 さて、単にhttps://www.rt.comのようなウェブサイトのURLを入力すれば、Pétroletteはこのウェブサイトのソースを見つけようとします。 最後に、「bitcoin crash」や「zombie attack」のようなURL以外のものを入力すると、Pétroletteは無料のオープンソースプロキシ検索エンジンを使用してソースを構築し、デジタルの変動に関する最新ニュースを表示します 通貨（またはアンデッドに関わるインシデント）を更新するたびに更新されます。", es: "Haga clic en el botón **Nueva fuente** ; Si ingresa la URL de una fuente válida (consulte «Alimentación RSS» arriba), como «https://news.google.com/news/rss/rss», Pétrolette lo mostrará. Ahora, si simplemente ingresa la URL de un sitio web, como https://www.rt.com, Pétrolette intentará encontrar el origen de este sitio web y mostrarlo. Y finalmente, si ingresa algo que no sea una URL, como la expresión «accidente de bitcoin» o «ataque de zombie», Pétrolette construirá una fuente utilizando un motor de búsqueda de proxy de código abierto y gratuito, que mostrará las últimas noticias sobre las fluctuaciones en moneda (o incidentes relacionados con muertos vivientes) cada vez que la actualice." },

  "How do I use it?" : { fr: "Comment l'utiliser ?" , ja: "どうやって使うの？", es: "¿Como lo uso?" },

  "Ok, where do I start?" : { fr: "Ok, c'est par où ?" , ja: "さて、私はどこから始めますか？", es: "Ok, ¿por dónde empiezo?" },

  "Pétrolette is a news reader focused on preventing anyone to know what you are reading." : { fr: "Pétrolette est un lecteur d'actualités qui protège votre vie privée en empéchant quiconque de savoir ce que vous lisez. " , ja: "Pétroletteは、あなたが読んでいるものを誰かが知るのを防ぐことに焦点を当てたニュースリーダーです。", es: "Pétrolette es un lector de noticias enfocado en evitar que cualquiera sepa lo que está leyendo." },

  "Learn how to use" : { fr: "Apprenez à utiliser" , ja: "タブとソース、および一般的なPétroletteの使い方を学んでください。", es: "Aprenda cómo usar" },
  "and Pétrolette in general." : { fr: "et Pétrolette en général." , ja: "Pétroletteの使い方を学んでください。", es: "y Pétrolette en general." },
  "the tabs and the feeds" : { fr: "les onglets et les flux" , ja: "フォルダとフィード", es: "las carpetas y las fuentes" },

  "Open / import tabs and feeds" : { fr: "Ouvrir / importer onglets et flux" , ja: "フォルダとフィードを開く/インポートする", es: "Abrir / importar carpetas y canales RSS" },

  "Open / import" : { fr: "Ouvrir / importer" , ja: "開く/インポート", es: "Abrir / importar" },

  "Save / export tabs and feeds" : { fr: "Enregistrer / exporter onglets et flux" , ja: "タブとフィードを保存/エクスポートする", es: "Guardar archivo de carpetas y feeds" },

  "All tabs and feeds restored to defaults" : { fr: "Tous les onglets et flux restaurés aux valeurs par défaut" , ja: "すべてのタブとフィードがデフォルトに復元されました", es: "Todas las pestañas y fuentes restaurados a los valores predeterminados" },

  "Empty feed" : { fr: "Source vide" , ja: "空のソース", es: "fuente vacía" },

  "Load / import a feeds file" : { fr: "Charger / importer un fichier de flux" , ja: "ソースファイルをロード/インポートします", es: "Cargar / Importar un archivo de fuentes" },

  "to append to or replace the existing feeds." : { fr: "pour remplacer les, ou ajouter aux flux existants." , ja: "既存のフィードに追加または交換する。", es: "para anexar o reemplazar las fuentes existentes." },

  "Save / export a feeds file." : { fr: "Sauver / exporter un fichier de flux." , ja: "ソースファイルを保存/エクスポートします。", es: "Guardar / exportar un archivo de fuentes." },

  "Reset Pétrolette with the default feeds." : { fr: "Réinitialiser Pétrolette avec les flux par défaut." , ja: "デフォルトフィードでPétroletteをリセットします。", es: "Restablecer Pétrolette con las fuentes predeterminadas." },

  "Connection to the cloud to synchronize tabs and feeds on all devices." : { fr: "Connexion au nuage pour synchroniser onglets et flux sur plusieurs appareils." , ja: "すべてのデバイスでタブとソースを同期させるためのクラウドへの接続。", es: "Conexión a la nube para sincronizar las pestañas y las fuentes en todos sus dispositivos。" },

  "Preferred Search engine for building search feeds." : { fr: "Moteur de recherche préféré pour la construction de sources de recherche." , ja: "検索ソースを構築するための好ましい検索エンジン。", es: "Motor de búsqueda preferido para la construcción de fuentes de búsqueda." },
  
  "When you click an image, you can view it in a gallery, and start a slideshow." : { fr: "Un clic sur une image l'affiche dans une galerie." , ja: "イメージをクリックすると、ギャラリーでそのイメージを表示し、スライドショーを開始できます", es: "Cuando hace clic en una imagen, puede verla en una galería." },
  
  "Loading of [%1] OK" : { fr: "Lecture de [%1] OK" , ja: "[%1]をロードしました。OK", es: "Cargado [%1] bien" },

  "Connected to remote storage" : { fr: "Connecté au stockage distant" , ja: "リモートストレージに接続", es: "Conectado al almacenamiento remoto" },

  "Not Connected to remote storage" : { fr: "Non connecté au stockage distant" , ja: "リモートストレージに接続されていない", es: "No conectado a almacenamiento remoto" },

  "Disconnection from remote storage" : { fr: "Déconnection du stockage distant" , ja: "リモートストレージから切断されました", es: "Desconectado de almacenamiento remoto" },

  "Synchronize" : { fr: "Synchroniser" , ja: "同期する", es: "Sincronizar" },
  "More info" : { fr: "Plus d'infos" , ja: "詳細情報", es: "Más info" },
  "More info: %1" : { fr: "Plus d'infos: %1" , ja: "詳細情報: %1", es: "Más info: %1" },

  "Connection to storage" : { fr: "Connexion au stockage" , ja: "ストレージへの接続", es: "Conexión al almacenamiento" },

  "Synchronize feeds with a storage of your choice" : { fr: "Synchroniser les flux avec le stockage de votre choix" , ja: "あなたの選択の記憶域でフィードを同期させる", es: "Sincronice las fuentes con un almacenamiento de su elección" },

  "About the remoteStorage protocol" : { fr: "À propos du protocole remoteStorage" , ja: "RemoteStorageプロトコルについて", es: "Sobre el protocolo RemoteStorage" },

  "Synced just now" : { fr: "Synchronisé maintenant" , ja: "今すぐ同期しました", es: "Sincronizado ahora mismo" },

  "To synchronize tabs and feeds across devices" : { fr: "Pour synchroniser onglets et flux entre plusieurs appareils" , ja: "デバイス間でソースを同期するには", es: "Para sincronizar las carpetas y las fuentes en todos los dispositivos" },

  "Remote file validation NOT OK (error [%1]) now reading from browser storage" : { fr: "Validation de fichier à distance NOT OK (erreur [%1]) lecture depuis le stockage du navigateur" , ja: "リモートファイルの検証NOT OK（エラー[%1]）がブラウザのキャッシュから読み込み中です", es: "La validación remota de archivos NO está OK (error [%1]) leyendo desde el caché del navegador" },

  "Reading feeds and preferences from browser storage" : { fr: "Lecture des flux et des préférences depuis le stockage du navigateur" , ja: "ブラウザのキャッシュからソースと設定を読み込む", es: "Leer las fuentes y preferencias de la memoria caché del navegador" },

  "Remote file validation OK" : { fr: "Validation fichier distant OK" , ja: "リモートファイルの検証OK", es: "Validación remota de archivos OK" },

  "Writing to remote storage OK" : { fr: "Ecriture stockage distant OK" , ja: "リモートストレージへの書き込みOK", es: "Escribir almacenamiento remoto OK" },

  "There was a problem writing to remote storage: [%1]" : { fr: "Un problème est survenu lors de l'écriture sur le stockage distant: [%1]" , ja: "リモートストレージへの書き込みに問題がありました：[%1]", es: "Hubo un problema al escribir en el almacenamiento remoto: [%1]" },

  "Problem reading feed [%1] Error type [%2]" : { fr: "Problème lecture flux [%1] Type d'erreur [%2]", ja: "問題の読書の問題[%1]エラータイプ[%2]", es: "Problema al leer la fuente [%1] Tipo de error [%2]" },

  "Error type" : { fr: "Type d'erreur", ja: "エラータイプ", es: "Tipo de error" },

  "Bad server response" : { fr: "Mauvaise réponse du serveur", ja: "バッドサーバーレスポンス", es: "Respuesta de servidor mala" },

  "Not a feed" : { fr: "Source non valide", ja: "無効な情報源", es: "Fuente inválida" },

  "No feed found at this URL" : { fr: "Aucun flux trouvé à cette URL", ja: "このアドレスで見つかったソースなし", es: "No hay fuente encontrada en esta URL" },

  "Main menu" : { fr: "Menu principal", ja: "メインメニュー", es: "Menú principal" },

  // Dialogues
  "Flux: Kill" : { fr: "Feed: Supprimer", ja: "フィード：削除", es: "Flux: Eliminar" },
  "Feed: Parameters" : { fr: "Flux: Paramètres", ja: "フィード：パラメータ", es: "Feed: Parámetros" },
  "Feed type" : { fr: "Type de flux", ja: "フィードの種類", es: "Tipo de flux" },

  "Type" : { fr: "Type", ja: "タイプ", es: "Tipo" },

  "Error" : { fr: "Erreur", ja: "エラー", es: "Error" },

  "error" : { fr: "erreur", ja: "エラー", es: "error" },


  "Mixed" : { fr: "Mixte", ja: "混合", es: "Mezclado" },
  "Image" : { fr: "Image", ja: "画像", es: "Imagen" },
  "Text" : { fr: "Texte", ja: "テキスト", es: "Texto" },
  "Collection" : { fr: "Collection", ja: "コレクション", es: "Colección" },

  "Index" : { fr: "Indice", ja: "インデックス", es: "Índice" },

  "Height" : { fr: "Hauteur", ja: "高さ", es: "Altura" },

  "Number of items displayed in this feed" : { fr: "Nombre d'articles affichés dans ce flux", ja: "このソースの項目数", es: "Número de elementos en este fuente" },

  "Number of feeds" : { fr: "Nombre de flux", ja: "ソース数", es: "Cantidad de fuentes" },

  "Unrecognized URL" : { fr: "URL non reconnue", ja: "認識できないURL", es: "URL no reconocida" },

  "Unrecognized URL: %1" : { fr: "URL non reconnue: %1", ja: "認識できないURL: %1", es: "URL no reconocida: %1" },

  "No feeds found" : { fr: "Aucun flux trouvés", ja: "ソースが見つかりません", es: "No se encontraron fuentes" },

  "Explore!" : { fr: "Exploration !", ja: "探査！", es: "¡Exploración!" },

  "Enter a website address/URL and click search, then OK, or simply enter the URL of the feed and click OK" : { fr: "Entrer l'adresse / URL d'un site Web, puis cliquer sur Rechercher et valider, ou directement l'adresse d'un flux et valider", ja: "ウェブサイトのアドレス/ URLを入力して[検索]をクリックし、次に[OK]をクリックするか、フィードの場所", es: "Ingrese la dirección / URL de un sitio web y haga clic en buscar, luego en Aceptar o ingrese directamente la ubicación del fuente" },


  "Enter a website address/URL and click search, then OK, or simply enter the URL of the" : { fr: "Entrez une adresse / URL de site Web et cliquez sur Rechercher, puis sur OK, ou entrez simplement l'URL du", ja: "ウェブサイトのアドレス/ URLを入力して[検索]、[OK]の順にクリックするか、単にURLを入力します", es: "Ingrese la dirección / URL de un sitio web y haga clic en buscar, luego OK, o simplemente ingrese la URL del" },

  "If what you enter is not a regular URL (an internet location in the form of \"http...\") Pétrolette will build a search feed using the words" : { fr: "Si ce que vous entrez n'est pas une URL (une adresse Internet commençant par \"http ...\"), Pétrolette construira un flux de recherche en utilisant les mots", ja: "入力したものが通常のURLではない場合（ \"HTTP ...\"の形のインターネットの場所）Pétroletteは単語を使って検索フィードを作成します", es: "Si lo que ingresa no es una URL regular (una ubicación en Internet en forma de \"http ...\"), Pétrolette construirá un feed de búsqueda con las palabras" },

  "Find / discover the feed of this website, or build a search feed from the words" : { fr: "Rechercher / découvrir le flux de ce site Web, ou créer un nouveau flux de recherche à partir des termes", ja: "このウェブサイトのフィードを見つけるか、検索用語から新しいフィードを作成してください。", es: "Busque el feed de este sitio web o cree uno nuevo a partir de los términos de búsqueda" },

  "Move the current feed to this tab" : { fr: "Déplacer le flux courant dans cet onglet", ja: "このグループの現在のフィードを移動する", es: "Mueve el fuente actual en este grupo" },

  "Only display text" : { fr: "Affichage du texte seul", ja: "テキストのみを表示する", es: "Mostrar solo texto" },
  "Display text and media (image, audio, video)" : { fr: "Affichage du texte et du média (image, audio, video)", ja: "テキストとメディア（画像、音声、ビデオ）を表示する", es: "Mostrar texto y medios (imagen, audio, video)" },
  "Only display media (image, audio, video)" : { fr: "Affichage du média seul (image, audio, video)", ja: "表示メディア（画像、音声、ビデオ）のみ", es: "Mostrar solo medios (imagen, audio, video)" },

  "Validate /verify this feed file with the W3C" : { fr: "Valider / vérifier ce fichier flux avec le W3C", ja: "このソースファイルをW3Cで検証/検証する", es: "Validar / verificar este archivo fuente con el W3C" },

  "Validate" : { fr: "Valider", ja: "検証", es: "Validar" },

  "Report" : { fr: "Signaler" , ja: "報告する", es: "Reporte" },

  "Report feed error" : { fr: "Signaler un flux en erreur" , ja: "レポートソースエラー", es: "Informe de error de la fuente" },

  "Valid feed found! Now just press OK" : { fr: "Flux valide trouvée ! Maintenant, appuyez simplement sur OK", ja: "有効なソースが見つかりました！ OKを押すだけです", es: "¡Se ha encontrado una fuente válida! Ahora solo presione OK" },

  "Delete tab" : { fr: "Supprimer onglet", ja: "フォルダを削除", es: "Eliminar carpeta" },
  "Delete the [%1] tab" : { fr: "Supprimer l'onglet [%1]" , ja: "本当にこのフォルダを削除しますか？", es: "Eliminar el carpeta [%1]" },
  "Delete this tab and all of its content?" : { fr: "Supprimer cet onglet et tout son contenu ?", ja: "フォルダを削除", es: "¿Eliminar esta pestaña y todo su contenido?" },

  "Edit tab" : { fr: "Modifier onglet", ja: "[編集]タブ", es: "Editar pestaña" },

  "Delete column" : { fr: "Supprimer colonne", ja: "列を削除", es: "Eliminar columna" },
  "Delete this column and all of its content?" : { fr: "Supprimer cette colonne et tout son contenu ?", ja: "この列とそのすべてのコンテンツを削除しますか？", es: "¿Eliminar esta columna y todo su contenido?" },

  "Replace existing feeds with the new ones, or merge them together?" : { fr: "Remplacer les flux existants par les nouveaux ou les fusionner ?" , ja: "既存のフィードを新しいフィードに置き換えますか、それともそれらをマージしますか？", es: "¿ Reemplazar los feeds existentes por los nuevos o fusionarlos ?" },

  "Replace or merge?" : { fr: "Remplacer ou fusionner ?" , ja: "置き換えるかマージしますか？", es: "¿Reemplazar o fusionar?" },

  "Reset tabs and feeds" : { fr: "Réinitialiser onglets et flux" , ja: "タブとソースをリセットする", es: "Restablecer pestañas y fuentes" },
  "Reset all tabs and feeds to defaults?" : { fr: "Réinitialiser tous les onglets et les flux aux valeurs par défaut ?" , ja: "すべてのタブとフィードをデフォルトにリセットします？", es: "¿Restablecer todas las pestañas y fuentes a los valores predeterminados?" },

  "This action cannot be undone." : { fr: "Cette action ne peut pas être annulée.", ja: "このアクションは元に戻せません。", es: "Esta acción no se puede deshacer." },

  "Move this feed" : { fr: "Déplacer ce flux", ja: "このソースを移動する", es: "Mueva esta fuente (%)" },
  "Edit this feed parameters" : { fr: "Modifier les paramètres de ce flux", ja: "このソースパラメータを変更する", es: "Establezca estos parámetros fuente" },
  "Delete this feed" : { fr: "Supprimer ce flux", ja: "本当にこのフィードを削除しますか", es: "Borraste esta feed" },
  "Refresh this feed" : { fr: "Actualiser ce flux", ja: "このソースをリフレッシュしてください", es: "Actualiza esta fuente" },
  "Refresh this feed (%1 - %2)" : { fr: "Actualiser ce flux (%1 - %2)", ja: "このソースをリフレッシュしてください (%1 - %2)", es: "Actualiza esta fuente (%1 - %2)" },
  
  "Select this feed" : { fr: "Sélectionner ce flux", ja: "RSS(%1)フィードを選択", es: "Selecciona este feed" },
  "Configure this feed" : { fr: "Configurer ce flux" , ja: "このソースを設定します", es: "Configura esta fuente" },
  
  "Delete this feed?" : { fr: "Supprimer ce flux ?", ja: "本当にこのフィードを削除しますか？", es: "¿Borraste esta feed?" },
  
  "Delete feed" : { fr: "Supprimer flux" , ja: "このソースを削除してください", es: "Suprímase fuente" },

  "Delete feeds" : { fr: "Supprimer flux" , ja: "ソースの削除", es: "Suprímase las fuentes" },

  "If other feeds are selected, they will be deleted too." : { fr: "Si d'autres flux sont sélectionnés, ils seront supprimés aussi." , ja: "他のソースを選択した場合は、削除されます。", es: "Si se seleccionan otras fuentes, también se eliminarán." },
  
  "Untitled" : { fr: "Sans titre", ja: "無題", es: "Intitulado" },

  "%1 | Click to rename, drag to move" : { fr: "%1 | Cliquer pour renommer, glisser pour déplacer", ja: "%1 | クリックして名前を変更し、ドラッグして再注文します", es: "%1 | Haga clic para cambiar el nombre, arrastre para volver a ordenar" },

  "Fold / unfold this feed (%1)" : { fr: "Plier / déplier ce flux (%1)", ja: "ウーブリール - ファーマー (%1)", es: "Abrir / cerrar esta fuente (%1)" }
};
