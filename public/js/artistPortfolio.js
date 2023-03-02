$(document).ready(() => {

  
    $("#modal-button").click(() => {
      $(".modal-body").html("");
      $.get(`/api/galleries`, (results = {}) => {
        let data = results.data;
        if (!data || !data.galleries) return;
        data.galleries.forEach(gallery => {
          if (gallery.owner) {
            $(".modal-body").append(
              `<div>
                            <span class="gallery-title">
                                ${gallery.title}
                            </span>
                            <div class="gallery-owner">$${gallery.owner}</div>

                              <div class="gallery-description">
                                ${gallery.description}
                            </div>
                        </div>`
            );
          } else {
          $(".modal-body").append(
            `<div>
                          <span class="gallery-title">
                              ${gallery.title}
                          </span>
                          
                          <button class="${gallery.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${
                            gallery._id
                          }">
                              ${gallery.joined ? "Joined" : "I'm the owner"}
                            </button>
                            <div class="gallery-description">
                              ${gallery.description}
                          </div>
                      </div>`
          );
                        }
        });
      }).then(() => {
        addJoinButtonListener();
      });
    });
  });
  
  let addJoinButtonListener = () => {
    $(".join-button").click(event => {
      let $button = $(event.target),
        galleryId = $button.data("id");
      console.log(`/api/galleries/${galleryId}/join`);
      $.get(`/api/galleries/${galleryId}/join`, (results = {}) => {
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