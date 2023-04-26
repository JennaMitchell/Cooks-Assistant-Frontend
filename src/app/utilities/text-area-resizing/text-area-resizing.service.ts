export class TextAreaResizerService {
  textHeightSizer(element: HTMLTextAreaElement) {
    element.style.height = element.scrollHeight + 'px';
    element.style.overflowY = 'hidden';
  }

  textAreaInputHandler(element: HTMLTextAreaElement) {
    element.style.height = '0';
    element.style.height = element.scrollHeight + 'px';
    element.style.resize = 'none';
  }
}
