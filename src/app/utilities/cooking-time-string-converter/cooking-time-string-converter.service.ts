export class CookingTimeStringConverterService {
  cookingTimeStringConverter(cookingTimeToClean: string) {
    const seperatedCookingTime = cookingTimeToClean.split(' ');
    let tempCookingTime = '';

    for (
      let indexOfSeperatedCookingTime = 0;
      indexOfSeperatedCookingTime < seperatedCookingTime.length;
      indexOfSeperatedCookingTime++
    ) {
      tempCookingTime =
        tempCookingTime +
        ' ' +
        seperatedCookingTime[indexOfSeperatedCookingTime];
    }

    return tempCookingTime;
  }
}
