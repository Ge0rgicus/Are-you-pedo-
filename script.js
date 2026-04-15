const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromUri("./models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("./models");
  await faceapi.nets.ageGenderNet.loadFromUri("./models");
}

loadModels();

upload.addEventListener("change", async () => {
  const file = upload.files[0];
  preview.src = URL.createObjectURL(file);

  result.textContent = "Detecting age...";

  const img = await faceapi.bufferToImage(file);

  const detection = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withAgeAndGender();

  if (!detection) {
    result.textContent = "No face detected.";
    return;
  }

  const age = detection.age.toFixed(0);
  result.textContent = `Estimated age: ${age}`;
});
