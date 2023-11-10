const Choose_Image = document.getElementById("Choose_Image");
const Files = document.getElementById("Files");
const Image_Src = document.getElementById("Image_Src");
const filter_name = document.getElementById("filter_name");
const filter_value = document.getElementById("filter_value");
const Range = document.getElementById("Range");
const reset = document.getElementById("reset");
const save = document.getElementById("save");
const button1 = document.querySelectorAll(".icons_room button");
const button2 = document.querySelectorAll(".icons_room1 button");
let BrightNess = 100;
let Contrast = 100;
let Saturate = 100;
let Invert = 0;
let Blur = 0;
let rotate = 0;
let flip_x = 1;
let flip_y = 1;

Choose_Image.addEventListener("click", (e) => Files.click());
Files.addEventListener("change", (e) => {
  const file_value = Files.files[0];
  if (!file_value) return;
  Image_Src.src = URL.createObjectURL(file_value);
  Image_Src.addEventListener("load", (e) => {
    document.getElementById("container").classList.remove("disable");
  });
});

button1.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
    filter_name.innerText = element.id;
    if (element.id === "BrightNess") {
      Range.max = "200";
      Range.value = BrightNess;
      filter_value.innerText = `${BrightNess}%`;
    } else if (element.id === "Contrast") {
      Range.max = "200";
      Range.value = Contrast;
      filter_value.innerText = `${Contrast}%`;
    } else if (element.id === "Saturate") {
      Range.max = "200";
      Range.value = Saturate;
      filter_value.innerText = `${Saturate}%`;
    } else if (element.id === "Invert") {
      Range.max = "200";
      Range.value = Invert;
      filter_value.innerText = `${Invert}%`;
    } else if (element.id === "Blur") {
      Range.max = "200";
      Range.value = Blur;
      filter_value.innerText = `${Blur}px`;
    }
  });
});

Range.addEventListener("input", (e) => {
  const active = document.querySelector(".active");

  if (active.id === "BrightNess") {
    BrightNess = Range.value;
    filter_value.innerText = `${BrightNess}%`;
  } else if (active.id === "Contrast") {
    Contrast = Range.value;
    filter_value.innerText = `${Contrast}%`;
  } else if (active.id === "Saturate") {
    Saturate = Range.value;
    filter_value.innerText = `${Saturate}%`;
  } else if (active.id === "Invert") {
    Invert = Range.value;
    filter_value.innerText = `${Invert}%`;
  } else if (active.id === "Blur") {
    Blur = Range.value;
    filter_value.innerText = `${Blur}px`;
  }
  Image_Src.style.filter = `brightness(${BrightNess}%) contrast(${Contrast}%) saturate(${Saturate}%) invert(${Invert}%) blur(${Blur}px)`;
});

button2.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (element.id === "rotate_left") {
      rotate -= 90;
    } else if (element.id === "rotate_right") {
      rotate += 90;
    } else if (element.id === "flip_x") {
      flip_x = flip_x === 1 ? -1 : 1;
    } else if (element.id === "flip_y") {
      flip_y = flip_y === 1 ? -1 : 1;
    }
    console.log(element.id);
    Image_Src.style.transform = `rotate(${rotate}deg) scale(${flip_x} , ${flip_y})`;
  });
});

reset.addEventListener("click", (e) => {
  BrightNess = 100;
  Contrast = 100;
  Saturate = 100;
  Invert = 0;
  Blur = 0;
  rotate = 0;
  flip_x = 1;
  flip_y = 1;
  Image_Src.style.filter = `brightness(${BrightNess}%) contrast(${Contrast}%) saturate(${Saturate}%) invert(${Invert}%) blur(${Blur}px)`;
  Image_Src.style.transform = `rotate(${rotate}deg) scale(${flip_x} , ${flip_y})`;
});

save.addEventListener("click", (e) => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = Image_Src.naturalWidth;
  canvas.height = Image_Src.naturalHeight;
  ctx.filter = `brightness(${BrightNess}%) contrast(${Contrast}%) saturate(${Saturate}%) invert(${Invert}%) blur(${Blur}px)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flip_x, flip_y);
  ctx.drawImage(
    Image_Src,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const link = document.createElement("a");
  link.download = "arvaj.jpg";
  link.href = canvas.toDataURL();
  link.click();
});
