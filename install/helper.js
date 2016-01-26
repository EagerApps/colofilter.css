(function(){

  if (!document.documentElement.classList)
    return;

  var options = INSTALL_OPTIONS;
  var prevFilters = [];

  var update = function(){
    for (var i=0; i < prevFilters.length; i++){
      prevFilters[i][0].classList.remove(prevFilters[i][1]);
    }
    prevFilters = [];

    for (var i=0; i < options.regions.length; i++){
      var region = options.regions[i];

      var el = document.querySelector(region.location);
      if (!el)
        continue;

      var imgs = el.querySelectorAll('img');
      if (!imgs)
        continue;

      for (var j=0; j < imgs.length; j++){
        if (!imgs[j].parentNode.classList.contains('eager-colofilter-figure')){
          var figure = document.createElement('figure');
          figure.className = 'eager-colofilter-figure';

          var style = getComputedStyle(imgs[j]);
          if (style.display == 'inline')
            figure.style.display = 'inline-block';
          else
            figure.style.display = style.display;

          figure.style.margin = style.margin;
          imgs[j].style.margin = 0;

          imgs[j].parentNode.replaceChild(figure, imgs[j]);
          figure.appendChild(imgs[j]);
        } else {
          var figure = imgs[j].parentNode;
        }

        var text = figure.querySelector('.eager-colofilter-text');
        if (!text){
          var text = document.createElement('span');
          text.className = 'eager-colofilter-text';
          figure.appendChild(text);
        }

        if (region.text){
          text.innerHTML = region.text;

          text.style.fontSize = region.textSize;
        } else {
          text.innerHtml = '';
        }

        var className = 'blend-' + region.color;
        if (region.brightness !== 'normal'){
          className += '-' + region.brightness;
        }

        figure.classList.add(className);

        prevFilters.push([figure, className]);
      }
    }
  };

  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', update);
  else
    update();

  INSTALL_SCOPE = {
    setOptions: function(opts){
      options = opts;

      update();
    }
  };

})();
