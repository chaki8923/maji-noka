
// バリデーション
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }

  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength
  }

  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  console.log(validatableInput.max);
  console.log(typeof validatableInput.value);

  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max
    console.log("isValid");
    console.log(isValid);

  }

  return isValid;
}
// オートバインド
function AutoBind(target: any, methodName: string | number | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  console.log("====================");
  console.log(descriptor);
  console.log("====================");


  const adjDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }

  return adjDescriptor
}

interface ValidatorConfig {
  [prop: string]: {
    [validatableProp: string]: string[]
  }
}


class ProjectList {

  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-project`;
    this.attach();
    this.renderContent();
  }


  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }

}


class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionElement: HTMLTextAreaElement;
  mandayElement: HTMLInputElement;
  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    // importNodeは指定したDOMの最初の要素取得（ここではformタグ）。
    // 第二引数はディープクローンするかどうか。ディープクローンとはその下の階層もコピーするかどうか。
    const importedNode = document.importNode(this.templateElement.content, true);
    console.log(importedNode);
    console.log(importedNode.firstElementChild);
    //formタグの中身入ってる
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionElement = this.element.querySelector('#description') as HTMLTextAreaElement;
    this.mandayElement = this.element.querySelector('#manday') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionElement.value;
    const enteredManday = this.mandayElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    }
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    }
    const mandayValidatable: Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 100
    }

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(mandayValidatable)
    ) {
      alert('入力値が正しくありません');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredManday]
    }
  }

  private clearInputField() {
    this.titleInputElement.value = '';
    this.descriptionElement.value = '';
    this.mandayElement.value = '';
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, manday] = userInput;
      console.log(title, description, manday);
      const ulElement = document.getElementById('active-project-list')!;
      var liElement = document.createElement("li");
      liElement.textContent = title;
      ulElement.appendChild(liElement);
      this.clearInputField();
    }


  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    // 第一引数はどこに追加するか。
    // afterbegin...開始タグの後ろ
    // afterend...終了タグの後ろ
    // beforebegin...開始タグの前
    // beforeend...終了タグの前
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const pro = new ProjectInput();

const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
