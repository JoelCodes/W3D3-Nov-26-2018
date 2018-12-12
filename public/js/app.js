/* eslint-disable */
$(function(){
  var $puppies = $('#puppies');

  function renderPuppy(puppy){
    return $(`      <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img class="card-img-top"  alt="Thumbnail [100%x225]" style="height: auto; width: 100%; display: block;" src='${puppy.imgUrl}'>
      <div class="card-body">
        <p class="card-text">${puppy.name}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-secondary">Edit</button>
            <button type="button" class="btn btn-sm btn-danger" data-delete-id="${puppy.id}">Delete</button>
          </div>
        </div>
        <p class="card-text">
          <form data-update-id="${puppy.id}">
            <div class="form-group">
              <label for="name_${puppy.id}">Name</label>
              <input type="text" class="form-control" id="name_${puppy.id}" value="${puppy.name}" aria-describedby="emailHelp" name="name">
            </div>
            <div class="form-group">
              <label for="imgUrl_${puppy.id}">Image Url</label>
              <input type="text" class="form-control" id="imgUrl_${puppy.id}" name="imgUrl" value="${puppy.imgUrl}">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </p>
      </div>
    </div>
  </div>
`)
  }
  function getPuppies(){
    $.ajax('/api/puppies')
      .then(function(puppies){
        puppies.forEach(function(puppy){
          $puppies.append(renderPuppy(puppy));
        });
      });
  }
  var $form = $('#create-puppy-form').submit(function(event){
    event.preventDefault();
    $.post('/api/puppies', $form.serialize())
      .then(function(puppy){
        $puppies.append(renderPuppy(puppy));
      });
  })
  $puppies.on('submit', 'form[data-update-id]', function(e){
    var $form = $(this);
    e.preventDefault();
    var puppyId = $form.data('updateId');
    $.ajax(`/api/puppies/${puppyId}`, { method: 'PATCH', data: $form.serialize()})
      .then(function(result){
        console.log(result);
      })
  });
  $puppies.on('click', 'button[data-delete-id]', function(){
    var puppyId = $(this).data('deleteId');
    $.ajax(`/api/puppies/${puppyId}`, {method: 'DELETE'})
    .then(function(result){
      console.log(result);
    })
  })
  getPuppies();
});
