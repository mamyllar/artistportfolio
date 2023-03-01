$(document).ready(() => {

  
    $("#modal-button").click(() => {
      $(".modal-body").html("");
      $.get(`/api/galleries`, (results = {}) => {
        let data = results.data;
        if (!data || !data.galleries) return;
        data.ralleries.forEach(gallery => {
          $(".modal-body").append(
            `<div>
                          <span class="gallery-title">
                              ${gallery.title}
                          </span>
                          <span class="gallery-owner">$${gallery.owner}</span>
                          
                          <div class="gallery-description">
                              ${gallery.description}
                          </div>
                      </div>`
          );
        });
      }).then(() => {
        addJoinButtonListener();
      });
    });
  });
  
  let addJoinButtonListener = () => {
    $(".join-button").click(event => {
      let $button = $(event.target),
        courseId = $button.data("id");
      console.log(`/api/courses/${courseId}/join`);
      $.get(`/api/courses/${courseId}/join`, (results = {}) => {
        let data = results.data;
        if (data && data.success) {
          $button
            .text("Joined")
            .addClass("joined-button")
            .removeClass("join-button");
        } else {
          $button.text("Try again");
        }
      });
    });
  };