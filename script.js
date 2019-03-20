

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(const i = 0; i < ca.length; i++) {
        const c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    const user = getCookie("username");
    if (user != "") {
        return true;
    } else {
       return false;
    }
}
  
function findGetParameter(parameterName) {
    const result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

if(!getCookie('pixel_ga_transactionpesonalizados')){  

    const getUrlParameter = function getUrlParameter(sParam) {
        const sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLconstiables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLconstiables.length; i++) {
            sParameterName = sURLconstiables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    const transaction = getUrlParameter('transaction');
    const firstOrderFunnelInfo = getUrlParameter('firstOrderFunnelInfo');
    const aprovada = getUrlParameter('aprovada');

    if(transaction != undefined){ //Se Existe GET transaction
      
    }else if(firstOrderFunnelInfo != undefined){ //Se Existe GET firstOrderFunnelInfo
      
      const decripy = b64DecodeUnicode(firstOrderFunnelInfo);
      const arrayDecripy = JSON.parse(decripy);

      transaction = arrayDecripy.previousTransaction;

      if(transaction == undefined){
          transaction = new Date();
      }
      
    }else if(aprovada == 'MBFSIM'){

      transaction = new Date();

    }

    if(aprovada == 'MBFSIM'){

      window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event:"transactionpesonalizados",
          'transactionId': transaction,
           'transactionAffiliation': 'L12220057V',
           'transactionTotal': 207.84,
           'transactionProducts': [{
               'sku': '352145',
               'name': 'Método Barret Fit',
               'category': 'Queima Diária',
               'price': 207.84,
               'quantity': 1
           }]

        });

         window.dataLayer.push({'revenue': 207.84});

        setCookie("pixel_ga_transactionpesonalizados", transaction, 30);
    }

}
