import { capitalLettersArray } from 'src/app/constants/constants';

export class RandomStringGeneratorsService {
  randomStringCreator(numberOfCharacters: number) {
    const lowerCaseStringArray = capitalLettersArray.map((letter) => {
      return letter.toLowerCase();
    });
    const numbersArray: string[] = [];

    for (
      let indexOfNumbersArray = 0;
      indexOfNumbersArray < 9;
      indexOfNumbersArray++
    ) {
      numbersArray[indexOfNumbersArray] = `${indexOfNumbersArray}`;
    }

    const finalCharactersArray = capitalLettersArray.concat(
      numbersArray,
      lowerCaseStringArray
    );

    const randomlyGeneratedIdArray: string[] = [];

    for (
      let indexOfRandomCharacter = 0;
      indexOfRandomCharacter < numberOfCharacters;
      indexOfRandomCharacter++
    ) {
      const randomNumber = Math.floor(
        Math.random() * (finalCharactersArray.length - 1)
      );

      randomlyGeneratedIdArray[indexOfRandomCharacter] =
        finalCharactersArray[randomNumber];
    }

    return randomlyGeneratedIdArray.join('');
  }

  generateUsername() {
    let finalString = 'Chef#';
    finalString = finalString + this.randomStringCreator(8);
    return finalString;
  }
  generatePassword() {
    return this.randomStringCreator(10);
  }
  generateEmail() {
    return 'amazingChef-' + this.randomStringCreator(5) + '@chef.com';
  }
}
