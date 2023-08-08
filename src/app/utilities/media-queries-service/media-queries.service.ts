export class MediaQueryService {
  moduleTopContainer100PercentWidthUpdate(classToGet: string) {
    const topElement = document.getElementsByClassName(classToGet)[0];
    const moduleNamePlate = topElement.parentElement as HTMLElement;
    moduleNamePlate.style.width = 'max(100%,100%)';
  }
  moduleTopContainer100PercentHeightUpdate(classToGet: string) {
    const topElement = document.getElementsByClassName(classToGet)[0];
    const moduleNamePlate = topElement.parentElement as HTMLElement;
    moduleNamePlate.style.height = 'max(100%,100%)';
  }

  moduleMultipleTopContainer100PercentWidthUpdate(classToGet: string) {
    const topElements = document.getElementsByClassName(classToGet);
    for (
      let indexOfTopElements = 0;
      indexOfTopElements < topElements.length;
      indexOfTopElements++
    ) {
      const moduleNamePlate = topElements[indexOfTopElements]
        .parentElement as HTMLElement;
      moduleNamePlate.style.width = 'max(100%,100%)';
    }
  }

  fullViewportWithoutScrollbarSetter() {
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      window.innerWidth - document.documentElement.clientWidth + 'px'
    );
  }
}
