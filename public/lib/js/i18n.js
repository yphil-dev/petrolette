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
  "Cancel": { fr: "Annuler", ja: "取り消す" },
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
  "Delete": { fr: "Supprimer", ja: "削除" },
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
  "Tab"   : { fr: "onglet" , ja: "タブ" },
  "Tabs"   : { fr: "onglets" , ja: "タブ" },
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
  "Mobylette (really) needs your help"   : { fr: "Aider (en vrai) Mobylette" , ja: "Mobylette（本当に）あなたの助けが必要です", es: "Mobylette (realmente) necesita tu ayuda" },

  "Forgot what you are? Reset Mobylette tabs & feeds"   : { fr: "Oublié ce que vous êtes? Re-initialiser Mobylette" , ja: "あなたは何かを忘れましたか？ リセットMobylette", es: "Olvidó lo que eres? Restablecer Mobylette" },

  "You can't create more than %1 resources of each type." : { fr: "Vous ne pouvez pas créer plus de %1 ressources de chaque type.", ja: "各種％以上の財源を作ることはできません。" },
  "Error" : { fr: "Erreur", ja: "エラー", es: "Error" },

  // Titres
  "Add a new feed to %1" : { fr: "Ajouter un flux à %1", ja: "新しいRSSフィードを追加する", es: "Agregue un nuevo feed a %1" },

  "Fold / unfold" : { fr: "Plier / déplier", ja: "ウーブリール - ファーマー", es: "Abrir / cerrar" },
  "Select this feed" : { fr: "Sélectionner ce flux", ja: "RSSフィードを選択", es: "Selecciona este feed" },
  "Delete this feed" : { fr: "Supprimer ce flux", ja: "このRSSフィードを削除", es: "Eliminar este feed rss" },
  "Options" : { fr: "Options", ja: "嗜好", es: "Preferencias" },
  "Refresh" : { fr: "Rafraîchir", ja: "リロード", es: "Recargar" },

  "plop plop" : { fr: "plip", ja: "ploup", es: "plap" },

  "Last" : { fr: "Dernier", ja: "zz" }
};
