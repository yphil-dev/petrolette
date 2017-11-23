var MOB = (function() {

  return {
    // language: Prefs.readConfig('lang'),
    language: 'en',

    start : function() {
      var self = this;

    },
    finishHtmlInitialization : function() {

      function setDateFormat() {
        console.log('plop');
      }

      setDateFormat();

    },
    tr : function( string ) {
      var _trAux,
          stringVarRegExp = /(%.)/,
          matchData,
          translatedString,
          translations,
          currentReplacement,
          i = 1; // pour pointer sur le premier argument optionnel, arguments[1]

      // Retourne la traduction de la chaine de caracètre passée en argument.
      _trAux = function( string ) {
        if( !string ) {
          return "";
        }

        if ( MOB.language === "en" ) {
          // Le discriminant sert à distinguer masculin/féminin ou singulier pluriel, ex <plural>Open
          // En "en" la clé sert aussi à la traduction, donc on retire simplement le discriminant
          var discriminantRegExp = /(<.*>)(.*)/;
          var match = string.match( discriminantRegExp );
          var stringWithoutDiscriminant = match ? match[ 2 ] : null;
          return stringWithoutDiscriminant || string;
        } else {
          translations = MOB.i18n.translations[ string ];
          translatedString = translations ? translations[ MOB.language ] : string;
          return translatedString || string;
        }
      };

      translatedString = _trAux( string );


      while ( ( matchData = stringVarRegExp.exec( translatedString ) ) !== null ) {
        currentReplacement = translatedString.replace( matchData[0], arguments[ i ]  );
        translatedString =  currentReplacement;
        i++;
      }

      return translatedString;
    }
  };

})();
