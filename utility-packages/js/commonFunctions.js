function swapMode(checkbox) {
  $(`[data-bs-theme]`).prop('data-bs-theme',checkbox.checked ? "dark":"light");
  $(`[data-bs-theme]`).attr('data-bs-theme',checkbox.checked ? "dark":"light");

  
  if(checkbox.checked){
    var btns = $(`.btn-light`);
    btns.removeClass('btn-light');
    btns.addClass('btn-dark');
    $('#map').removeClass('dark');
  }else{
    var btns = $(`.btn-dark`);
    btns.removeClass('btn-dark');
    btns.addClass('btn-light');
    $('#map').addClass('dark');
  }
}

function objectInArrayByReference(object, array) {
    for (const obj of array) {
      if (object === obj) {
        return true;
      }
    }
    return false;
}
function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}



function connectTwoSpansInCenter(span1, span2, connectingSpan) {
  connectingSpan.css({
      transformOrigin: 'top left'
    });
  // Get the bounding boxes of the two spans.
  const span1Box = span1[0].getBoundingClientRect();
  const span2Box = span2[0].getBoundingClientRect();

  // Calculate the center point of the two spans.
  const centerPoint = {
    x: (span1Box.left + span1Box.right) / 2,
    y: (span1Box.top + span1Box.bottom) / 2
  };

  // Calculate the angle of rotation.
  const angle = Math.atan2(span2Box.top - span1Box.top, span2Box.left - span1Box.left);

  // Calculate the width of the connecting span.
  const connectingSpanWidth = Math.sqrt(
    (span2Box.left - span1Box.left) ** 2 + (span2Box.top - span1Box.top) ** 2
  );

  // Calculate the new position of the connecting span based on the center point and offset.
  const connectingSpanPosition = {
    x: centerPoint.x,
    y: centerPoint.y 
  };

  // Set the position and rotation of the connecting span.
  connectingSpan.css({
    left: `${connectingSpanPosition.x}px`,
    top: `${connectingSpanPosition.y}px`,
    transform: `rotate(${angle}rad)`,
    width: `${connectingSpanWidth}px`
  });


  connectingSpan.find('.words').css({
      transform: `rotate(${-angle}rad)`,
    });

}


function isNumeric(str){
  return /^\d+$/.test(str) ;
}

function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

var showErrorMessage = (error)=>{
  console.error(error);
};
$(document).ready(function () {

  var toastEl = $('#error_toast')[0];
  var toast = new bootstrap.Toast(toastEl);
  $('#error_toast').on('click', function () {
    toast.hide(); 
  });
  
  showErrorMessage = (error) => {
    $('#error_message').text(error);
    toast.show();
  };
});
