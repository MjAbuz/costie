import React, { Component, createContext } from 'react';
import Dictionary from './services/dictionary';

const { Provider, Consumer } = createContext();

class CostieProvider extends Component {
  MAX_PARTICIPANTS = 20;

  state = {
    total: 0,
    totalPerSecond: 0,
    participants: {
      options: [...Array(this.MAX_PARTICIPANTS + 1).keys()],
      selected: 2
    },
    currencies: {
      options: [...'£€$₽¥₩₹'],
      selected: '£'
    },
    language: 'english',
    dictionary: {},
    settingsView: false
  };

  updateTotals = (total, totalPerSecond) => this.setState({ total, totalPerSecond });

  updateParticipants = e => {
    const newState = this.state;
    newState.participants.selected = +e.target.value;

    this.setState(newState);
  };

  changeCurrency = () => {
    const newState = this.state,
      position = newState.currencies.options.indexOf(newState.currencies.selected),
      nextCurrency = (newState.currencies.options.length - 1) >= (position + 1) ? (position + 1) : 0;

    newState.currencies.selected = newState.currencies.options[nextCurrency];

    this.setState(newState);
  };

  toggleSettings = () => this.state.settingsView ? this.setState({ settingsView: false }) : this.setState({ settingsView: true });

  handleChangeLanguage = e => {
    const language = e.target.closest('li').id;

    this.setState({ language, dictionary: Dictionary[language] });
  };

  componentDidMount() {
    this.setState({ dictionary: Dictionary[this.state.language] });
  };

  render() {
    return (
      <Provider value={{
        context: this.state,
        toggleSettings: this.toggleSettings,
        handleChangeLanguage: this.handleChangeLanguage,
        updateTotals: this.updateTotals,
        updateParticipants: this.updateParticipants,
        changeCurrency: this.changeCurrency
      }}>
        {this.props.children}
      </Provider>
    );
  };
};

export { CostieProvider };
export default Consumer;