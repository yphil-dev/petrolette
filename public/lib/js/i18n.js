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
    "Ok": { fr: "OK", ja: "OK" },
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

    // Mobylette
    "Feed"   : { fr: "flux" , ja: "RSSフィード" },
    "Feeds"   : { fr: "flux" , ja: "RSSフィード" },
    "Tab"   : { fr: "onglet" , ja: "タブ", es: "Pestaña" },
    "Tabs"   : { fr: "Onglets" , ja: "タブ", es: "Pestañas" },
    "Theme"   : { fr: "Thème" , ja: "テーマ", es: "Tema" },
    "Language"   : { fr: "Langue" , ja: "言語", es: "Idioma" },
    "Image gallery"   : { fr: "Galerie d'images" , ja: "イメージギャラリー", es: "Galería de imágenes" },
    "Slideshow speed"   : { fr: "Vitesse du diaporama" , ja: "スライドショーのスピード", es: "Velocidad de la presentación" },
    "Slide transition"   : { fr: "Transition image" , ja: "画像の遷移", es: "Transición de imagen" },
    "Help"   : { fr: "Aide" , ja: "助けて", es: "Ayuda" },
    "English"   : { fr: "English" , ja: "English", es: "English" },
  "Français"   : { fr: "Français" , ja: "Français", es: "Français" },
  "日本語"   : { fr: "日本語" , ja: "日本語", es: "日本語" },
  "Español"   : { fr: "Español" , ja: "Español", es: "Español" },

  "None"   : { fr: "Aucun" , ja: "なし", es: "Ninguna" },
  "Fade"   : { fr: "Fondu" , ja: "フェード", es: "Descolorarse" },
  "Slide"   : { fr: "Glissé" , ja: "滑り台", es: "Planeo" },
  "Circular"   : { fr: "Circulaire" , ja: "円形", es: "Circular" },
  "Tube"   : { fr: "Tube" , ja: "チューブ", es: "Tubo" },
  "Zoom"   : { fr: "Zoom" , ja: "ズーム", es: "Enfocar" },
  "Rotate"   : { fr: "Rotation" , ja: "回転する", es: "Girar" },

  "Profile"   : { fr: "Profil" , ja: "プロフィール", es: "Perfil" },
  "Donate"   : { fr: "Donation" , ja: "寄付する", es: "Donar" },
  "Load"   : { fr: "Ouvrir" , ja: "負荷", es: "Carga" },
  "Save"   : { fr: "Sauver" , ja: "セーブ", es: "Salvar" },
  "Rename tab"   : { fr: "Onglet: Renommer" , ja: "名前の変更タブ", es: "Cambiar el nombre de la pestaña" },
  "Tab name"   : { fr: "Nom onglet" , ja: "タブ名", es: "Nombre de la pestaña" },
  "Day Theme"   : { fr: "Thème jour" , ja: "日テーマ", es: "Tema del día" },
  "Night Theme"   : { fr: "Thème nuit" , ja: "夜のテーマ", es: "Tema nocturno" },
  "Day"   : { fr: "Jour" , ja: "日", es: "día" },
  "Night"   : { fr: "Nuit" , ja: "夜", es: "Noche" },

  "Open feeds and tabs file"   : { fr: "Importer" , ja: "タブとRSSフィードを保存する", es: "Guardar tabs y feeds" },
  "Save feeds and tabs file"   : { fr: "Enregistrer les onglets et les flux" , ja: "すべてを保存", es: "Guardar archivo de tabs y feeds" },
  "Open tab on feed drop"   : { fr: "Ouvrir nouveau tab" , ja: "ドロップ時にタブを開く", es: "Abrir pestaña en drop" },

  // Messages d'erreurs
  "Mobylette (really) needs your help" : { fr: "Aider (en vrai) Mobylette" , ja: "Mobylette（本当に）あなたの助けが必要です", es: "Mobylette (realmente) necesita tu ayuda" },
  "This file is bad" : { fr: "Ce fichier est chelou" , ja: "このファイルは悪いです", es: "Este archivo es malo" },
  "This file is fine" : { fr: "Ce fichier est parfait" , ja: "このファイルは問題ありません", es: "Este archivo está bien" },
  "Forgot what you are? Reset Mobylette tabs & feeds" : { fr: "Oublié ce que vous êtes? Re-initialiser Mobylette" , ja: "あなたは何かを忘れましたか？ リセットMobylette", es: "Olvidó lo que eres? Restablecer Mobylette" },

  "You can't create more than %1 resources of each type." : { fr: "Vous ne pouvez pas créer plus de %1 ressources de chaque type.", ja: "各種％以上の財源を作ることはできません。" },
  "Error" : { fr: "Erreur", ja: "エラー", es: "Error" },
  "error" : { fr: "erreur", ja: "エラー", es: "error" },

  // Dialogues
  "Feed: Kill" : { fr: "Flux: Supprimer", ja: "フィード：削除", es: "Feed: Eliminar" },
  "Feed: Parameters" : { fr: "Flux: Paramètres", ja: "フィード：パラメータ", es: "Feed: Parámetros" },
  "Feed Type" : { fr: "Type de Flux", ja: "フィードの種類", es: "Tipo de Feed" },
  "What type of feed? All text, all image, or mixed." : { fr: "Quel type de flux? Tout le texte, toute l'image, ou les deux.", ja: "どんな種類の飼料ですか？ すべてのテキスト、すべてのイメージ、または混合。", es: "¿Qué tipo de feed? Todo el texto, toda la imagen o mixto." },

  "Mixed" : { fr: "Mixte", ja: "混合", es: "Mezclado" },
  "Image" : { fr: "Image", ja: "画像", es: "Imagen" },
  "Text" : { fr: "Texte", ja: "テキスト", es: "Texto" },
  "Number of items" : { fr: "Nombre de titres", ja: "タイトル数", es: "Cantidad de títulos" },
  "How many items?" : { fr: "Combien d'articles?", ja: "いくつのアイテムがありますか？", es: "Cuantos articulos?" },
  "Just answer the question" : { fr: "Répond juste à la question", ja: "ちょうど質問に答える", es: "Solo responde la pregunta" },

  "Tab: Kill" : { fr: "Tab: Supprimer", ja: "タブ：削除", es: "Pestaña: Eliminar" },
  "Location (URL)" : { fr: "Adresse (URL)", ja: "場所（URL）", es: "Ubicación (URL)" },
  "Enter a website address/URL and click search, then OK, or simply enter the URL of the" : { fr: "Entrez l'adresse / URL d'un site Web, puis cliquez sur Rechercher, ou entrez directement l'adresse dun", ja: "ウェブサイトのアドレス/ URLを入力して[検索]をクリックし、次に[OK]をクリックするか、フィードの場所", es: "Ingrese la dirección / URL de un sitio web y haga clic en buscar, luego en Aceptar o ingrese directamente la ubicación del" },

  // Titres
  "Add a new feed to [%1]" : { fr: "Ajouter un flux à [%1]", ja: "新しいRSSフィードを追加する", es: "Agregue un nuevo feed a [%1]" },

  "Fold / unfold" : { fr: "Plier / déplier", ja: "ウーブリール - ファーマー", es: "Abrir / cerrar" },
  "Select this feed" : { fr: "Sélectionner ce flux", ja: "RSSフィードを選択", es: "Selecciona este feed" },
  "Delete this feed" : { fr: "Supprimer ce flux", ja: "このRSSフィードを削除", es: "Eliminar este feed rss" },
  "Delete the [%1] tab" : { fr: "Supprimer l'onglet [%1]", ja: "サプリメント [%1]", es: "Eliminar este pestaña [%1]" },
  "%1 | Click to rename, drag to re-order" : { fr: "%1 | Clic pour renommer, glisse pour ranger", ja: "%1 | クリックして名前を変更し、ドラッグして再注文します", es: "%1 | Haga clic para cambiar el nombre, arrastre para volver a ordenar" },
  "Really delete this feed? (%1)" : { fr: "Vraiment supprimer ce flux (%1) ?", ja: "本当にこのフィードを削除しますか？  (%1)", es: "¿Realmente borraste este feed? (%1)" },
  "Really delete this tab? (%1, %2 feeds)" : { fr: "Vraiment supprimer cet onglet (%1, %2 flux) ?", ja: "本当にこのタブを削除しますか？ (%1, %2 フィード)", es: "¿Realmente borras esta pestaña? (%1, %2 feeds)" },

  "Options" : { fr: "Options", ja: "嗜好", es: "Preferencias" },
  "Refresh %1" : { fr: "Rafraîchir %1", ja: "リロード %1", es: "Recargar %1" },

  "plop plop" : { fr: "plip", ja: "ploup", es: "plap" },

  "Last" : { fr: "Dernier", ja: "zz" }
};
