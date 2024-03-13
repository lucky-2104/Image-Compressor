const uploadBox = document.querySelector(".upload-box");
const preImage = uploadBox.querySelector("img");
const fileInput = uploadBox.querySelector("input");
const widthInput = document.querySelector(".width input")
const heightInput = document.querySelector(".height input");
const ratioInput = document.querySelector(".ratio input");
const qualityInput = document.querySelector(".quality input");
const downloadBtn = document.querySelector(".download-btn");


let ogImageRatio;

const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  preImage.src = URL.createObjectURL(file);
  preImage.addEventListener("load", () => {
    widthInput.value = preImage.naturalWidth;
    heightInput.value = preImage.naturalHeight;
    ogImageRatio = preImage.naturalWidth / preImage.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");

  });

  // console.log(file);
};

widthInput.addEventListener("keyup", () => {
  //Getting height acc to the ratio the ratio checkbox status
  const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
  heightInput.value = Math.floor(height); 
});

heightInput.addEventListener("keyup", () => {
  //Getting height acc to the ratio the ratio checkbox status
  const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
  widthInput.value = Math.floor(width); 
});


const resizeAndDownload = () => { 
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const a = document.createElement("a");
  const imgQuality = qualityInput.checked ? 0.7 : 1.0;


  //setting canvas height and width according to the input values 
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;
  ctx.drawImage(preImage, 0, 0, canvas.width, canvas.height);
  document.body.appendChild(canvas);

  a.href = canvas.toDataURL("image/jpeg" , imgQuality);
  a.download = new Date().getTime() + ".jpeg";
  a.click(); //clicking <a> element so the file download  
};


downloadBtn.addEventListener("click", resizeAndDownload);

fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
