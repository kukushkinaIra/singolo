'use strict';

const MENU = document.getElementById('menu');
const BUTTON = document.getElementById('submit');
const CLOSE_BUTTON = document.getElementById('close-btn');

MENU.querySelectorAll('li');

MENU.addEventListener('click', (event) =>{
    MENU.querySelectorAll('li a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

function myFunction() {
    document.getElementById("vertical_phone").style.display = "block";
    setTimeout(() => document.body.style.display = "", 100); 
    document.getElementById("vertical_phone").addEventListener('click', (event) =>{
        event.target.style.display = "none";
    });
   
 }

 function myFunction_2() {
    
     document.getElementById("horiz_phone").style.display = "block";
     setTimeout(() => document.body.style.display = "", 100); 
     document.getElementById("horiz_phone").addEventListener('click', (event) =>{
         event.target.style.display = "none";
     });
    
  }
const MEN = document.getElementById('men');

MEN.querySelectorAll('li');

MEN.addEventListener('click', (event) =>{
    MEN.querySelectorAll('li a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

CLOSE_BUTTON.addEventListener('click', () =>{
   document.getElementById('result').innerText = '';
   document.getElementById('message-block').classList.add('hidden');
});

BUTTON.addEventListener('click', () =>{
    var fname = document.getElementById('fname').value.toString();
    var ftext = document.getElementById('ftext').value.toString();
    if (ftext === 'Singolo'){
    document.getElementById('theme').innerText = ftext;
    }
    else{
        document.getElementById('theme').innerText = 'без темы';   
    }
    var description = document.getElementById('description').value.toString();
    if (description === 'Portfolio project'){
        document.getElementById('descr_theme').innerText =description;
        }
        else{
            document.getElementById('descr_theme').innerText = 'без темы';   
        }
    document.getElementById('message-block').classList.remove('hidden');
});
const PORTFOLIO_IMAGES = document.getElementById('portfolio__images');

PORTFOLIO_IMAGES.addEventListener('click', event => {
    let target = event.target;
    if (target.tagName == 'IMG') {
        PORTFOLIO_IMAGES.querySelectorAll('img').forEach(item => {
            item.style.boxShadow = "none";
        });
        event.target.style.boxShadow = "0px 0px 0px 5px hsl(3, 82%, 67%)";
    }
});

const PORTFOLIO_BUTTONS = document.getElementById('men');


const randomImages = (event) => {
    let target = event.target;
    
        PORTFOLIO_BUTTONS.querySelectorAll('li').forEach(item => {
            item.classList.remove('active');
        });
        target.classList.add('active');

        let srcArray = [];
        PORTFOLIO_IMAGES.querySelectorAll('img').forEach(item => {
            srcArray.push(item.src);
            item.src = '';
        })

        let randArray = srcArray.sort(function() {
            return Math.random() - 0.5;
        });

        PORTFOLIO_IMAGES.querySelectorAll('img').forEach((item, index) => {
            item.src = randArray[index];
        })
    
}





var multiItemSlider = (function () {
  return function (selector, config) {
    var
      _mainElement = document.querySelector(selector), 
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), 
      _sliderItems = _mainElement.querySelectorAll('.slider__item'),
      _sliderControls = _mainElement.querySelectorAll('.slider__control'),
      _sliderControlLeft = _mainElement.querySelector('.slider__control_left'),
      _sliderControlRight = _mainElement.querySelector('.slider__control_right'),
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),  
      _positionLeftItem = 0,
      _transform = 0,
      _step = _itemWidth / _wrapperWidth * 100,
      _items = [];


    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      }
    }

    var _transformItem = function (direction) {
      var nextItem;
      if (direction === 'right') {
        _positionLeftItem++;
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform -= _step;
      }
      if (direction === 'left') {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform += _step;
      }
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
    }

    var _controlClick = function (e) {
      if (e.target.classList.contains('slider__control')) {
        e.preventDefault();
        var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
        _transformItem(direction);
      }
    };

    var _setUpListeners = function () {
      _sliderControls.forEach(function (item) {
        item.addEventListener('click', _controlClick);
      });
    }
    _setUpListeners();

    return {
      right: function () {
        _transformItem('right');
      },
      left: function () { 
        _transformItem('left');
      }
    }

  }
}());

var slider = multiItemSlider('.slider');