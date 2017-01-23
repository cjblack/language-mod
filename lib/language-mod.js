'use babel';

import LanguageModView from './language-mod-view';
import { CompositeDisposable } from 'atom';

export default {

  languageModView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageModView = new LanguageModView(state.languageModViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageModView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-mod:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageModView.destroy();
  },

  serialize() {
    return {
      languageModViewState: this.languageModView.serialize()
    };
  },

  toggle() {
    console.log('LanguageMod was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
