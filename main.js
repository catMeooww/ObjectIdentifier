var previewResult = "";
function setup(){
    canvas = createCanvas(500,500);
    //canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier("MobileNet",modelLoaded);
}
function draw(){
    image(video,0,0,500,500);
    classifier.classify(video,gotResults);
}
function modelLoaded(){
    console.log("Model Loaded");
}
function gotResults(error,results){
    if (error){
        console.error(error);
    }else{
        if((results[0].confidence>0.8)&&(results[0].label != previewResult)){
            previewResult = results[0].label;
            console.log(results);
            document.getElementById("ObjectName").innerHTML = results[0].label;
            document.getElementById("ObjectAccuracy").innerHTML = results[0].confidence;
            var synth = window.speechSynthesis;
            var SpeakData = "objeto detectado: "+results[0].label;
            var utterThis = new SpeechSynthesisUtterance(SpeakData);
            synth.speak(utterThis);
        }
    }
}