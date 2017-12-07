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
  "Name": { fr: "Nom", ja: "姓" },
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
  "Contact the WAPLANNER support" : { fr: "Contactez l'assistance WAPLANNER", ja: "ＷＡＰＬＡＮＮＥＲサポートへの連絡" },
  "Message" : { fr: "Message", ja: "メッセージ" },

  // Petrolette
  "Find the website\'s RSS source" : { fr: "Trouver la source du site web" , ja: "ウェブサイトのRSSフィードを見つける", es: "Encuentra la fuente RSS del sitio web" },
  "source" : { fr: "source" , ja: "ソース", es: "source" },

  "Source" : { fr: "Source" , ja: "RSSフィード", es: "Source" },
  "Sources" : { fr: "source" , ja: "RSSフィード" },
  "Tab" : { fr: "onglet" , ja: "タブ", es: "Pestaña" },
  "Tabs" : { fr: "Onglets" , ja: "タブ", es: "Pestañas" },
  "Theme" : { fr: "Thème" , ja: "テーマ", es: "Tema" },
  "Language" : { fr: "Langue" , ja: "言語", es: "Idioma" },
  "Image gallery" : { fr: "Galerie d'images" , ja: "イメージギャラリー", es: "Galería de imágenes" },
  "Slideshow speed" : { fr: "Vitesse du diaporama" , ja: "スライドショーのスピード", es: "Velocidad de la presentación" },
  "Slide transition" : { fr: "Transition image" , ja: "画像の遷移", es: "Transición de imagen" },
  "Help" : { fr: "Aide" , ja: "助けて", es: "Ayuda" },
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
  "Rename tab" : { fr: "Onglet: Renommer" , ja: "名前の変更タブ", es: "Cambiar el nombre de la pestaña" },
  "Tab name" : { fr: "Nom onglet" , ja: "タブ名", es: "Nombre de la pestaña" },
  "Day theme" : { fr: "Thème jour" , ja: "日テーマ", es: "Tema del día" },
  "Night theme" : { fr: "Thème nuit" , ja: "夜のテーマ", es: "Tema nocturno" },
  "Day" : { fr: "Jour" , ja: "日", es: "día" },
  "Night" : { fr: "Nuit" , ja: "夜", es: "Noche" },

  // Profile

  "Are you" : { fr: "Es-tu" , ja: "あなたは", es: "¿Eres un" },
  "a FASCIST" : { fr: "un FASCISTE" , ja: "ファシスト", es: "un FASCISTA" },
  "a LEFTIST" : { fr: "un GAUCHISTE" , ja: "左派", es: "un IZQUIERDISTA" },
  "ALL OF THAT" : { fr: "TOUT ÇA À LA FOIS" , ja: "すべての", es: "TODO DE ESO" },
  "NONE OF THAT" : { fr: "RIEN DE TOUT ÇA" , ja: "そのどれも", es: "NADA DE ESO" },
  "What? No" : { fr: "Quoi? Non" , ja: "何？ いいえ", es: "¿Qué? No" },
  "Hell, Yeah" : { fr: "Peste, Ouais" , ja: "地獄、うん。", es: "Diablos, Sí" },
  "Huh, Next question" : { fr: "Euh, Question suivante" , ja: "あ、次の質問", es: "Eh, Siguiente pregunta" },

  "Open / import tabs and sources." : { fr: "Ouvrir / importer les onglets et les source." , ja: "タブを開く/インポートする", es: "Abrir / importar pestañas y canales RSS." },
  "Save / Export tabs and sources." : { fr: "Enregistrer / exporter les onglets et les source." , ja: "タブとフィードの保存/エクスポート", es: "Guardar archivo de tabs y sources." },
  "Open tab on source drop." : { fr: "Ouvrir nouveau tab." , ja: "ドロップ時にタブを開く", es: "Abrir pestaña en drop." },

  "If this is set, when you drag & drop one or more source(s) in a tab, said tab opens." : { fr: "Ouvrir l'onglet où un source est déposé." , ja: "魔法使いのタブを開いて餌を入れる", es: "Abrir pestaña en donde se pone un canal." },

  // Messages d'erreurs
  "View Petrolette according to the time of day." : { fr: "Voir Petrolette selon l'heure de la journée." , ja: "時刻に応じてPetroletteを表示する", es: "Ver Petrolette según la hora del día." },

  "Reset Petrolette according to your political mood of the week." : { fr: "Réinitialiser Petrolette selon votre humeur politique de la semaine." , ja: "今週のあなたの政治的な気分に合わせてPetroletteをリセットする", es: "Restablece Petrolette según tu estado de ánimo político de la semana." },

  "When you click an image, you can view it in a gallery, and start a slideshow." : { fr: "Un clic sur une image l'affiche dans une galerie." , ja: "イメージをクリックすると、ギャラリーでそのイメージを表示し、スライドショーを開始できます", es: "Cuando hace clic en una imagen, puede verla en una galería." },
  "Help Petrolette according to your spiritual mood of the day." : { fr: "Aider (en vrai) Petrolette." , ja: "あなたの精神的な日の気分に応じてPetroletteを助けてください", es: "Ayuda a Petrolette de acuerdo con tu estado de ánimo espiritual del día." },
  "This file is bad" : { fr: "Ce fichier est chelou" , ja: "このファイルは悪いです", es: "Este archivo es malo" },
  "Loaded petrolette.json OK" : { fr: "Ouverture de petrolette.json OK" , ja: "このファイルは問題ありません", es: "Este archivo está bien" },
  "Forgot what you are? Reset Petrolette tabs & sources" : { fr: "Oublié ce que vous êtes? Re-initialiser Petrolette" , ja: "あなたは何かを忘れましたか？ リセットPetrolette", es: "Olvidó lo que eres? Restablecer Petrolette" },

  "You can't create more than %1 resources of each type." : { fr: "Vous ne pouvez pas créer plus de %1 ressources de chaque type.", ja: "各種％以上の財源を作ることはできません。" },
  "Error" : { fr: "Erreur", ja: "エラー", es: "Error" },
  "error" : { fr: "erreur", ja: "エラー", es: "error" },

  // Dialogues
  "Source: Kill" : { fr: "Source: Supprimer", ja: "フィード：削除", es: "Source: Eliminar" },
  "Source: Parameters" : { fr: "Source: Paramètres", ja: "フィード：パラメータ", es: "Source: Parámetros" },
  "Source Type" : { fr: "Type de Source", ja: "フィードの種類", es: "Tipo de Source" },
  "What type of source? All text, all image, or mixed" : { fr: "Quel type de source? Tout le texte, toute l'image, ou les deux", ja: "どんな種類の飼料ですか？ すべてのテキスト、すべてのイメージ、または混合。", es: "¿Qué tipo de source? Todo el texto, toda la imagen o mixto" },

  "Mixed" : { fr: "Mixte", ja: "混合", es: "Mezclado" },
  "Image" : { fr: "Image", ja: "画像", es: "Imagen" },
  "Text" : { fr: "Texte", ja: "テキスト", es: "Texto" },
  "Number of items" : { fr: "Nombre de titres", ja: "タイトル数", es: "Cantidad de títulos" },
  "How many new items should the source display at a time?" : { fr: "Combien de nouveaux articles cette source peut-elle contenir?", ja: "フィードは一度にいくつ表示する必要がありますか？", es: "¿Cuántos elementos nuevos debería mostrar el source a la vez?" },
  "Just answer the question" : { fr: "Répond juste à la question", ja: "ちょうど質問に答える", es: "Solo responde la pregunta" },

  "Tab: Kill" : { fr: "Tab: Supprimer", ja: "タブ：削除", es: "Pestaña: Eliminar" },
  "Source Location (URL)" : { fr: "Adresse de la source (URL)", ja: "場所（URL）", es: "Ubicación (URL)" },
  "Enter a website address/URL and click search, then OK, or simply enter the URL of the" : { fr: "Entrez l'adresse / URL d'un site Web, puis cliquez sur Rechercher, ou entrez directement l'adresse dun", ja: "ウェブサイトのアドレス/ URLを入力して[検索]をクリックし、次に[OK]をクリックするか、フィードの場所", es: "Ingrese la dirección / URL de un sitio web y haga clic en buscar, luego en Aceptar o ingrese directamente la ubicación del" },

  "Enter a website address/URL and click search, then OK, or simply enter the URL of the source" : { fr: "Entrez l'adresse / URL d'un site Web, puis cliquez sur Rechercher, ou entrez directement l'adresse d'un source", ja: "ウェブサイトのアドレス/ URLを入力して検索をクリックするか、フィードのアドレスを入力するだけです", es: "Ingrese la dirección / URL de un sitio web y haga clic en buscar, o ingrese directamente la ubicación del source" },

  // Titres
  "Add a new source to [%1]" : { fr: "Ajouter un source à [%1]", ja: "新しいRSSフィードを追加する", es: "Agregue un nuevo source a [%1]" },

  "Fold / unfold" : { fr: "Plier / déplier", ja: "ウーブリール - ファーマー", es: "Abrir / cerrar" },
  "Select this source" : { fr: "Sélectionner cette source", ja: "RSSフィードを選択", es: "Selecciona este source" },
  "Delete this source" : { fr: "Supprimer cette source", ja: "このRSSフィードを削除", es: "Eliminar este source rss" },
  "Delete the [%1] tab" : { fr: "Supprimer l'onglet [%1]", ja: "サプリメント [%1]", es: "Eliminar este pestaña [%1]" },
  "%1 | Click to rename, drag to re-order" : { fr: "%1 | Clic pour renommer, glisse pour ranger", ja: "%1 | クリックして名前を変更し、ドラッグして再注文します", es: "%1 | Haga clic para cambiar el nombre, arrastre para volver a ordenar" },
  "Really delete this source? (%1)" : { fr: "Réellement supprimer cette source (%1) ?", ja: "本当にこのフィードを削除しますか？  (%1)", es: "¿Realmente borraste este source? (%1)" },
  "Really delete this tab? (%1, %2 sources)" : { fr: "Réellement supprimer cet onglet (%1, %2 source) ?", ja: "本当にこのタブを削除しますか？ (%1, %2 フィード)", es: "¿Realmente borras esta pestaña? (%1, %2 sources)" },

  "Options" : { fr: "Options", ja: "嗜好", es: "Preferencias" },
  "Refresh %1" : { fr: "Rafraîchir %1", ja: "リロード %1", es: "Recargar %1" },

  "plop plop" : { fr: "plip", ja: "ploup", es: "plap" },

  "Last" : { fr: "Dernier", ja: "zz" }
};
