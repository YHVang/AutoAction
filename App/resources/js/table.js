window.addEventListener("DOMContentLoaded", () => {
    console.log("In table.js script");

    let count = new Date("Dec 25, 2024 15:37:25").getTime();
    let countTwo = new Date("Dec 30, 2024 15:37:25").getTime();
    let countTre = new Date("Dec 15, 2024 15:37:25").getTime();
    let countFour = new Date("Dec 10, 2024 15:37:25").getTime();

    let x = setInterval(function () {
        let now = new Date().getTime();
        let distance = count - now;
        let distwo = countTwo - now;
        let distre = countTre - now;
        let disFour = countFour - now;

        let d = Math.floor(distance / (1000 * 60 * 60 * 24));
        let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((distance % (1000 * 60)) / 1000);

        let dTwo = Math.floor(distwo / (1000 * 60 * 60 * 24));
        let hTwo = Math.floor((distwo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mTwo = Math.floor((distwo % (1000 * 60 * 60)) / (1000 * 60));
        let sTwo = Math.floor((distwo % (1000 * 60)) / 1000);

        let dTre = Math.floor(distre / (1000 * 60 * 60 * 24));
        let hTre = Math.floor((distre % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mTre = Math.floor((distre % (1000 * 60 * 60)) / (1000 * 60));
        let sTre = Math.floor((distre % (1000 * 60)) / 1000);

        let dFour = Math.floor(disFour / (1000 * 60 * 60 * 24));
        let hFour = Math.floor((disFour % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mFour = Math.floor((disFour % (1000 * 60 * 60)) / (1000 * 60));
        let sFour = Math.floor((disFour % (1000 * 60)) / 1000);

        document.getElementById("timerid1").innerHTML = d + "d " + h + "h "
            + m + "m " + s + "s ";
        document.getElementById("timerid2").innerHTML = dTwo + "d " + hTwo + "h "
            + mTwo + "m " + sTwo + "s ";
        document.getElementById("timerid3").innerHTML = dTre + "d " + hTre + "h "
            + mTre + "m " + sTre + "s ";
        document.getElementById("timerid4").innerHTML = dFour + "d " + hFour + "h "
            + mFour + "m " + sFour + "s ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timerid1").innerHTML = "EXPIRED";
            document.getElementById("timerid2").innerHTML = "EXPIRED";
            document.getElementById("timerid3").innerHTML = "EXPIRED";
            document.getElementById("timerid4").innerHTML = "EXPIRED";
        }
    }, 1000);


    function setupImagePreview(imgDataId, previewId) {
        document.getElementById(imgDataId).addEventListener('mouseover', function () {
            const imgNode = document.createElement("img");
            let imgData = document.getElementById(imgDataId);
            const dataimage = imgData.dataset.image;
            imgNode.src = dataimage;
            imgNode.alt = "Image Preview here";
            imgNode.width = 320;
            imgNode.height = 270;
            imgNode.id = "newNode";
            const element = document.getElementById(previewId);
            element.appendChild(imgNode);
        });

        document.getElementById(imgDataId).addEventListener("mouseout", () => {
            const removeele = document.getElementById("newNode");
            removeele.remove();
        });
    }

    setupImagePreview('imgData1', 'imgPreview');
    setupImagePreview('imgData2', 'imgPreview');
    setupImagePreview('imgData3', 'imgPreview');
    setupImagePreview('imgData4', 'imgPreview');

    const deleteButtons = document.querySelectorAll('.bidButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const listingId = this.getAttribute('data-id');
            console.log(listingId);
            
            try {
                const response = await fetch('/api/delete_listing', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ listing_id: listingId }),
                });

                if (response.ok) {

                    const row = document.querySelector(`#tableRow-${listingId}`);
                    if (row) row.remove();
                } else {

                    console.error('Failed to delete listing');
                }
            } catch (error) {
                console.error('Error deleting listing:', error);
            }
        });
    });
});
