MOB.i18n = {
  trans : function(term) {

    // if (MOB.language === 'en') {
    //   return term;
    // } else {
    //   return MOB.i18n.translations[term][MOB.language];
    // }

    var terms = {};
    terms[ MOB.language ] = MOB.tr(term);

    return terms;

  }
};

MOB.i18n.translations = {
  "test" : { fr: "samarche", ja: "追加", es: "Esta Muy bien" },

  "They'll sell the Internet" : { fr: "Ils vendront Internet", ja: "彼らはインターネットを売るだろう", es: "Venderán Internet" },
  "when we're done filling it up" : { fr: "quand on aura fini de le remplir", ja: "私たちがそれを埋めるとき", es: "cuando terminemos de llenarlo" },

  "Cancel": { fr: "Annuler", ja: "取り消す", es: "Cancelar" },
  "Delete": { fr: "Supprimer", ja: "削除", es: "Eliminar" },
  "Name": { fr: "Nom", ja: "姓", es: "Nombre" },
  "Ok": { fr: "Ok", ja: "Ok", es: "Ok" },
  "Menu": { fr: "Menu", ja: "メニュー", es: "Menú" },

  // Pétrolette

  "Whoops, no sources!" : { fr: "Oups, pas de sources!", ja: "うわー、ソースはありません！", es: "¡Ups, sin fuentes!" },
  "Click here to add some." : { fr: "Cliquez ici pour en ajouter.", ja: "いくつか追加するにはここをクリックしてください。", es: "Haga clic aquí para agregar algunos." },
  "Group" : { fr: "Groupe", ja: "グループ", es: "Grupo" },

  "Find the website\'s source, or build a new one from the seach query." : { fr: "Trouver la source du site web, ou construire une source à partir des termes de recherche." , ja: "ウェブサイトのRSSフィードを見つける", es: "Encuentra la fuente RSS del sitio web." },
  "Move this source to another group." : { fr: "Déplacer cette source dans un autre groupe." , ja: "このソースを別のグループに移動する", es: "Mueva esta fuente a otro grupo." },
  "The type of source: It can be all text, all image, or mixed." : { fr: "Quel type de source ? Tout le texte, toute l'image, ou les deux.", ja: "どんな種類の飼料ですか？ すべてのテキスト、すべてのイメージ、または混合。", es: "¿Qué tipo de source? Todo el texto, toda la imagen o mixto." },
  "How many new items should this source display at a time?" : { fr: "Combien de nouveaux articles dans cette source ?", ja: "フィードは一度にいくつ表示する必要がありますか？", es: "¿Cuántos elementos nuevos debería mostrar el source a la vez?" },

  "source" : { fr: "source" , ja: "ソース", es: "fuente" },

  "Source" : { fr: "Source" , ja: "ソース", es: "Fuente" },
  "Sources" : { fr: "Sources" , ja: "ソース", es: "Fuentes" },
  "Groups" : { fr: "Groupes" , ja: "タブ", es: "Grupos" },
  "Theme" : { fr: "Thème" , ja: "テーマ", es: "Tema" },
  "Language" : { fr: "Langue" , ja: "言語", es: "Idioma" },
  "Image gallery" : { fr: "Galerie d'images" , ja: "イメージギャラリー", es: "Galería de imágenes" },
  "Slideshow speed" : { fr: "Vitesse du diaporama" , ja: "スライドショーのスピード", es: "Velocidad de la presentación" },
  "Slide transition" : { fr: "Transition image" , ja: "画像の遷移", es: "Transición de imagen" },
  "Help" : { fr: "Aide" , ja: "助けて", es: "Ayuda" },
  "WtF" : { fr: "Heu" , ja: "一体", es: "Eh" },
  "Pétrolette (really) needs your help" : { fr: "Pétrolette a (vraiment) besoin de votre aide" , ja: "Petrolette（本当に）あなたの助けが必要です", es: "Pétrolette (realmente) necesita tu ayuda" },

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

  "Import" : { fr: "Import" , ja: "インポート", es: "Importar" },
  "Export" : { fr: "Export" , ja: "輸出する", es: "Exportar" },

  "Rename Group" : { fr: "Groupe: Renommer" , ja: "名前の変更タブ", es: "Cambiar el nombre de la grupo" },
  "Add source" : { fr: "Ajouter source" , ja: "ソースを追加", es: "Agregue fuente" },
  "Add sources" : { fr: "Ajouter sources" , ja: "ソースを追加", es: "Agregue fuentes" },
  "Example sources" : { fr: "Exemples de sources" , ja: "情報源の例", es: "Ejemplos de fuentes" },

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

  "This is a group. It contains sources." : { fr: "Ceci est un groupe ; un groupe contient des sources." , ja: "これはタブです。 それはソースを含んでいます。", es: "Esta es una grupo. Contiene fuentes." },

  "Click on a group tab to display it." : { fr: "Cliquer sur l'onglet d'un groupe pour l'afficher." , ja: "グループタブをクリックして表示します。", es: "Haga clic en una pestaña de grupo para mostrarla." },

  "Click on the current/selected group tab to change its name and position." : { fr: "Cliquer sur le groupe sélectionné pour changer son nom et sa position." , ja: "現在の/選択したグループタブをクリックして、名前と位置を変更します。", es: "Haga clic en la pestaña del grupo actual / seleccionado para cambiar su nombre y posición." },

  "This is a source." : { fr: "Ceci est une source." , ja: "これはソースです", es: "Esta es una fuente." },
  "Click this button to add a group." : { fr: "Cliquez sur ce bouton pour ajouter un groupe." , ja: "グループを追加するには、このボタンをクリックします。", es: "Haga clic en este botón para agregar un grupo." },

  "Source code" : { fr: "Code source" , ja: "ソースコード", es: "Código fuente" },

  "Click to add a source." : { fr: "Cliquer pour ajouter une source" , ja: "ソースを追加するにはクリックしてください", es: "Haga clic para agregar una fuente" },

  "Refresh / reload this source." : { fr: "Actualiser / recharger cette source." , ja: "このソースを更新/再読み込みしてください。", es: "Actualiza / recarga esta fuente." },

  "Configure this source." : { fr: "Configurer cette source." , ja: "このソースを設定します。", es: "Configura esta fuente." },

  "Delete this source." : { fr: "Supprimer cette source." , ja: "このソースを削除してください。", es: "Eliminar esta fuente." },

  "Wait! Are you sure?" : { fr: "Stop ! Sur ?" , ja: "待つ！ 本気ですか？", es: "¡Espere! ¿Estás seguro?" },

  "Select this source (for drag & drop)." : { fr: "Sélectionner cette source (pour le glisser-déposer)." , ja: "このソースを選択します（ドラッグ＆ドロップ用）。", es: "Seleccione esta fuente (para arrastrar y soltar)." },
  "Drag here to move this source (and all other selected sources) within this group, or into another." : { fr: "Attraper ici pour déplacer cette source (et toutes les autres sources sélectionnées) dans ce groupe ou dans un autre." , ja: "ここでドラッグすると、このグループ内のこのソース（および他のすべての選択されたソース）を別のグループに移動できます。", es: "Arrastre aquí para mover esta fuente (y todas las demás fuentes seleccionadas) dentro de este grupo o dentro de otra." },

  "Expand / collapse this source." : { fr: "Ouvrir / fermer cette source." , ja: "このソースを展開/折りたたむ。", es: "Expandir / contraer esta fuente." },

  "Pétrolette allows you to sync data with a storage of your choice ; " : { fr: "Synchroniser Pétrolette avec le stockage de votre choix ; " , ja: "Pétroletteでは、選択したストレージにデータを同期させることができます。 ; ", es: "Pétrolette le permite sincronizar datos con un almacenamiento de su elección ; " },

  "Read more." : { fr: "En savoir plus" , ja: "続きを読む。", es: "Lee mas." },

  "Add a source or a group." : { fr: "Ajouter une source ou un groupe." , ja: "ソースまたはグループを追加する", es: "Agrega una fuente o un grupo." },

  "Add a new group" : { fr: "Ajouter un nouveau groupe" , ja: "グループを追加します", es: "Agrega un grupo nuevo" },

  "Add a source" : { fr: "Ajouter une source" , ja: "ソースを追加します", es: "Agrega una fuente" },

  "What exactly is Pétrolette?" : { fr: "Pétrolette, c'est quoi au juste?" , ja: "Pétroletteとは何ですか？", es: "¿Qué es Pétrolette?" },

  "How does it work?" : { fr: "Comment ça marche ?" , ja: "どのように機能するのですか？", es: "¿Como funciona?" },

  "Take the tour" : { fr: "Visite guidée" , ja: "ガイド付き訪問", es: "Visita guiada" },

  "Pétrolette uses a time-tested technology" : { fr: "Pétrolette fonctionne sur une technologie éprouvée" , ja: "Pétroletteは時間を守った技術を使用しています", es: "Pétrolette utiliza una tecnología probada" },

  "Create sources and organize them into groups." : { fr: "Créez des sources et organisez-les en groupes." , ja: "ソースを作成し、それらをグループに編成する。", es: "Crea fuentes y organízalas en grupos." },

  "What is a group?" : { fr: "Qu'est-ce qu'un groupe ?" , ja: "グループとは何ですか？", es: "¿Qué es un grupo?" },

  "Just a container for your sources. Specifically, a tab that you can create, (re)name, move, and delete just like usual." : { fr: "Juste un conteneur pour vos sources ; plus précisément, un onglet que vous pouvez créer, (re) nommer, déplacer et supprimer comme d'habitude." , ja: "あなたのソースのためのちょうど容器。 具体的には、作成したり、名前を変更したり、移動したり、削除したりするタブです。", es: "Solo un contenedor para tus fuentes. Específicamente, una pestaña que puede crear, (re) nombrar, mover y eliminar como siempre." },

  "What is a source?" : { fr: "Qu'est-ce qu'une source ?" , ja: "情報源とは何ですか？", es: "¿Qué es una fuente?" },

  "What is a source? How do I create one?" : { fr: "Qu'est-ce qu'une source ? Comment en créer une ?" , ja: "情報源とは何ですか？ どのように作成するのですか？", es: "¿Qué es una fuente? ¿Cómo creo uno?" },

  "Click the «New source» button." : { fr: "Cliquez sur le bouton «Nouvelle source»." , ja: "«新しいソース»ボタンをクリックします。", es: "¿Qué es una fuente?" },

  "Why didn't I have to register? Where are my groups and sources saved?" : { fr: "Pourquoi n'ai-je pas dû m'inscrire ou me connecter? Où sont sauvegardés mes groupes et mes sources?" , ja: "なぜ私は登録やサインインをしなければならなかったのですか？ 私のグループとソースはどこに保存されていますか？", es: "¿Por qué no tengo que registrarme o iniciar sesión? ¿Dónde se guardan mis grupos y fuentes?" },

  "Your sources are saved in your browser. Go ahead, try to visit http://petrolette.space with another web browser, and you'll see other sources." : { fr: "Vos sources sont enregistrées dans votre navigateur. Allez-y, essayez de visiter http://petrolette.space avec un autre navigateur Web, et vous verrez d'autres sources." , ja: "ソースはブラウザに保存されます。 他のWebブラウザでhttp://petrolette.spaceにアクセスしてみると、他のソースが表示されます。", es: "Tus fuentes se guardan en tu navegador. Adelante, intente visitar http://petrolette.space con otro navegador web, y verá otras fuentes." },

  "How can I view the same sources on all my devices (like my phone)?" : { fr: "Comment voir les mêmes sources sur tous mes appareils (comme mon phone)?" , ja: "私のすべてのデバイス（私の電話のようなもの）に同じソースを表示するにはどうしたらいいですか？", es: "¿Cómo puedo ver las mismas fuentes en todos mis dispositivos (como mi teléfono)?" },

  "Two ways:" : { fr: "Deux méthodes:" , ja: "ふたつのやり方：", es: "Dos caminos:" },

  "Use the «Export» button in the menu to save your sources file, then on the other device, use the «Import» button to load this file." : { fr: "Utilisez le bouton «Exporter» dans le menu pour enregistrer votre fichier source, puis sur l'autre appareil, le bouton «Importer» pour charger ce fichier." , ja: "メニューの«エクスポート»ボタンを使用してソースファイルを保存し、次に他のデバイスに«インポート»ボタンを使用してこのファイルをロードします。", es: "Use el botón «Exportar» en el menú para guardar su archivo de fuentes, luego en el otro dispositivo, use el botón «Importar» para cargar este archivo." },

  "Or (recommended, much easier) use the synchronize button in the main menu to connect to the cloud - 5Apps, DropBox and Google Drive, only 5Apps is enabled on this instance for now, but you should use it anyway as it is FLOSS software - each change you make will then be reflected on all devices." : { fr: "Ou (recommandé, beaucoup plus facile) utilisez le bouton de synchronisation dans le menu principal pour vous connecter au nuage - 5Apps, DropBox et Google Drive, 5Apps seulement est activé sur cette instance pour l'instant, mais vous devriez l'utiliser de toute façon car c'est un logiciel FLOSS - chaque modification que vous effectuez sera répercutée sur tous les appareils." , ja: "メインメニューの同期ボタンを使用してクラウド（5Apps、DropBox、Googleドライブ）に接続すると、現在のところ5Appsのみが有効になっていますが、これはFLOSSソフトウェアと同じように使用する必要があります） あなたが行った変更は、すべてのデバイスに反映されます。", es: "O (recomendado, mucho más fácil) use el botón de sincronización en el menú principal para conectarse a la nube - 5Apps, DropBox y Google Drive, solo 5Apps está habilitado en esta instancia por ahora, pero debe usarlo de todos modos ya que es software FLOSS - cada cambio que realice se reflejará en todos los dispositivos." },

  "If you enter the URL of a valid source (see «RSS feed» above), such as «https://news.google.com/news/rss/rss» Petrolette will display it" : { fr: "Si vous entrez l'URL d'une source valide (voir «Flux RSS» ci-dessus), par exemple «https://news.google.com/news/rss/rss», Petrolette l'affichera" , ja: "«https://news.google.com/news/rss/rss»のような有効なソースのURLを入力すると（上記の«RSSフィード»を参照）、Petroletteはそれを表示します", es: "Si ingresa la URL de una fuente válida (consulte «Alimentación RSS» arriba), como «https://news.google.com/news/rss/rss», Petrolette lo mostrará" },

  "Now, if you simply enter the URL of a website, like «https://www.rt.com», Petrolette will try to find the source of this website and display it" : { fr: "Maintenant, si vous entrez simplement l'URL d'un site Web, comme «https://www.rt.com», Petrolette essaiera de trouver la source de ce site Web et de l'afficher" , ja: "«https://www.rt.com»のようにウェブサイトのURLを入力するだけで、Petroletteはこのウェブサイトのソースを見つけて表示しようとします", es: "Si simplemente ingresa la URL de un sitio web, como «https://www.rt.com», Petrolette intentará encontrar el origen de este sitio web y mostrarlo" },

  "And finally, if you enter anything other than a URL, like the expression «bitcoin crash» or «zombie attack», Petrolette will build a source using a free and open source proxy search engine, which will display the latest news on fluctuations in digital currency (or incidents involving undead) every time you update it" : { fr: "Enfin, si vous entrez autre chose qu'une URL, comme l'expression «crash Bitcoin» ou «attaque zombie», Petrolette construira une source en utilisant un moteur de recherche proxy gratuit et open source, qui affichera les dernières nouvelles sur les fluctuations des devises numérique (ou les incidents impliquant des morts-vivants) chaque fois que vous le mettez à jour" , ja: "最後に、「bitcoinクラッシュ」や「ゾンビ攻撃」のようなURL以外のものを入力すると、Petroletteは無料でオープンソースのプロキシ検索エンジンを使用してソースを構築し、デジタルの変動に関する最新ニュースを表示します 通貨（またはアンデッドを含むインシデント）を更新するたびに", es: "Y finalmente, si ingresa algo que no sea una URL, como la expresión «accidente de bitcoin» o «ataque zombi», Petrolette construirá una fuente utilizando un motor de búsqueda de proxy de código abierto y gratuito, que mostrará las últimas noticias sobre las fluctuaciones en moneda (o incidentes relacionados con muertos vivientes) cada vez que la actualice" },

  "If you enter the URL of a valid source (see «RSS feed» above), such as «https://news.google.com/news/rss/rss» Petrolette will display it. Now, if you simply enter the URL of a website, like «https://www.rt.com», Petrolette will try to find the source of this website and display it. And finally, if you enter anything other than a URL, like the expression «bitcoin crash» or «zombie attack», Petrolette will build a source using a free and open source proxy search engine, which will display the latest news on fluctuations in digital currency (or incidents involving undead) every time you update it." : { fr: "Cliquez sur le bouton «Ajouter une source» ; si vous entrez l'URL d'une source valide (voir ci-dessus «flux RSS»), comme, par exemple, «https://news.google.com/news/rss/rss» Petrolette l'affichera. Maintenant, si vous entrez simplement l'URL d'un site web, comme https://www.rt.com, Pétrolette va essayer de trouver la source de ce site web et l'afficher. Et enfin, si vous entrez autre chose qu'une URL, comme l'expression «crash bitcoin» ou «attaque zombie», Pétrolette va construire une source en utilisant un moteur de recherche proxy libre et open source, qui affichera les dernières nouvelles sur les fluctuations de monnaie numérique (ou des incidents impliquant des morts-vivants) chaque fois que vous l'actualisez." , ja: "[新しいソース]ボタンをクリックします。「https://news.google.com/news/rss/rss」などの有効なソース（上記の「RSSフィード」を参照）のURLを入力すると、Petroletteに表示されます。 さて、単にhttps://www.rt.comのようなウェブサイトのURLを入力すれば、Petroletteはこのウェブサイトのソースを見つけようとします。 最後に、「bitcoin crash」や「zombie attack」のようなURL以外のものを入力すると、Petroletteは無料のオープンソースプロキシ検索エンジンを使用してソースを構築し、デジタルの変動に関する最新ニュースを表示します 通貨（またはアンデッドに関わるインシデント）を更新するたびに更新されます。", es: "Haga clic en el botón **Nueva fuente** ; Si ingresa la URL de una fuente válida (consulte «Alimentación RSS» arriba), como «https://news.google.com/news/rss/rss», Petrolette lo mostrará. Ahora, si simplemente ingresa la URL de un sitio web, como https://www.rt.com, Petrolette intentará encontrar el origen de este sitio web y mostrarlo. Y finalmente, si ingresa algo que no sea una URL, como la expresión «accidente de bitcoin» o «ataque de zombie», Petrolette construirá una fuente utilizando un motor de búsqueda de proxy de código abierto y gratuito, que mostrará las últimas noticias sobre las fluctuaciones en moneda (o incidentes relacionados con muertos vivientes) cada vez que la actualice." },

  "How do I use it?" : { fr: "Comment l'utiliser ?" , ja: "どうやって使うの？", es: "¿Como lo uso?" },

  "Ok, where do I start?" : { fr: "Ok, c'est par où ?" , ja: "さて、私はどこから始めますか？", es: "Ok, ¿por dónde empiezo?" },

  "Pétrolette is a news reader focused on preventing anyone to know what you are reading." : { fr: "Pétrolette est un lecteur d'actualités qui protège votre vie privée en empéchant quiconque de savoir ce que vous lisez. " , ja: "Pétroletteは、あなたが読んでいるものを誰かが知るのを防ぐことに焦点を当てたニュースリーダーです。", es: "Pétrolette es un lector de noticias enfocado en evitar que cualquiera sepa lo que está leyendo." },

  "Learn how to use" : { fr: "Apprenez à utiliser" , ja: "タブとソース、および一般的なPétroletteの使い方を学んでください。", es: "Aprenda cómo usar" },
  "and Pétrolette in general." : { fr: "et Pétrolette en général." , ja: "Pétroletteの使い方を学んでください。", es: "y Pétrolette en general." },
  "the groups and the sources" : { fr: "les groupes et les sources" , ja: "タブとソース", es: "las grupos y las fuentes" },



  // Profile

  "Are you" : { fr: "Es-tu" , ja: "あなたは", es: "¿Eres un" },
  "a FASCIST" : { fr: "un FASCISTE" , ja: "ファシスト", es: "un FASCISTA" },
  "a LEFTIST" : { fr: "un GAUCHISTE" , ja: "左派", es: "un IZQUIERDISTA" },
  "ALL OF THAT" : { fr: "TOUT ÇA À LA FOIS" , ja: "すべての", es: "TODO DE ESO" },
  "NONE OF THAT" : { fr: "RIEN DE TOUT ÇA" , ja: "そのどれも", es: "NADA DE ESO" },
  "What? No" : { fr: "Quoi? Non" , ja: "何？ いいえ", es: "¿Qué? No" },
  "Hell, Yeah" : { fr: "Peste, Ouais" , ja: "地獄、うん。", es: "Diablos, Sí" },
  "Huh, Next question" : { fr: "Euh, Question suivante" , ja: "あ、次の質問", es: "Eh, Siguiente pregunta" },

  "Open / import groups and sources" : { fr: "Ouvrir / importer groupes et sources" , ja: "タブを開く/インポートする", es: "Abrir / importar grupos y canales RSS" },
  "Save / export groups and sources" : { fr: "Enregistrer / exporter groupes et sources" , ja: "タブとフィードの保存/エクスポート", es: "Guardar archivo de groups y sources" },
  "Open group on source drop" : { fr: "Ouvrir nouveau groupe" , ja: "ドロップ時にタブを開く", es: "Abrir grupo en drop" },

  "If this is set, when you drag & drop one or more source(s) in a group, said group opens" : { fr: "Ouvrir le groupe où une source est déposée" , ja: "魔法使いのタブを開いて餌を入れる", es: "Abrir grupo en donde se pone un canal" },

  // Messages d'erreurs
  "View Pétrolette according to the time of day." : { fr: "Voir Pétrolette selon l'heure de la journée." , ja: "時刻に応じてPétroletteを表示する", es: "Ver Pétrolette según la hora del día." },

  "Reset Pétrolette according to your political mood of the week." : { fr: "Réinitialiser Pétrolette selon votre humeur politique de la semaine." , ja: "今週のあなたの政治的な気分に合わせてPétroletteをリセットする", es: "Restablece Pétrolette según tu estado de ánimo político de la semana." },

  "When you click an image, you can view it in a gallery, and start a slideshow." : { fr: "Un clic sur une image l'affiche dans une galerie." , ja: "イメージをクリックすると、ギャラリーでそのイメージを表示し、スライドショーを開始できます", es: "Cuando hace clic en una imagen, puede verla en una galería." },
  "Help Pétrolette according to your spiritual mood of the day." : { fr: "Aider (en vrai) Pétrolette." , ja: "あなたの精神的な日の気分に応じてPétroletteを助けてください", es: "Ayuda a Pétrolette de acuerdo con tu estado de ánimo espiritual del día." },
  "This file is bad" : { fr: "Ce fichier est chelou" , ja: "このファイルは悪いです", es: "Este archivo es malo" },
  "Loading of [%1] OK" : { fr: "Lecture de [%1] OK" , ja: "[%1]をロードしました。OK", es: "Cargado [%1] bien" },
  "Erase all" : { fr: "Tout effacer" , ja: "すべてを消去する", es: "Borrar todo" },

  "You can't create more than %1 resources of each type." : { fr: "Vous ne pouvez pas créer plus de %1 ressources de chaque type.", ja: "各種％以上の財源を作ることはできません。" },
  "Error" : { fr: "Erreur", ja: "エラー", es: "Error" },
  "error" : { fr: "erreur", ja: "エラー", es: "error" },

  "Set Pétrolette preferences/options" : { fr: "Définir les préférences / options de Pétrolette", ja: "ペレットの環境設定/オプションを設定する", es: "Establecer las preferencias / opciones de Pétrolette" },

  // Dialogues
  "Source: Kill" : { fr: "Source: Supprimer", ja: "フィード：削除", es: "Source: Eliminar" },
  "Source: Parameters" : { fr: "Source: Paramètres", ja: "フィード：パラメータ", es: "Source: Parámetros" },
  "Source type" : { fr: "Type de source", ja: "フィードの種類", es: "Tipo de source" },
  "Source group" : { fr: "Groupe de la source", ja: "ソースグループ", es: "Grupo fuente" },

  "Mixed" : { fr: "Mixte", ja: "混合", es: "Mezclado" },
  "Image" : { fr: "Image", ja: "画像", es: "Imagen" },
  "Text" : { fr: "Texte", ja: "テキスト", es: "Texto" },
  "Collection" : { fr: "Collection", ja: "コレクション", es: "Colección" },

  "Number of items" : { fr: "Nombre de titres", ja: "タイトル数", es: "Cantidad de títulos" },
  "Number of sources" : { fr: "Nombre de sources", ja: "ソース数", es: "Cantidad de fuentes" },

  "Just answer the question" : { fr: "Répond juste à la question", ja: "ちょうど質問に答える", es: "Solo responde la pregunta" },

  "Group: Kill" : { fr: "Group: Supprimer", ja: "タブ：削除", es: "Grupo: Eliminar" },
  "Source Location (URL)" : { fr: "Adresse de la source (URL)", ja: "場所（URL）", es: "Ubicación (URL)" },
  "Enter a website address/URL and click search, then OK, or simply enter the URL of the" : { fr: "Entrez l'adresse / URL d'un site Web, puis cliquez sur Rechercher, ou entrez directement l'adresse d'une", ja: "ウェブサイトのアドレス/ URLを入力して[検索]をクリックし、次に[OK]をクリックするか、フィードの場所", es: "Ingrese la dirección / URL de un sitio web y haga clic en buscar, luego en Aceptar o ingrese directamente la ubicación del" },

  "Heck, enter anything, and Pétrolette will build a source from your search query." : { fr: "Bon, entrez n'importe quoi, et Pétrolette construira une source à partir de votre requête de recherche.", ja: "何かを入力すると、Pétroletteは検索クエリからソースを作成します。]をクリックし、次に[OK]をクリックするか、フィードの場所", es: "Diablos, ingrese cualquier cosa, y Pétrolette construirá una fuente a partir de su consulta de búsqueda." },

  "Validate /verify this source file with the W3C" : { fr: "Valider / vérifier ce fichier source avec le W3C", ja: "このソースファイルをW3Cで検証/検証する", es: "Validar / verificar este archivo fuente con el W3C" },

  "No valid source found at this address" : { fr: "Aucune source valide découverte à cette adresse", ja: "このアドレスに有効なソースが見つかりません", es: "No se encontró una fuente válida en esta dirección" },
  "Valid source found! Now just press OK" : { fr: "Source valide trouvée ! Maintenant, appuyez simplement sur OK", ja: "有効なソースが見つかりました！ OKを押すだけです", es: "¡Se ha encontrado una fuente válida! Ahora solo presione OK" },

  // New Content
  "New group" : { fr: "Nouveau groupe", ja: "新しい集団", es: "Nuevo grupo" },
  "New source" : { fr: "Nouvelle source", ja: "新しい情報源", es: "Nueva fuente" },

  "Add news sources" : { fr: "Ajouter des sources d'actualités", ja: "ニュースソースを追加", es: "Agregar fuentes de noticias" },
  "Add misc sources" : { fr: "Ajouter des sources diverses", ja: "その他のソースを追加", es: "Agregar fuentes diferentes" },
  "Delete everything" : { fr: "Tout supprimer", ja: "すべて削除", es: "Elimina todo" },

  // Titres
  "Add a new source to [%1]" : { fr: "Ajouter une source à [%1]", ja: "新しいRSSフィードを追加する", es: "Agregue un nuevo source a [%1]" },

  "Select this source (%1)" : { fr: "Sélectionner cette source (%1)", ja: "RSS(%1)フィードを選択", es: "Selecciona este source (%1)" },
  "Delete this source" : { fr: "Supprimer cette source", ja: "このRSSフィードを削除", es: "Eliminar este source rss" },

  "Delete group" : { fr: "Supprimer groupe", ja: "グループを削除する", es: "Eliminar grupo" },

  "Untitled" : { fr: "Sans titre", ja: "無題", es: "Intitulado" },

  "%1 | Click to rename, drag to move" : { fr: "%1 | Cliquer pour renommer, glisser pour déplacer", ja: "%1 | クリックして名前を変更し、ドラッグして再注文します", es: "%1 | Haga clic para cambiar el nombre, arrastre para volver a ordenar" },
  "Really delete this source? (%1)" : { fr: "Réellement supprimer cette source (%1) ?", ja: "本当にこのフィードを削除しますか？  (%1)", es: "¿Realmente borraste este source? (%1)" },

  "Fold / unfold this source (%1)" : { fr: "Plier / déplier cette source (%1)", ja: "ウーブリール - ファーマー (%1)", es: "Abrir / cerrar esta fuente (%1)" },

  "Move this source (%1)" : { fr: "Déplacer cette source (%1)", ja: "このソースを移動する (%1)", es: "Mueva esta fuente (%)" },

  "Delete this source (%1)" : { fr: "Supprimer cette source (%1)", ja: "本当にこのフィードを削除しますか (%1)", es: "Borraste esta source (%1)" },
  "Delete all" : { fr: "Supprimer tout", ja: "すべて削除", es: "Eliminar todos" },

  "Really delete this group? (%1, %2 sources)" : { fr: "Réellement supprimer ce groupe (%1, %2 sources) ?", ja: "本当にこのタブを削除しますか？ (%1, %2 フィード)", es: "¿Realmente borras esta grupo? (%1, %2 sources)" },
  "Change this source (%1) parameters" : { fr: "Changer les paramètres de cette source (%1)", ja: "このソース（%1）パラメータを変更する", es: "Establezca estos parámetros fuente %1" },
  "Refresh this source (%1)" : { fr: "Actualiser cette source (%1)", ja: "このソースをリフレッシュしてください (%1)", es: "Actualiza esta fuente (%1)" },
  "Last" : { fr: "Dernier", ja: "zz" }
};
