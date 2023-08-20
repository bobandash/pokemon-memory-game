class Pokemon {
  constructor({name, number, type, image, hasBeenChosen, id}){
    this.name = name;
    this.number = number;
    this.type = type;
    this.image = image;
    this.hasBeenChosen = hasBeenChosen;
    this.id = id;
  }

  toggleHasBeenChosen(){
    this.hasBeenChosen = !this.hasBeenChosen;
  }
}

export default Pokemon;