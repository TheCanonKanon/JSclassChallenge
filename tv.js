class Tv {
  constructor(brand) {
    this.brand = brand;
    this.channel = 1;
    this.volume = 50;
  }

  increaseVolume (amount) {
    if (this.volume + amount <= 100) {
      this.volume += amount;
    } else {
      alert("too loud")
    }
  }

  decreaseVolume (amount) {
    if (this.volume - amount >= 0) {
      this.volume -= amount;
    } else {
      alert("to quiet")
    }
  }

  setChannel (channelSelected) {
    if (channelSelected >= 1 && channelSelected <= 50) {
      this.channel = channelSelected;
    } else {
      alert("out of Range")
    }
  }
  
  reset () {
    this.channel = 1;
    this.volume = 50;
  }

  status () {
    console.log("This " + this.brand + " TV is set to Channel "+ this.channel + " and set to Volume " + this.volume);
  }

}

window.onload = () => {
  const tv = new Tv("Samsung");
  displayBrand(tv);
  displayVolume(tv);
  displayChannel(tv);
  addEvents(tv);
}

const increaseVolume = (tv) => {
  tv.increaseVolume(10);
  displayVolume(tv);
}

const decreaseVolume = (tv) => {
  tv.decreaseVolume(10);
  displayVolume(tv);
}

const setChannel = (tv) => {
  const tvChannelLabel = document.querySelector("#channel");
  tv.setChannel (tvChannelLabel.value);
  displayChannel(tv);
 }

const reset = (tv) => {
  tv.reset();
  displayVolume(tv);
  displayChannel(tv);
}

const displayBrand = (tv) => {
  const tvBrand = document.querySelector ("#tv-brand");
  tvBrand.innerHTML = tv.brand;
  tv.status();
}

const displayVolume = (tv) => {
  const tvVol = document.querySelector ("#tv-volume");
  tvVol.innerHTML = tv.volume;
  tv.status();
}

const displayChannel = (tv) => {
  const tvChannel = document.querySelector ("#tv-channel");
  tvChannel.innerHTML = tv.channel;
  tv.status();
}

const addEvents = (tv) => {
  const increaseVolButton = document.querySelector ("#increase-volume");
  increaseVolButton.addEventListener("click", () => increaseVolume(tv));
  const decreaseVolButton = document.querySelector ("#decrease-volume");
  decreaseVolButton.addEventListener("click", () => decreaseVolume(tv));
  const ChannelButton = document.querySelector ("#change-channel");
  ChannelButton.addEventListener("click", () => setChannel(tv));
  const resetButton = document.querySelector ("#reset");
  resetButton.addEventListener("click", () => reset(tv));
}

//1) Create a TV class with properties like brand, channel and volume.
//    Specify brand in a constructor parameter. Channel should be 1 by default. Volume should be 50 by default.
//2) Add methods to increase and decrease volume. Volume can't never be below 0 or above 100.
//3) Add a method to set the channel. Let's say the TV has only 50 channels so if you try to set channel 60 the TV will stay at the current channel.
//4) Add a method to reset TV so it goes back to channel 1 and volume 50. (Hint: consider using it from the constructor).
//5) It's useful to write a status, that returns info about the TV status like: "Panasonic at channel 8, volume 75".
