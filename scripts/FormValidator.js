export class FormValidator {
  constructor(formData, validateFormSelector) {
    this._formData = formData;
    this._validateFormSelector = validateFormSelector;
  }
  // Функция деактивации кнопки сабмита
  _disableSubmitButton() {
    if (
      this._buttonElement.classList.contains(this._formData.inactiveButtonClass)
    ) {
      this._buttonElement.classList.remove(this._formData.inputErrorClass);
    }
  }
  // Функция активации кнопки сабмита
  _enableSubmitButton() {
    this._buttonElement.classList.add(this._formData.inactiveButtonClass);
  }
  // Функция скрытия сообщения об ошибке
  _hideInputError(inputElement, errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._formData.errorClass);
    inputElement.classList.remove(this._formData.inputErrorClass);
  }
  // Функция показа сообщения об ошибке
  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.textContent = errorMessage;
    inputElement.classList.add(this._formData.errorClass);
    errorElement.classList.add(this._formData.inputErrorClass);
  }
  // Функция проверки массива инпутов на валидность
  _checkInputListValidity(inputList) {
    const hasNotValidInput = inputList.every((inputElement) => {
      inputElement.validity.valid;
    });
    if (!hasNotValidInput) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }
  // Функция проверки инпута на валидность
  _checkValidity(inputElement) {
    const isInputNotValid = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(
      `${inputElement.id}-error`
    );
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorElement, errorMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }
  // Добавление слушателей проверки инпутов
  _addCheckValidityListeners() {
    const inputList = Array.from(
      this._formElement.querySelector(this._formData.inputErrorClass)
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._checkInputListValidity(inputList);
      });
    });
  }
  // Установка слушателей событий
  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.stopPropagation();
    });
    this._addCheckValidityListeners();
  }
  // Самая-Главная-Функция
  enableValidation() {
    this._setEventListeners();
    this._formElement = document.querySelector(this._validateFormSelector);
    this._buttonElement = this._formElement.querySelector(
      this._formData.submitButtonSelector
    );
  }
}
