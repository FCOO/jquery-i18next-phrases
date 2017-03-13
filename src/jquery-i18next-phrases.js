/****************************************************************************
	jquery-i18next-phrases.js, 

	(c) 2017, FCOO

	https://github.com/FCOO/jquery-i18next-phrases
	https://github.com/FCOO

****************************************************************************/

(function ($, window/*, document, undefined*/) {
	"use strict";
	
    /***********************************************************
    Initialize jquery-i18next - i18next plugin for jquery 
    https://github.com/i18next/jquery-i18next
    ***********************************************************/
    var jQuery_i18n_selectorAttr = 'data-i18n',    // selector for translating elements
        jQuery_i18n_targetAttr   = 'i18n-target',  // data-() attribute to grab target element to translate (if diffrent then itself)
        jQuery_i18n_optionsAttr  = 'i18n-options'; // data-() attribute that contains options, will load/set if useOptionsAttr = true

    
    window.jqueryI18next.init(
        window.i18next/*i18nextInstance*/, 
        $, 
        {
            tName         : 't',                        // --> appends $.t = i18next.t
            i18nName      : 'i18n',                     // --> appends $.i18n = i18next
            handleName    : 'localize',                 // --> appends $(selector).localize(opts);
            selectorAttr  : jQuery_i18n_selectorAttr,   // selector for translating elements
            targetAttr    : jQuery_i18n_targetAttr,     // data-() attribute to grab target element to translate (if diffrent then itself)
            optionsAttr   : jQuery_i18n_optionsAttr,    // data-() attribute that contains options, will load/set if useOptionsAttr = true
            useOptionsAttr: true,                       // see optionsAttr
            parseDefaultValueFromContent: true          // parses default values from content ele.val or ele.text
        }
    );


    /***********************************************************
    Add new methods to jQuery prototype: 
    $.fn.i18n( htmlOrKeyOrPhrase[, attribute][, options] )
    Add/updates the "data-i18n" attribute

    htmlOrKeyOrPhrase = simple html-string ( "This will <u>always</u> be in English" ) OR 
                        i18next-key ( "myNS:myKey" ) OR 
                        a phrase-object - see langValue in i18next.addPhrase ( {da:"Dette er en test", en:"This is a test"} ) OR
                        a string representing a phrase-object ( '{"da":"Dette er en test", "en":"This is a test"}' )
    ***********************************************************/
    var tempKeyId = 0,
        tempNS = '__TEMP__';

    $.fn.i18n = function( htmlOrKeyOrPhrase ) {
        var options = null, 
            attribute = '', 
            argument,
            keyFound = true, 
            key = htmlOrKeyOrPhrase;

        for (var i=1; i<arguments.length; i++ ){
            argument = arguments[i];              
            switch ($.type(argument)){
              case 'object': options = argument; break;
              case 'string': attribute = argument; break;
            }
        }

        var original = htmlOrKeyOrPhrase;
        try {
            htmlOrKeyOrPhrase = JSON.parse(htmlOrKeyOrPhrase);
        }
        catch (e) {
            htmlOrKeyOrPhrase = original; 
        }

        //Get the key or add a temp-phrase
        if (typeof htmlOrKeyOrPhrase == 'string')//{
            keyFound = window.i18next.exists(htmlOrKeyOrPhrase);
        else {
            //It is a {da:'...', en:'...', de:'...'} object
            key = 'jqueryfni18n' + tempKeyId++;
            window.i18next.addPhrase( tempNS, key, htmlOrKeyOrPhrase );
            key = tempNS+':'+key;
        }    

        return this.each(function() {
            var $this = $(this),
                oldData = $this.attr( jQuery_i18n_selectorAttr ),
                newData = [],
                oldStr,
                newStr = attribute ? '[' + attribute + ']' + key : key,
                keep;
            oldData = oldData ? oldData.split(';') : [];
            
            for (var i=0; i<oldData.length; i++ ){
                oldStr = oldData[i];
                keep = true;
                //if the new key has an attribute => remove data with '[attribute]'
                if (attribute && (oldStr.indexOf('[' + attribute + ']') == 0))
                    keep = false;                      
                //if the new key don't has a attribute => only keep other attributes
                if (!attribute && (oldStr.indexOf('[') == -1)) 
                    keep = false;
                if (keep)
                    newData.push( oldStr );
            }
            newData.push( newStr);                                

            //Set data-i18n
            $this.attr( jQuery_i18n_selectorAttr, newData.join(';') );

            //Set data-i18n-options
            if (options)
                $this.attr( 'data-' + jQuery_i18n_optionsAttr, JSON.stringify( options ) );

            if (keyFound)
                //Update contents
                $this.localize();        
            else {
                //Not (yet) a key => simple add htmlOrKeyOrPhrase as html or attr
                if (attribute)
                    $(this).attr( attribute, htmlOrKeyOrPhrase );
                else
                    $(this).html( htmlOrKeyOrPhrase );
            }
        });
    };

}(jQuery, this, document));