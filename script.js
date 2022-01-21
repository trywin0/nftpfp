const hexagonalTemplate = document.getElementById("hexagonal")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const imgCanvas = document.createElement("canvas")
imgCanvas.style.display = "none";
imgCanvas.width=500;
imgCanvas.height=500;
document.body.appendChild(imgCanvas)
const imgCtx = imgCanvas.getContext("2d")
ctx.fillStyle="white"
ctx.fillRect(0,0,500,500)
ctx.drawImage(hexagonalTemplate,0,0, canvas.width, canvas.height)
ctx.globalCompositeOperation='difference';
ctx.fillStyle='white';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.globalCompositeOperation='source-over';

const imageInput = document.getElementById("img-input");
function DownloadCanvasAsImage(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    canvas.toBlob(function(blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    });
}
imageInput.onchange = (e)=>{
    var img = new Image;
    img.onload = function() {
        imgCtx.clearRect(0,0,500,500)
        imgCtx.drawImage(img, 500/2-500*(img.width/img.height)/2, 500/2-250, 500*(img.width/img.height), 500)
        const imgData = imgCtx.getImageData(0,0,500,500).data
        const canvasData = ctx.getImageData(0,0,500,500).data
        for(let i=0; i<imgData.length; i+=4){
            const x = (i / 4) % 500;
            const y = Math.floor((i / 4) / 500);
           // if(i%4===0) console.log(canvasData[i+3]) 
            if(canvasData[i+2]>10){
                ctx.fillStyle=`rgb(${imgData.slice(i,i+3)})`
                ctx.fillRect(x,y,1,1)
            }
        }

    }
    console.log(e.target)
    img.src = URL.createObjectURL(e.target.files[0]);
}
