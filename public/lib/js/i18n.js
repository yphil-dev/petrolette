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


  "Add" : { fr: "Ajouter", ja: "追加" },
  "All" : { fr: "Tous", ja: "全て" },
  "From": { fr: "Du", ja: "から" },
  "To": { fr: "Au", ja: "まで" },
  "Cancel": { fr: "Annuler", ja: "取り消す", es: "Cancelar" },
  "Esc": { fr: "Echap", ja: "" },
  "Canceled" : { fr: "Annulé", ja: "取り消し" },
  "Close": { fr: "Clôturer", ja: "閉じる" },
  "Closed": { fr: "Clôturé", ja: "閉じた" },
  "Comment": { fr: "Commentaire", ja: "" },
  "Informations": { fr: "Informations", ja: "コメント" },
  "Complete": { fr: "Terminé", ja: "情報" },
  "Completed": { fr: "Terminé", ja: "終了" },
  "Create": { fr: "Créer", ja: "作成" },
  "Date": { fr: "Date", ja: "日付" },
  "%1 days": { fr: "%1 jours", ja: "%1 日" },
  "Delete": { fr: "Supprimer", ja: "削除", es: "Eliminar" },
  "elements" : { fr: "éléments", ja: "データ？要素" },
  "element" : { fr : "élément", ja: "データ？要素" },
  "End": { fr: "Fin", ja: "最後" },
  "Every" : { fr: "Toutes les", ja: "毎日" },
  "Export": { fr: "Export", ja: "輸出" },
  "Go": { fr: "Aller", ja: "行く" },
  "In progress": { fr: "En cours", ja: "進行中" },
  "Manage": { fr: "Gérer", ja: "管理する" },
  "Mandatory field" : { fr: "Champ obligatoire", ja: "必須事項" },
  "Name": { fr: "Nom", ja: "姓", es: "Nombre" },
  "No" : { fr: "Non", ja: "いいえ" },
  "Ok": { fr: "Ok", ja: "Ok", es: "Ok" },
  "Search": { fr: "Rechercher", ja: "検索" },
  "Time": { fr: "Heure", ja: "時間" },
  "Update": { fr: "Modifier", ja: "変更" },
  "Waiting": { fr: "En attente", ja: "待機中" },
  "Yes" : { fr: "Oui", ja: "はい" },
  "Parameters" : { fr: "Paramètres", ja: "パラメーター・要因" },
  "Configuration" : { fr: "Configuration", ja: "形状" },
  "Reset password" : { fr: "RAZ mot de passe", ja: "パスワードの変更" },
  "<fem>Canceled" : { fr: "Annulée", ja: "取り消し" },
  "<plural>Closed" : { fr: "Clôturés", ja: "終了" },
  "Support" : { fr: "Assistance", ja: "サポート" },
  "Message" : { fr: "Message", ja: "メッセージ" },

  // Petrolette

  "Whoops, no sources!" : { fr: "Oups, pas de sources!", ja: "うわー、ソースはありません！", es: "¡Ups, sin fuentes!" },
  "Click here to add some." : { fr: "Cliquez ici pour en ajouter.", ja: "いくつか追加するにはここをクリックしてください。", es: "Haga clic aquí para agregar algunos." },
  "Group" : { fr: "Groupe", ja: "グループ", es: "Grupo" },

  "Find the website\'s source, or build a new one from the seach query." : { fr: "Trouver la source du site web, ou construire une source à partir des termes de recherche." , ja: "ウェブサイトのRSSフィードを見つける", es: "Encuentra la fuente RSS del sitio web." },
  "Move this source to another group." : { fr: "Déplacer cette source dans un autre groupe." , ja: "このソースを別のグループに移動する", es: "Mueva esta fuente a otro grupo." },
  "The type of source: It can be all text, all image, or mixed." : { fr: "Quel type de source ? Tout le texte, toute l'image, ou les deux.", ja: "どんな種類の飼料ですか？ すべてのテキスト、すべてのイメージ、または混合。", es: "¿Qué tipo de source? Todo el texto, toda la imagen o mixto." },
  "How many new items should this source display at a time?" : { fr: "Combien de nouveaux articles dans cette source ?", ja: "フィードは一度にいくつ表示する必要がありますか？", es: "¿Cuántos elementos nuevos debería mostrar el source a la vez?" },

  "source" : { fr: "source" , ja: "ソース", es: "fuente" },

  "Source" : { fr: "Source" , ja: "RSSフィード", es: "Source" },
  "Sources" : { fr: "source" , ja: "RSSフィード" },
  "Group" : { fr: "groupe" , ja: "タブ", es: "Grupo" },
  "Groups" : { fr: "Groupes" , ja: "タブ", es: "Grupos" },
  "Theme" : { fr: "Thème" , ja: "テーマ", es: "Tema" },
  "Language" : { fr: "Langue" , ja: "言語", es: "Idioma" },
  "Image gallery" : { fr: "Galerie d'images" , ja: "イメージギャラリー", es: "Galería de imágenes" },
  "Slideshow speed" : { fr: "Vitesse du diaporama" , ja: "スライドショーのスピード", es: "Velocidad de la presentación" },
  "Slide transition" : { fr: "Transition image" , ja: "画像の遷移", es: "Transición de imagen" },
  "Help" : { fr: "Aide" , ja: "助けて", es: "Ayuda" },
  "Petrolette?" : { fr: "Pétrolette ?" , ja: "Petrolette?", es: "¿Petrolette?" },

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
  "Click this button to add a source." : { fr: "Cliquez sur ce bouton pour ajouter une source." , ja: "ソースを追加するには、このボタンをクリックします。", es: "Haga clic en este botón para agregar una fuente." },

  "Refresh / reload this source." : { fr: "Actualiser / recharger cette source." , ja: "このソースを更新/再読み込みしてください。", es: "Actualiza / recarga esta fuente." },

  "Configure this source." : { fr: "Configurer cette source." , ja: "このソースを設定します。", es: "Configura esta fuente." },

  "Delete this source." : { fr: "Supprimer cette source." , ja: "このソースを削除してください。", es: "Eliminar esta fuente." },

  "Select this source (for drag & drop)." : { fr: "Sélectionner cette source (pour le glisser-déposer)." , ja: "このソースを選択します（ドラッグ＆ドロップ用）。", es: "Seleccione esta fuente (para arrastrar y soltar)." },
  "Drag here to move this source (and all other selected sources) within this group, or into another." : { fr: "Attraper ici pour déplacer cette source (et toutes les autres sources sélectionnées) dans ce groupe ou dans un autre." , ja: "ここでドラッグすると、このグループ内のこのソース（および他のすべての選択されたソース）を別のグループに移動できます。", es: "Arrastre aquí para mover esta fuente (y todas las demás fuentes seleccionadas) dentro de este grupo o dentro de otra." },

  "Expand / collapse this source." : { fr: "Ouvrir / fermer cette source." , ja: "このソースを展開/折りたたむ。", es: "Expandir / contraer esta fuente." },


  "Add a source or a group." : { fr: "Ajouter une source ou un groupe." , ja: "ソースまたはグループを追加する", es: "Agrega una fuente o un grupo." },
  "What is Petrolette?" : { fr: "Qu'est-ce que Petrolette?" , ja: "Petroletteとは何ですか？", es: "¿Qué es Petrolette?" },
  "How do I use it?" : { fr: "Comment ça marche ?" , ja: "どうやって使うの？", es: "¿Como lo uso?" },
  "Petrolette is your news reader. Find new sources, sort them in categories, you are on the in-ter-net." : { fr: "Petrolette est un lecteur de sources. Trouver de nouvelles sources, les trier dans les catégories, c'est l'in-ter-net." , ja: "Petroletteはあなたのニュースリーダーです。 新しいソースを見つけ、カテゴリで並べ替え、あなたはインターネット上にいます。", es: "Petrolette es tu lector de noticias. Encuentra nuevas fuentes, clasifícalas en categorías, estás en la red interna." },
  "Learn how to use <a id='aide-un' href='#'>the groups and the sources, and Petrolette in general." : { fr: "Apprenez à utiliser <a id='aide-un' href='#'>les groupes et les sources</a>, et Petrolette en général." , ja: "タブとソース、および一般的なPetroletteの使い方を学んでください。", es: "Aprenda cómo usar <a id='aide-un' href='#'>las grupos y las fuentes</a>, y Petrolette en general." },
  "Learn how to use" : { fr: "Apprenez à utiliser" , ja: "タブとソース、および一般的なPetroletteの使い方を学んでください。", es: "Aprenda cómo usar" },
  "and Petrolette in general." : { fr: "et Petrolette en général." , ja: "Petroletteの使い方を学んでください。", es: "y Petrolette en general." },
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
  "Save / Export groups and sources" : { fr: "Enregistrer / exporter groupes et sources" , ja: "タブとフィードの保存/エクスポート", es: "Guardar archivo de groups y sources" },
  "Open group on source drop" : { fr: "Ouvrir nouveau groupe" , ja: "ドロップ時にタブを開く", es: "Abrir grupo en drop" },

  "If this is set, when you drag & drop one or more source(s) in a group, said group opens" : { fr: "Ouvrir le groupe où une source est déposée" , ja: "魔法使いのタブを開いて餌を入れる", es: "Abrir grupo en donde se pone un canal" },

  // Messages d'erreurs
  "View Petrolette according to the time of day." : { fr: "Voir Petrolette selon l'heure de la journée." , ja: "時刻に応じてPetroletteを表示する", es: "Ver Petrolette según la hora del día." },

  "Reset Petrolette according to your political mood of the week." : { fr: "Réinitialiser Petrolette selon votre humeur politique de la semaine." , ja: "今週のあなたの政治的な気分に合わせてPetroletteをリセットする", es: "Restablece Petrolette según tu estado de ánimo político de la semana." },

  "When you click an image, you can view it in a gallery, and start a slideshow." : { fr: "Un clic sur une image l'affiche dans une galerie." , ja: "イメージをクリックすると、ギャラリーでそのイメージを表示し、スライドショーを開始できます", es: "Cuando hace clic en una imagen, puede verla en una galería." },
  "Help Petrolette according to your spiritual mood of the day." : { fr: "Aider (en vrai) Petrolette." , ja: "あなたの精神的な日の気分に応じてPetroletteを助けてください", es: "Ayuda a Petrolette de acuerdo con tu estado de ánimo espiritual del día." },
  "This file is bad" : { fr: "Ce fichier est chelou" , ja: "このファイルは悪いです", es: "Este archivo es malo" },
  "Loading of [%1] OK" : { fr: "Lecture de [%1] OK" , ja: "[%1]をロードしました。OK", es: "Cargado [%1] bien" },
  "Forgot what you are? Reset Petrolette groups & sources" : { fr: "Oublié ce que vous êtes? Re-initialiser Petrolette" , ja: "あなたは何かを忘れましたか？ リセットPetrolette", es: "Olvidó lo que eres? Restablecer Petrolette" },
  "Erase all" : { fr: "Tout effacer" , ja: "すべてを消去する", es: "Borrar todo" },

  "You can't create more than %1 resources of each type." : { fr: "Vous ne pouvez pas créer plus de %1 ressources de chaque type.", ja: "各種％以上の財源を作ることはできません。" },
  "Error" : { fr: "Erreur", ja: "エラー", es: "Error" },
  "error" : { fr: "erreur", ja: "エラー", es: "error" },

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

  "Fold / unfold" : { fr: "Plier / déplier", ja: "ウーブリール - ファーマー", es: "Abrir / cerrar" },

  "Move source" : { fr: "Déplacer cette source", ja: "このソースを移動する", es: "Mueva esta fuente" },

  "Select this source" : { fr: "Sélectionner cette source", ja: "RSSフィードを選択", es: "Selecciona este source" },
  "Delete this source" : { fr: "Supprimer cette source", ja: "このRSSフィードを削除", es: "Eliminar este source rss" },

  "Refresh %1" : { fr: "Rafraichir %1", ja: "％1をリロードする", es: "Recarga %1" },

  "Delete group" : { fr: "Supprimer groupe", ja: "グループを削除する", es: "Eliminar grupo" },
  "%1 | Click to rename, drag to re-order" : { fr: "%1 | Clic pour renommer, glisse pour ranger", ja: "%1 | クリックして名前を変更し、ドラッグして再注文します", es: "%1 | Haga clic para cambiar el nombre, arrastre para volver a ordenar" },
  "Really delete this source? (%1)" : { fr: "Réellement supprimer cette source (%1) ?", ja: "本当にこのフィードを削除しますか？  (%1)", es: "¿Realmente borraste este source? (%1)" },
  "Delete source" : { fr: "Supprimer source", ja: "本当にこのフィードを削除しますか", es: "Borraste source" },
  "Delete all" : { fr: "Supprimer tout", ja: "すべて削除", es: "Eliminar todos" },

  "Really delete this group? (%1, %2 sources)" : { fr: "Réellement supprimer ce groupe (%1, %2 sources) ?", ja: "本当にこのタブを削除しますか？ (%1, %2 フィード)", es: "¿Realmente borras esta grupo? (%1, %2 sources)" },
  "Options" : { fr: "Options", ja: "嗜好", es: "Preferencias" },
  "Refresh %1" : { fr: "Rafraîchir %1", ja: "リロード %1", es: "Recargar %1" },
  "Last" : { fr: "Dernier", ja: "zz" }
};
