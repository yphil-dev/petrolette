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
  "test" : { fr: "samarche", ja: "è¿½åŠ ", es: "Esta Muy bien" },

  "Add" : { fr: "Ajouter", ja: "è¿½åŠ " },
  "All" : { fr: "Tous", ja: "å…¨ã¦" },
  "From": { fr: "Du", ja: "ã‹ã‚‰" },
  "To": { fr: "Au", ja: "ã¾ã§" },
  "Cancel": { fr: "Annuler", ja: "å–ã‚Šæ¶ˆã™", es: "Cancelar" },
  "Esc": { fr: "Echap", ja: "" },
  "Canceled" : { fr: "AnnulÃ©", ja: "å–ã‚Šæ¶ˆã—" },
  "Close": { fr: "ClÃ´turer", ja: "é–‰ã˜ã‚‹" },
  "Closed": { fr: "ClÃ´turÃ©", ja: "é–‰ã˜ãŸ" },
  "Comment": { fr: "Commentaire", ja: "" },
  "Informations": { fr: "Informations", ja: "ã‚³ãƒ¡ãƒ³ãƒˆ" },
  "Complete": { fr: "TerminÃ©", ja: "æƒ…å ±" },
  "Completed": { fr: "TerminÃ©", ja: "çµ‚äº†" },
  "Create": { fr: "CrÃ©er", ja: "ä½œæˆ" },
  "Date": { fr: "Date", ja: "æ—¥ä»˜" },
  "%1 days": { fr: "%1 jours", ja: "%1 æ—¥" },
  "Delete": { fr: "Supprimer", ja: "å‰Šé™¤", es: "Eliminar" },
  "elements" : { fr: "Ã©lÃ©ments", ja: "ãƒ‡ãƒ¼ã‚¿ï¼Ÿè¦ç´ " },
  "element" : { fr : "Ã©lÃ©ment", ja: "ãƒ‡ãƒ¼ã‚¿ï¼Ÿè¦ç´ " },
  "End": { fr: "Fin", ja: "æœ€å¾Œ" },
  "Every" : { fr: "Toutes les", ja: "æ¯Žæ—¥" },
  "Export": { fr: "Export", ja: "è¼¸å‡º" },
  "Go": { fr: "Aller", ja: "è¡Œã" },
  "In progress": { fr: "En cours", ja: "é€²è¡Œä¸­" },
  "Manage": { fr: "GÃ©rer", ja: "ç®¡ç†ã™ã‚‹" },
  "Mandatory field" : { fr: "Champ obligatoire", ja: "å¿…é ˆäº‹é …" },
  "Name": { fr: "Nom", ja: "å§“", es: "Nombre" },
  "No" : { fr: "Non", ja: "ã„ã„ãˆ" },
  "Ok": { fr: "Ok", ja: "Ok", es: "Ok" },
  "Search": { fr: "Rechercher", ja: "æ¤œç´¢" },
  "Time": { fr: "Heure", ja: "æ™‚é–“" },
  "Update": { fr: "Modifier", ja: "å¤‰æ›´" },
  "Waiting": { fr: "En attente", ja: "å¾…æ©Ÿä¸­" },
  "Yes" : { fr: "Oui", ja: "ã¯ã„" },
  "Parameters" : { fr: "ParamÃ¨tres", ja: "ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ãƒ¼ãƒ»è¦å› " },
  "Configuration" : { fr: "Configuration", ja: "å½¢çŠ¶" },
  "Reset password" : { fr: "RAZ mot de passe", ja: "ãƒ‘ã‚¹ãƒ¯ãƒ¼ãƒ‰ã®å¤‰æ›´" },
  "<fem>Canceled" : { fr: "AnnulÃ©e", ja: "å–ã‚Šæ¶ˆã—" },
  "<plural>Closed" : { fr: "ClÃ´turÃ©s", ja: "çµ‚äº†" },
  "Support" : { fr: "Assistance", ja: "ã‚µãƒãƒ¼ãƒˆ" },
  "Contact the WAPLANNER support" : { fr: "Contactez l'assistance WAPLANNER", ja: "ï¼·ï¼¡ï¼°ï¼¬ï¼¡ï¼®ï¼®ï¼¥ï¼²ã‚µãƒãƒ¼ãƒˆã¸ã®é€£çµ¡" },
  "Message" : { fr: "Message", ja: "ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸" },

  // Petrolette
  "Find the website\'s source" : { fr: "Trouver la source du site web" , ja: "ã‚¦ã‚§ãƒ–ã‚µã‚¤ãƒˆã®RSSãƒ•ã‚£ãƒ¼ãƒ‰ã‚’è¦‹ã¤ã‘ã‚‹", es: "Encuentra la fuente RSS del sitio web" },
  "Move this source to another group" : { fr: "DÃ©placer cette source dans un autre groupe" , ja: "ã“ã®ã‚½ãƒ¼ã‚¹ã‚’åˆ¥ã®ã‚°ãƒ«ãƒ¼ãƒ—ã«ç§»å‹•ã™ã‚‹", es: "Mueva esta fuente a otro grupo" },
  "What type of source? All text, all image, or mixed" : { fr: "Quel type de source? Tout le texte, toute l'image, ou les deux", ja: "ã©ã‚“ãªç¨®é¡žã®é£¼æ–™ã§ã™ã‹ï¼Ÿ ã™ã¹ã¦ã®ãƒ†ã‚­ã‚¹ãƒˆã€ã™ã¹ã¦ã®ã‚¤ãƒ¡ãƒ¼ã‚¸ã€ã¾ãŸã¯æ··åˆã€‚", es: "Â¿QuÃ© tipo de source? Todo el texto, toda la imagen o mixto" },
  "How many new items should this source display at a time?" : { fr: "Combien de nouveaux articles cette source peut-elle contenir?", ja: "ãƒ•ã‚£ãƒ¼ãƒ‰ã¯ä¸€åº¦ã«ã„ãã¤è¡¨ç¤ºã™ã‚‹å¿…è¦ãŒã‚ã‚Šã¾ã™ã‹ï¼Ÿ", es: "Â¿CuÃ¡ntos elementos nuevos deberÃ­a mostrar el source a la vez?" },

  "source" : { fr: "source" , ja: "ã‚½ãƒ¼ã‚¹", es: "source" },

  "Source" : { fr: "Source" , ja: "RSSãƒ•ã‚£ãƒ¼ãƒ‰", es: "Source" },
  "Sources" : { fr: "source" , ja: "RSSãƒ•ã‚£ãƒ¼ãƒ‰" },
  "Group" : { fr: "groupe" , ja: "ã‚¿ãƒ–", es: "Grupo" },
  "Groups" : { fr: "Groupes" , ja: "ã‚¿ãƒ–", es: "Grupos" },
  "Theme" : { fr: "ThÃ¨me" , ja: "ãƒ†ãƒ¼ãƒž", es: "Tema" },
  "Language" : { fr: "Langue" , ja: "è¨€èªž", es: "Idioma" },
  "Image gallery" : { fr: "Galerie d'images" , ja: "ã‚¤ãƒ¡ãƒ¼ã‚¸ã‚®ãƒ£ãƒ©ãƒªãƒ¼", es: "GalerÃ­a de imÃ¡genes" },
  "Slideshow speed" : { fr: "Vitesse du diaporama" , ja: "ã‚¹ãƒ©ã‚¤ãƒ‰ã‚·ãƒ§ãƒ¼ã®ã‚¹ãƒ”ãƒ¼ãƒ‰", es: "Velocidad de la presentaciÃ³n" },
  "Slide transition" : { fr: "Transition image" , ja: "ç”»åƒã®é·ç§»", es: "TransiciÃ³n de imagen" },
  "Help" : { fr: "Aide" , ja: "åŠ©ã‘ã¦", es: "Ayuda" },
  "Petrolette?" : { fr: "PÃ©trolette ?" , ja: "Petrolette?", es: "Â¿Petrolette?" },

  "English" : { fr: "English" , ja: "English", es: "English" },
  "FranÃ§ais" : { fr: "FranÃ§ais" , ja: "FranÃ§ais", es: "FranÃ§ais" },
  "æ—¥æœ¬èªž" : { fr: "æ—¥æœ¬èªž" , ja: "æ—¥æœ¬èªž", es: "æ—¥æœ¬èªž" },
  "EspaÃ±ol" : { fr: "EspaÃ±ol" , ja: "EspaÃ±ol", es: "EspaÃ±ol" },

  "None" : { fr: "Aucun" , ja: "ãªã—", es: "Ninguna" },
  "Fade" : { fr: "Fondu" , ja: "ãƒ•ã‚§ãƒ¼ãƒ‰", es: "Descolorarse" },
  "Slide" : { fr: "GlissÃ©" , ja: "æ»‘ã‚Šå°", es: "Planeo" },
  "Circular" : { fr: "Circulaire" , ja: "å††å½¢", es: "Circular" },
  "Tube" : { fr: "Tube" , ja: "ãƒãƒ¥ãƒ¼ãƒ–", es: "Tubo" },
  "Zoom" : { fr: "Zoom" , ja: "ã‚ºãƒ¼ãƒ ", es: "Enfocar" },
  "Rotate" : { fr: "Rotation" , ja: "å›žè»¢ã™ã‚‹", es: "Girar" },

  "Profile" : { fr: "Profil" , ja: "ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«", es: "Perfil" },
  "Donate" : { fr: "Donation" , ja: "å¯„ä»˜ã™ã‚‹", es: "Donar" },
  "Open" : { fr: "Ouvrir" , ja: "è² è·", es: "Carga" },
  "Save" : { fr: "Sauver" , ja: "ã‚»ãƒ¼ãƒ–", es: "Salvar" },
  "Rename Group" : { fr: "Groupe: Renommer" , ja: "åå‰ã®å¤‰æ›´ã‚¿ãƒ–", es: "Cambiar el nombre de la grupo" },
  "New group" : { fr: "Nouveau Groupe" , ja: "æ–°ã—ã„ã‚°ãƒ«ãƒ¼ãƒ—", es: "Nuevo grupo" },
  "Add source" : { fr: "Ajouter source" , ja: "ã‚½ãƒ¼ã‚¹ã‚’è¿½åŠ ", es: "Agregue fuente" },
  "Edit group" : { fr: "Modifier groupe" , ja: "ã‚°ãƒ«ãƒ¼ãƒ—ã®ç·¨é›†", es: "Editar grupo" },
  "Group name" : { fr: "Nom du groupe" , ja: "ã‚°ãƒ«ãƒ¼ãƒ—å", es: "Nombre de la grupo" },
  "Group position" : { fr: "Position du groupe" , ja: "ã‚°ãƒ«ãƒ¼ãƒ—ã®ä½ç½®", es: "PosiciÃ³n del grupo" },
  "Left" : { fr: "Gauche" , ja: "å·¦", es: "Izquierda" },
  "Right" : { fr: "Droite" , ja: "å³", es: "Derecha" },
  "Day theme" : { fr: "ThÃ¨me jour" , ja: "æ—¥ãƒ†ãƒ¼ãƒž", es: "Tema del dÃ­a" },
  "Night theme" : { fr: "ThÃ¨me nuit" , ja: "å¤œã®ãƒ†ãƒ¼ãƒž", es: "Tema nocturno" },
  "Day" : { fr: "Jour" , ja: "æ—¥", es: "dÃ­a" },
  "Night" : { fr: "Nuit" , ja: "å¤œ", es: "Noche" },

  // Help
  "This is a group. It contains sources." : { fr: "Ceci est un groupe ; un groupe contient des sources." , ja: "ã“ã‚Œã¯ã‚¿ãƒ–ã§ã™ã€‚ ãã‚Œã¯ã‚½ãƒ¼ã‚¹ã‚’å«ã‚“ã§ã„ã¾ã™ã€‚", es: "Esta es una grupo. Contiene fuentes." },
  "This is a source." : { fr: "Ceci est une source." , ja: "ã“ã‚Œã¯ã‚½ãƒ¼ã‚¹ã§ã™", es: "Esta es una fuente." },
  "Click this button to create a new group." : { fr: "Cliquez sur ce bouton pour crÃ©er un nouvel groupe." , ja: "æ–°ã—ã„ã‚¿ãƒ–ã‚’ä½œæˆã™ã‚‹ã«ã¯ã€ã“ã®ãƒœã‚¿ãƒ³ã‚’ã‚¯ãƒªãƒƒã‚¯ã—ã¾ã™ã€‚", es: "Haga clic en este botÃ³n para crear una nueva grupo." },
  "Click here to add a source." : { fr: "Cliquer ici pour ajouter une source." , ja: "ã‚½ãƒ¼ã‚¹ã‚’è¿½åŠ ã™ã‚‹ã«ã¯ã€ã“ã®ãƒœã‚¿ãƒ³ã‚’ã‚¯ãƒªãƒƒã‚¯ã—ã¾ã™ã€‚", es: "Haga clic en este botÃ³n para agregar una fuente." },
  "What is Petrolette?" : { fr: "Qu'est-ce que Petrolette?" , ja: "Petroletteã¨ã¯ä½•ã§ã™ã‹ï¼Ÿ", es: "Â¿QuÃ© es Petrolette?" },
  "How do I use it?" : { fr: "Comment Ã§a marche ?" , ja: "ã©ã†ã‚„ã£ã¦ä½¿ã†ã®ï¼Ÿ", es: "Â¿Como lo uso?" },
  "Petrolette is your news reader. Find new sources, sort them in categories, you are on the in-ter-net." : { fr: "Petrolette est un lecteur de sources. Trouver de nouvelles sources, les trier dans les catÃ©gories, c'est l'in-ter-net." , ja: "Petroletteã¯ã‚ãªãŸã®ãƒ‹ãƒ¥ãƒ¼ã‚¹ãƒªãƒ¼ãƒ€ãƒ¼ã§ã™ã€‚ æ–°ã—ã„ã‚½ãƒ¼ã‚¹ã‚’è¦‹ã¤ã‘ã€ã‚«ãƒ†ã‚´ãƒªã§ä¸¦ã¹æ›¿ãˆã€ã‚ãªãŸã¯ã‚¤ãƒ³ã‚¿ãƒ¼ãƒãƒƒãƒˆä¸Šã«ã„ã¾ã™ã€‚", es: "Petrolette es tu lector de noticias. Encuentra nuevas fuentes, clasifÃ­calas en categorÃ­as, estÃ¡s en la red interna." },
  "Learn how to use <a id='aide-un' href='#'>the groups and the sources, and Petrolette in general." : { fr: "Apprenez Ã  utiliser <a id='aide-un' href='#'>les groupes et les sources</a>, et Petrolette en gÃ©nÃ©ral." , ja: "ã‚¿ãƒ–ã¨ã‚½ãƒ¼ã‚¹ã€ãŠã‚ˆã³ä¸€èˆ¬çš„ãªPetroletteã®ä½¿ã„æ–¹ã‚’å­¦ã‚“ã§ãã ã•ã„ã€‚", es: "Aprenda cÃ³mo usar <a id='aide-un' href='#'>las grupos y las fuentes</a>, y Petrolette en general." },
  "Learn how to use" : { fr: "Apprenez Ã  utiliser" , ja: "ã‚¿ãƒ–ã¨ã‚½ãƒ¼ã‚¹ã€ãŠã‚ˆã³ä¸€èˆ¬çš„ãªPetroletteã®ä½¿ã„æ–¹ã‚’å­¦ã‚“ã§ãã ã•ã„ã€‚", es: "Aprenda cÃ³mo usar" },
  "and Petrolette in general." : { fr: "et Petrolette en gÃ©nÃ©ral." , ja: "Petroletteã®ä½¿ã„æ–¹ã‚’å­¦ã‚“ã§ãã ã•ã„ã€‚", es: "y Petrolette en general." },
  "the groups and the sources" : { fr: "les groupes et les sources" , ja: "ã‚¿ãƒ–ã¨ã‚½ãƒ¼ã‚¹", es: "las grupos y las fuentes" },



  // Profile

  "Are you" : { fr: "Es-tu" , ja: "ã‚ãªãŸã¯", es: "Â¿Eres un" },
  "a FASCIST" : { fr: "un FASCISTE" , ja: "ãƒ•ã‚¡ã‚·ã‚¹ãƒˆ", es: "un FASCISTA" },
  "a LEFTIST" : { fr: "un GAUCHISTE" , ja: "å·¦æ´¾", es: "un IZQUIERDISTA" },
  "ALL OF THAT" : { fr: "TOUT Ã‡A Ã€ LA FOIS" , ja: "ã™ã¹ã¦ã®", es: "TODO DE ESO" },
  "NONE OF THAT" : { fr: "RIEN DE TOUT Ã‡A" , ja: "ãã®ã©ã‚Œã‚‚", es: "NADA DE ESO" },
  "What? No" : { fr: "Quoi? Non" , ja: "ä½•ï¼Ÿ ã„ã„ãˆ", es: "Â¿QuÃ©? No" },
  "Hell, Yeah" : { fr: "Peste, Ouais" , ja: "åœ°ç„ã€ã†ã‚“ã€‚", es: "Diablos, SÃ­" },
  "Huh, Next question" : { fr: "Euh, Question suivante" , ja: "ã‚ã€æ¬¡ã®è³ªå•", es: "Eh, Siguiente pregunta" },

  "Open / import groups and sources" : { fr: "Ouvrir / importer groupes et sources" , ja: "ã‚¿ãƒ–ã‚’é–‹ã/ã‚¤ãƒ³ãƒãƒ¼ãƒˆã™ã‚‹", es: "Abrir / importar grupos y canales RSS" },
  "Save / Export groups and sources" : { fr: "Enregistrer / exporter groupes et sources" , ja: "ã‚¿ãƒ–ã¨ãƒ•ã‚£ãƒ¼ãƒ‰ã®ä¿å­˜/ã‚¨ã‚¯ã‚¹ãƒãƒ¼ãƒˆ", es: "Guardar archivo de groups y sources" },
  "Open group on source drop" : { fr: "Ouvrir nouveau groupe" , ja: "ãƒ‰ãƒ­ãƒƒãƒ—æ™‚ã«ã‚¿ãƒ–ã‚’é–‹ã", es: "Abrir grupo en drop" },

  "If this is set, when you drag & drop one or more source(s) in a group, said group opens" : { fr: "Ouvrir le groupe oÃ¹ une source est dÃ©posÃ©e" , ja: "é­”æ³•ä½¿ã„ã®ã‚¿ãƒ–ã‚’é–‹ã„ã¦é¤Œã‚’å…¥ã‚Œã‚‹", es: "Abrir grupo en donde se pone un canal" },

  // Messages d'erreurs
  "View Petrolette according to the time of day." : { fr: "Voir Petrolette selon l'heure de la journÃ©e." , ja: "æ™‚åˆ»ã«å¿œã˜ã¦Petroletteã‚’è¡¨ç¤ºã™ã‚‹", es: "Ver Petrolette segÃºn la hora del dÃ­a." },

  "Reset Petrolette according to your political mood of the week." : { fr: "RÃ©initialiser Petrolette selon votre humeur politique de la semaine." , ja: "ä»Šé€±ã®ã‚ãªãŸã®æ”¿æ²»çš„ãªæ°—åˆ†ã«åˆã‚ã›ã¦Petroletteã‚’ãƒªã‚»ãƒƒãƒˆã™ã‚‹", es: "Restablece Petrolette segÃºn tu estado de Ã¡nimo polÃ­tico de la semana." },

  "When you click an image, you can view it in a gallery, and start a slideshow." : { fr: "Un clic sur une image l'affiche dans une galerie." , ja: "ã‚¤ãƒ¡ãƒ¼ã‚¸ã‚’ã‚¯ãƒªãƒƒã‚¯ã™ã‚‹ã¨ã€ã‚®ãƒ£ãƒ©ãƒªãƒ¼ã§ãã®ã‚¤ãƒ¡ãƒ¼ã‚¸ã‚’è¡¨ç¤ºã—ã€ã‚¹ãƒ©ã‚¤ãƒ‰ã‚·ãƒ§ãƒ¼ã‚’é–‹å§‹ã§ãã¾ã™", es: "Cuando hace clic en una imagen, puede verla en una galerÃ­a." },
  "Help Petrolette according to your spiritual mood of the day." : { fr: "Aider (en vrai) Petrolette." , ja: "ã‚ãªãŸã®ç²¾ç¥žçš„ãªæ—¥ã®æ°—åˆ†ã«å¿œã˜ã¦Petroletteã‚’åŠ©ã‘ã¦ãã ã•ã„", es: "Ayuda a Petrolette de acuerdo con tu estado de Ã¡nimo espiritual del dÃ­a." },
  "This file is bad" : { fr: "Ce fichier est chelou" , ja: "ã“ã®ãƒ•ã‚¡ã‚¤ãƒ«ã¯æ‚ªã„ã§ã™", es: "Este archivo es malo" },
  "Loaded petrolette.json OK" : { fr: "Ouverture de petrolette.json OK" , ja: "ã“ã®ãƒ•ã‚¡ã‚¤ãƒ«ã¯å•é¡Œã‚ã‚Šã¾ã›ã‚“", es: "Este archivo estÃ¡ bien" },
  "Forgot what you are? Reset Petrolette groups & sources" : { fr: "OubliÃ© ce que vous Ãªtes? Re-initialiser Petrolette" , ja: "ã‚ãªãŸã¯ä½•ã‹ã‚’å¿˜ã‚Œã¾ã—ãŸã‹ï¼Ÿ ãƒªã‚»ãƒƒãƒˆPetrolette", es: "OlvidÃ³ lo que eres? Restablecer Petrolette" },

  "You can't create more than %1 resources of each type." : { fr: "Vous ne pouvez pas crÃ©er plus de %1 ressources de chaque type.", ja: "å„ç¨®ï¼…ä»¥ä¸Šã®è²¡æºã‚’ä½œã‚‹ã“ã¨ã¯ã§ãã¾ã›ã‚“ã€‚" },
  "Error" : { fr: "Erreur", ja: "ã‚¨ãƒ©ãƒ¼", es: "Error" },
  "error" : { fr: "erreur", ja: "ã‚¨ãƒ©ãƒ¼", es: "error" },

  // Dialogues
  "Source: Kill" : { fr: "Source: Supprimer", ja: "ãƒ•ã‚£ãƒ¼ãƒ‰ï¼šå‰Šé™¤", es: "Source: Eliminar" },
  "Source: Parameters" : { fr: "Source: ParamÃ¨tres", ja: "ãƒ•ã‚£ãƒ¼ãƒ‰ï¼šãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿", es: "Source: ParÃ¡metros" },
  "Source Type" : { fr: "Type de Source", ja: "ãƒ•ã‚£ãƒ¼ãƒ‰ã®ç¨®é¡ž", es: "Tipo de Source" },
  "Mixed" : { fr: "Mixte", ja: "æ··åˆ", es: "Mezclado" },
  "Image" : { fr: "Image", ja: "ç”»åƒ", es: "Imagen" },
  "Text" : { fr: "Texte", ja: "ãƒ†ã‚­ã‚¹ãƒˆ", es: "Texto" },
  "Collection" : { fr: "Collection", ja: "ã‚³ãƒ¬ã‚¯ã‚·ãƒ§ãƒ³", es: "ColecciÃ³n" },

  "Number of items" : { fr: "Nombre de titres", ja: "ã‚¿ã‚¤ãƒˆãƒ«æ•°", es: "Cantidad de tÃ­tulos" },
  "Number of sources" : { fr: "Nombre de sources", ja: "ã‚½ãƒ¼ã‚¹æ•°", es: "Cantidad de fuentes" },

  "Just answer the question" : { fr: "RÃ©pond juste Ã  la question", ja: "ã¡ã‚‡ã†ã©è³ªå•ã«ç­”ãˆã‚‹", es: "Solo responde la pregunta" },

  "Group: Kill" : { fr: "Group: Supprimer", ja: "ã‚¿ãƒ–ï¼šå‰Šé™¤", es: "Grupo: Eliminar" },
  "Source Location (URL)" : { fr: "Adresse de la source (URL)", ja: "å ´æ‰€ï¼ˆURLï¼‰", es: "UbicaciÃ³n (URL)" },
  "Enter a website address/URL and click search, then OK, or simply enter the URL of the" : { fr: "Entrez l'adresse / URL d'un site Web, puis cliquez sur Rechercher, ou entrez directement l'adresse dun", ja: "ã‚¦ã‚§ãƒ–ã‚µã‚¤ãƒˆã®ã‚¢ãƒ‰ãƒ¬ã‚¹/ URLã‚’å…¥åŠ›ã—ã¦[æ¤œç´¢]ã‚’ã‚¯ãƒªãƒƒã‚¯ã—ã€æ¬¡ã«[OK]ã‚’ã‚¯ãƒªãƒƒã‚¯ã™ã‚‹ã‹ã€ãƒ•ã‚£ãƒ¼ãƒ‰ã®å ´æ‰€", es: "Ingrese la direcciÃ³n / URL de un sitio web y haga clic en buscar, luego en Aceptar o ingrese directamente la ubicaciÃ³n del" },

  "Enter a website address/URL and click search, then OK, or simply enter the URL of the source" : { fr: "Entrez l'adresse / URL d'un site Web, puis cliquez sur Rechercher, ou entrez directement l'adresse d'une source", ja: "ã‚¦ã‚§ãƒ–ã‚µã‚¤ãƒˆã®ã‚¢ãƒ‰ãƒ¬ã‚¹/ URLã‚’å…¥åŠ›ã—ã¦æ¤œç´¢ã‚’ã‚¯ãƒªãƒƒã‚¯ã™ã‚‹ã‹ã€ãƒ•ã‚£ãƒ¼ãƒ‰ã®ã‚¢ãƒ‰ãƒ¬ã‚¹ã‚’å…¥åŠ›ã™ã‚‹ã ã‘ã§ã™", es: "Ingrese la direcciÃ³n / URL de un sitio web y haga clic en buscar, o ingrese directamente la ubicaciÃ³n del source" },

  // Titres
  "Add a new source to [%1]" : { fr: "Ajouter une source Ã  [%1]", ja: "æ–°ã—ã„RSSãƒ•ã‚£ãƒ¼ãƒ‰ã‚’è¿½åŠ ã™ã‚‹", es: "Agregue un nuevo source a [%1]" },

  "Fold / unfold" : { fr: "Plier / dÃ©plier", ja: "ã‚¦ãƒ¼ãƒ–ãƒªãƒ¼ãƒ« - ãƒ•ã‚¡ãƒ¼ãƒžãƒ¼", es: "Abrir / cerrar" },
  "Select this source" : { fr: "SÃ©lectionner cette source", ja: "RSSãƒ•ã‚£ãƒ¼ãƒ‰ã‚’é¸æŠž", es: "Selecciona este source" },
  "Delete this source" : { fr: "Supprimer cette source", ja: "ã“ã®RSSãƒ•ã‚£ãƒ¼ãƒ‰ã‚’å‰Šé™¤", es: "Eliminar este source rss" },
  "Delete group" : { fr: "Supprimer groupe", ja: "ã‚°ãƒ«ãƒ¼ãƒ—ã‚’å‰Šé™¤ã™ã‚‹", es: "Eliminar grupo" },
  "%1 | Click to rename, drag to re-order" : { fr: "%1 | Clic pour renommer, glisse pour ranger", ja: "%1 | ã‚¯ãƒªãƒƒã‚¯ã—ã¦åå‰ã‚’å¤‰æ›´ã—ã€ãƒ‰ãƒ©ãƒƒã‚°ã—ã¦å†æ³¨æ–‡ã—ã¾ã™", es: "%1 | Haga clic para cambiar el nombre, arrastre para volver a ordenar" },
  "Really delete this source? (%1)" : { fr: "RÃ©ellement supprimer cette source (%1) ?", ja: "æœ¬å½“ã«ã“ã®ãƒ•ã‚£ãƒ¼ãƒ‰ã‚’å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ  (%1)", es: "Â¿Realmente borraste este source? (%1)" },
  "Delete source" : { fr: "Supprimer source", ja: "æœ¬å½“ã«ã“ã®ãƒ•ã‚£ãƒ¼ãƒ‰ã‚’å‰Šé™¤ã—ã¾ã™ã‹", es: "Borraste source" },

  "Really delete this group? (%1, %2 sources)" : { fr: "RÃ©ellement supprimer ce groupe (%1, %2 sources) ?", ja: "æœ¬å½“ã«ã“ã®ã‚¿ãƒ–ã‚’å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ (%1, %2 ãƒ•ã‚£ãƒ¼ãƒ‰)", es: "Â¿Realmente borras esta grupo? (%1, %2 sources)" },

  "Options" : { fr: "Options", ja: "å—œå¥½", es: "Preferencias" },
  "Refresh %1" : { fr: "RafraÃ®chir %1", ja: "ãƒªãƒ­ãƒ¼ãƒ‰ %1", es: "Recargar %1" },

  "Last" : { fr: "Dernier", ja: "zz" }
};
