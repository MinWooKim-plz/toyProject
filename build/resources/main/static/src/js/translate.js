function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'ko', autoDisplay: true }, 'google_translate_element');
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const translationLinks = document.querySelector('.translation-links');
  
    if (translationLinks) {
      translationLinks.addEventListener('click', function(event) {
        let el = event.target;
        while (el.nodeName === 'FONT' || el.nodeName === 'SPAN') {
          el = el.parentElement;
        }
        if (el && el.nodeName === 'A') {
          const lang = el.getAttribute('data-lang');
          const gtcombo = document.querySelector('.goog-te-combo');
          if (gtcombo) {
            gtcombo.value = lang;
            gtcombo.dispatchEvent(new Event('change'));
          } else {
            alert("Error: Could not find Google translate Combolist.");
          }
        }
        event.preventDefault();
      });
    }
  });
  