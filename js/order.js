(function() {
  'use strict';
  $('.button-collapse').sideNav();

  const $cartTableBody = $('tbody');
  let subtotal = 0;

  const makeTableRow = function($food, $cost) {
    const $tr = $('<tr>');
    const $tdFood = $('<td>');
    const $tdCost = $('<td>');

    $tdFood.text($food.text());
    $tdCost.addClass('price right-align');
    $tdCost.text($cost.text());
    $tr.append($tdFood);
    $tr.append($tdCost);

    return $tr;
  };

  const shoppingCart = function($orderRow) {
    $cartTableBody.append($orderRow);
  };

  const addToSubtotal = function($cost) {
    const $subtotal = $('td.subtotal');
    const $tax = $('td.tax');
    const $total = $('td.total');
    const tax = Number.parseFloat($tax.text().slice(1));

    subtotal += Number.parseFloat($cost.text().slice(1));
    $subtotal.text(`${'$'}${subtotal.toFixed(2)}`);
    const total = (1 + tax / 100) * subtotal;

    $total.text(`${'$'}${total.toFixed(2)}`);
  };

  const cardClickHandler = function(event) {
    event.preventDefault();
    const $target = $(event.target);
    const $food = $target.parent().prev().children(':first-child');
    const $cost = $target.parent().prev().children(':last-child');
    const $newCartRow = makeTableRow($food, $cost);

    shoppingCart($newCartRow);
    addToSubtotal($cost);
  };

  $('.cards').on('click', 'a', cardClickHandler);

  $('#userinfo').on('submit', $('#placeorder'), (event) => {
    event.preventDefault();
    if ($cartTableBody.children().length === 0) {
      Materialize.toast('You must select something to eat!', 4000);
    }
    else {
      for (let i = 0; i < 3; i++) {
        if ($('input')[i].value === '' && i === 0) {
          Materialize.toast('Please provide a name!', 4000);

          return;
        }
        if ($('input')[i].value === '' && i === 1) {
          Materialize.toast('Please provide a phone number!', 4000);

          return;
        }
        if ($('input')[i].value === '' && i === 2) {
          Materialize.toast('Please provide an address!', 4000);

          return;
        }
      }
      Materialize.toast('Thank You! Your order has been placed!', 4000);
    }
  });
})();
