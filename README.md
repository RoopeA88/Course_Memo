asenna riippuvuudet kirjoittamalla "npm install" ja aja projekti kirjoittamalla "npm run dev" ilman lainausmerkkejä. projektissa on käytetty zustand-tilankäsittelykirjastoa, jonka pitäisi asentua "npm install" mukana. jos install ei kuitenkaan toimi odotetusti, kirjoita "npm install zustand".

Ohjelmassa on ainakin yritetty toteuttaa kaikki vaatimukset ja sen lisäksi olen tehnyt jotain omia muutoksia. Se onko tämä ristiriidassa tehtävänannon kanssa on opettajan päätettävissä. Pääasiassa halusin rakentaa uuden katseen kestävän version portfolioon, joka ei mene rikki ja näyttää sen jollekin.

Omia muutoksia: 

kun kurssi lisätään listaan, se pyöräytetään toLowerCase-funktion läpi ja kurssin nimen maksimipituus on 16 merkkiä, ettei layout mene rikki.
Jos kurssin nimen pituus on yli 16 merkkiä, niin loput leikataan pois slicella.

Muistiinpano voi olla maksimissaan 80 merkkiä pitkä ja tässäkin leikataan samalla tavalla kuin edellä.

Ohjelmassa ei käytetä vierityspalkkia, koska se tuhoaa estetiikan. Kurssiboksia ja muistiinpanoboksia voi vierittää silti hiiren rullalla.

Minkään napin (poislukien Start Session) ei pitäisi ohjelmassa toimia, jos sessio ei ole päällä. Näistä pitäisi tulla myös punainen virheilmoitus. Tässä on niin monta booleania hoitamassa asioita, että olen löytänyt bugeja jatkuvasti enkä yllättyisi, jos jokin elementti vielä käyttäytyy hassusti. Tarkoituksena on tietenkin, että näytetään yksi virheilmoitus kerrallaan eikä niin, että niitä tulee kaksi vierekkäin.

Kun kurssi poistetaan niin kaikki sen sisältämät muistiinpanot poistetaan.

uudessa muistiinpanot listassa on luotu uusi muuttuja sessionId.

Ohjelman käyttö:

Start Session päälle, että Session Status muuttuu aktiiviseksi ja ohjelma luo uuden session id:n. Courses divissä listattujen kurssien vieressä on napit ADD ja DEL. ADD-napilla pääsee näkymään, jossa kirjoitetaan muistiinpano ja DEL napilla poistetaan kurssi sekä samalla siihen liitetyt muistiinpanot. Näin ollen muistiinpanonäkymään ei pääse, jos kursseja ei ole. Muistiinpanonäkymä lukittuu ensimmäisen Add Note napin painalluksen jälkeen. Voit kuitenkin lisätä useita muistiinpanoja samalle kurssille. Save Notes lopettaa Session ja listaa session kurssit. Uuden kurssin lisääminen toimii vain, jos sessio on päällä, nimi ei ole tyhjä tai jo olemassa oleva nimi. List Notes -nappi toimii kaikkien muistiinpanojen listaajana eli filter pudotusvalikossa ei tarkoituksella ole "all notes" tai vastaavaa vaihtoehtoa.



Tekoälyn käyttö:

Tekoälyn käyttö oli paljon vähäisempää kuin ensimmäisessä versiossa. Tällä kertaa en käyttänyt co-pilottia lainkaan vaan halusin oppia syntaksin.
Käytin tarkoituksella myös perinteisempää tiedonhakua enemmän, kuten Mozillan developer-sivua sekä Stack Overflowta. Hiukan myös Youtubesta katsoin tutoriaaleja.
Deepseek oli käytössä silloin kun perinteiseen funktioon tuli joku mutka tai funktio ei toiminut, vaikka kaikki näytti olevan kunnossa (varsinkin projektin alkupuolella). Esimerkiksi kun find() tai filter() metodeissa piti päästä käsiksi muistiinpano-objektin sisäiseen course-objektiin. Myöhemmin ymmärsin käyttää enemmän developer toolsin konsolia, jos joku nappi ei toiminut tai sivu meni pimeäksi.
Joitain unohdettuja CSS-asioita kyselin tekoälyltä, kuten placeholderien keskittäminen.
Muutaman kerran jouduin pasteamaan koko komponentin DeepSeekille. Esimerkkinä ListNotesButtonArea.jsx liittyen siihen, että joidenkin ehtojen pitikin olla mappauksen ulkopuolella, jos lista oli tyhjä ja mappaus ei siksi käynnistynyt.
.then() funktio fetchauksen yhteydessä oli tekoälyn idea, kun lista piti kopioida sekä getFormattedTimestamp on kokonaan tekoälyn tuotos.

muuta:

olisi kiva jos saisin palautetta siitä miltä tämä näyttää mahdollisesti erilaisella resoluutiolla. kaiken divien ja nappien pitäisi olla linjassa ja varsinkin noiden pienten ADD JA DEL nappien välissä pitäisi olla hiukan tilaa, ettei näytä hassulta. Mulla näyttää siltä kuin pitää 2560x1600 ja 1920x1080 resoilla.

