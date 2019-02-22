const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://pt.wikipedia.org/wiki/Lista_de_presidentes_do_Brasil';
const url2 = 'https://pt.wikipedia.org/wiki/Deodoro_da_Fonseca';

rp(url)
.then(function(html) {
    const wikiUrls = [];
    for (let i = 0; i < 47; i++) {
        if (i > 1) {
            wikiUrls.push($('b > a', html)[i].attribs.href);
        }
    }
    return Promise.all(
        wikiUrls.map(function (link) {
            let resultado = presidenteParser(`https://pt.wikipedia.org/${link}`);
            // console.log(resultado)
            return resultado
        })
    )
})
.then((presidentes) => {
    console.log(presidentes);
})
.catch(function(err) {
    console.log(err);
});

function presidenteParser(url3) {
    return rp(url3)
    .then((html) => {
        let aniversario = $('a[href$="Nascimentos"]', html).text() + ' ' + $('a[href$="Nascimentos"]', html).next().text()
        //console.log(aniversario);
        return {
            nome: $('.firstHeading', html).text(),
            aniversario
        };
    });
}