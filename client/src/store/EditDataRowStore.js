import { makeAutoObservable } from "mobx";

export default class EditDataRowStore {
  constructor() {
    this._idRowEdit = "";
    this._nameTableEdit = "";
    this._namesColumnEdit = [];
    this._modifiedData = [];

    this._visibleModal = false;

    makeAutoObservable(this);
  }

  setIdRowEdit(id) {
    this._idRowEdit = id;
  }
  setNameTableEdit(nameTableEdit) {
    this._nameTableEdit = nameTableEdit;
  }
  setNameColumnsEdit(nameColumnsEdit) {
    this._nameColumnsEdit = nameColumnsEdit;
  }
  setModifiedData(modifiedData) {
    this._modifiedData = modifiedData;
  }
  setVisibleModal(bool) {
    this._visibleModal = bool;
  }

  get idRowEdit() {
    return this._idRowEdit;
  }
  get nameTableEdit() {
    return this._nameTableEdit;
  }
  get nameColumnsEdit() {
    return this._nameColumnsEdit;
  }
  get modifiedData() {
    return this._modifiedData;
  }
  get visibleModal() {
    return this._visibleModal;
  }
}
