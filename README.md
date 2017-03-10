# jquery-i18next-phrases
[i18next]:http://i18next.com
[i18next-phrases]:https://github.com/FCOO/i18next-phrases
[jquery-i18next]:https://github.com/i18next/jquery-i18next


## Description
jQuery-fn-methods to add [i18next] translations using [jquery-i18next] and [i18next-phrases]

Add new methods to jQuery prototype: 

    $.fn.i18n( htmlOrKeyOrPhrase[, attribute][, options] )

Add/updates the `"data-i18n"` attribute

`htmlOrKeyOrPhrase` = 

- a simple html-string - `"This will <u>always</u> be in English"` OR 
- a [i18next]-key - `"myNS:myKey"` OR 
- a [i18next-phrases]-object - `{da:"Dette er en test", en:"This is a test"}` OR
- a string representing a [i18next-phrases]-object - `"{'da':'Dette er en test', 'en':'This is a test'}"`



## Installation
### bower
`bower install https://github.com/FCOO/jquery-i18next-phrases.git --save`

## Demo
http://FCOO.github.io/jquery-i18next-phrases/demo/ 

## Usage

    $('selector').i18n("This will <u>always</u> be in English"); //Simple (html) string

    $('selector2').i18n("myNamespace:myKey"); //[namespace]-key added to i18next

    $('selector3').i18n({da:"Dette er en test", en:"This is a test"}); //As i18next-phrase
    
    $('selector4').i18n({da:"Dette er en titel", en:"This is a title"}, 'title'); //With attribute

    $('selector5').i18n("{'da':'Dette er en anden test', 'en':'This is another test'}"); //i18next-phrase as string


## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/jquery-i18next-phrases/LICENSE).

Copyright (c) 2017 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk
