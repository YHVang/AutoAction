document.addEventListener("DOMContentLoaded", () => {
  console.log("In bid.js script");

  const btn = document.getElementById("btnButton");
  const formInput = document.getElementById("bidInput");
  const submitBtn = document.getElementById("submit");
  const bidContainerID = document.getElementById("bidContainer");
  const errorMessage = document.getElementById("error-message");
  const highestBidAmount = parseInt(document.getElementById("amount").getAttribute("min"));

  function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
          const [key, value] = cookie.trim().split('=');
          if (key === name) {
              return decodeURIComponent(value);
          }
      }
      return null;
  }

  const bidderNameCookie = getCookie('bidder_name');
  if (bidderNameCookie) {
      const nameInput = document.getElementById('nameinput');
      nameInput.value = bidderNameCookie;
  }

  async function postapi() {
      const name_input = document.getElementById("nameinput").value;
      const amount_input = document.getElementById("amount").value;
      const comments_input = document.getElementById("comments").value;
      const listingId = document.getElementById("bidInput").getAttribute("data-id");

      const formData = {
          bidder_name: name_input,
          bid_amount: amount_input,
          comment: comments_input,
          listing_id: listingId
      };

      if (parseInt(amount_input) <= highestBidAmount) {
          errorMessage.style.display = 'block';
          return;
      } else {
          errorMessage.style.display = 'none';
      }

      console.log("Before fetch ", JSON.stringify(formData));
      const url = '/api/place_bid';

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData),
              credentials: 'include'
          });

          if (!response.ok) {
              if (response.status === 429) {
                  const retryAfter = response.headers.get('Retry-After');
                  console.log(`Rate limit exceeded. Try again in ${retryAfter} seconds.`);
              } else {
                  const errorData = await response.json();
                  console.log(`Error placing bid: ${errorData.message}`);
              }
              return;
          }

          const data = await response.json();
          console.log('Success:', data);

          const newName = document.createTextNode(data.newBid.bidder_name);
          const newBid = document.createTextNode("$" + data.newBid.bid_amount);
          const newComment = document.createTextNode(data.newBid.comment);

          const newDiv = document.createElement("div");
          const newPname = document.createElement("p");
          const newPamount = document.createElement("p");
          const newPcomment = document.createElement("p");

          newDiv.classList.add("bidDiv");

          newPname.appendChild(newName);
          newPamount.appendChild(newBid);
          newPcomment.appendChild(newComment);

          newDiv.appendChild(newPname).classList.add("top");
          newDiv.appendChild(newPamount).classList.add("top");
          newDiv.appendChild(newPcomment).classList.add("bot");

          bidContainerID.prepend(newDiv);

          formInput.style.display = formInput.style.display === "block" ? "none" : "block";

      } catch (error) {
          console.error('Unexpected error placing bid:', error);
      }
  }

  formInput.style.display = "none";

  btn.addEventListener("click", () => {
      formInput.style.display = formInput.style.display === "block" ? "none" : "block";
  });

  submitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      postapi();
  });
});
