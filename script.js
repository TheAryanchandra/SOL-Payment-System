var default_voice = null;
var synth_global = null;

$(document).ready(function () {

  const textarea = document.querySelector("textarea"),
    voiceList = document.querySelector("select"),
    successBtn = document.querySelector("button#success");
  errorBtn = document.querySelector("button#error");

  isSpeaking = true;

  let synth = speechSynthesis;
  synth_global = synth;

  voices(speechSynthesis);

  synth.addEventListener("voiceschanged", voices);

  synth_global = synth;
  successBtn.addEventListener("click", (e) => {
    e.preventDefault();

    textToSpeech(synth, "Payment Accepted. Thank you for your patience.");
  });

  // errorBtn.addEventListener("click", e =>{
  //     e.preventDefault();

  //     textToSpeech(synth, "Please try again after some time.");
  // });
});

function generateQR() {
  $("#qr").html("");
  let amount = $("#amount").val();
  new QRCode(
    document.getElementById("qr"),
    "https://web3-paytm.com/tranfer/" + amount
  );

 
  setTimeout(sucessPayment, 60000);
}

function voices(synth) {
  if (synth != undefined) {

    try {
      let voices = synth.getVoices();
      default_voice = voices[0];
    } catch (err) {
      console.log("Error: " + err + ".");
    }
  }
}

function sucessPayment() {
  let output = "Payment Accepted 0.1 SOL received.Thank you for your service.";
  textToSpeech(synth_global, output);
  $("#result").html("&check; " + output);

}

function textToSpeech(synth, text) {
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = default_voice;
  synth.speak(utterance);
}
